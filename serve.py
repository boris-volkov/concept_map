"""Serves the atlas on this computer for writing and previewing content.

    python serve.py          then open http://localhost:8000
    python serve.py 5174     on another port

Unlike plain `python -m http.server`, it tells the browser to check for a newer
copy of every file each time, so an edited script or stylesheet is never stale.
The map itself watches the content files and redraws when you save one.
"""

import http.server
import sys


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


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f"Concept atlas at http://localhost:{port}  (Ctrl+C to stop)")
    http.server.ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
