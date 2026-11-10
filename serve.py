"""Serves the atlas on this computer for writing and previewing content.

    python serve.py          then open http://localhost:8000
    python serve.py 5174     on another port

Unlike plain `python -m http.server`, it tells the browser to check for a newer
copy of every file each time, so an edited script or stylesheet is never stale.
The map itself watches the content files and redraws when you save one.

It also lets the page save a content file, which is what turns on the editor on
the map (js/edit.js): a pencil on every open card, and a button to add one. Only
this server does that, so the published site has no editor. A save is taken only
from a page this server itself served, only into a Markdown file that is already
in content/, and only if the file is still as the editor found it.
"""

import http.server
import json
import os
import re
import sys
from urllib.parse import urlsplit

ROOT = os.path.dirname(os.path.abspath(__file__))
CONTENT = os.path.join(ROOT, "content")
SAVE = re.compile(r"^/api/content/([a-z0-9][a-z0-9-]*\.md)$")
HERE = re.compile(r"^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$")
LARGEST = 4_000_000  # bytes: far more than any content file


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".js": "text/javascript",
        ".css": "text/css",
        ".md": "text/markdown; charset=utf-8",
    }

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def log_request(self, code="-", size="-"):
        pass  # the map polls the content files every couple of seconds; keep the console readable

    def answer(self, code, **reply):
        body = json.dumps(reply).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def local(self, write=False):
        """Whether the request is from a page this server served: no other site may save through it."""
        if not HERE.match(self.headers.get("Host", "")):
            return False
        origin = self.headers.get("Origin")
        if origin is None:
            return not write
        return bool(HERE.match(urlsplit(origin).netloc))

    def do_GET(self):
        if urlsplit(self.path).path == "/api/edit":
            return self.answer(200, ok=True) if self.local() else self.answer(403, error="Not from this computer.")
        super().do_GET()

    def do_PUT(self):
        found = SAVE.match(urlsplit(self.path).path)
        if not found:
            return self.answer(404, error="Only a Markdown file in content/ can be saved.")
        if not self.local(write=True):
            return self.answer(403, error="Not from this computer.")
        path = os.path.join(CONTENT, found.group(1))
        if not os.path.isfile(path):
            return self.answer(404, error=f"There is no content/{found.group(1)}.")
        try:
            length = int(self.headers.get("Content-Length", ""))
            if not 0 < length <= LARGEST:
                raise ValueError
            sent = json.loads(self.rfile.read(length).decode("utf-8"))
            text, base = sent["text"], sent["base"]
            if not isinstance(text, str) or not isinstance(base, str):
                raise ValueError
        except (ValueError, KeyError, TypeError, UnicodeDecodeError):
            return self.answer(400, error="The save could not be read.")
        with open(path, "rb") as f:
            on_disk = f.read().decode("utf-8")
        lf = lambda s: s.replace("\r\n", "\n")
        if lf(on_disk) != lf(base):
            return self.answer(409, error="The file has changed on disk since the editor opened it.")
        # The file keeps its own line endings, so that a save changes only the lines that were edited.
        out = lf(text).replace("\n", "\r\n") if "\r\n" in on_disk else lf(text)
        draft = path + ".saving"
        with open(draft, "wb") as f:
            f.write(out.encode("utf-8"))
        os.replace(draft, path)
        print(f"Saved content/{found.group(1)}")
        self.answer(200, ok=True)


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    os.chdir(ROOT)
    print(f"Concept atlas at http://localhost:{port}  (Ctrl+C to stop)")
    http.server.ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
