import http.server
import socketserver
import json
import os

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            # Just print what we received
            print("\n[Server] Received POST request:")
            print(post_data.decode('utf-8'))
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success", "message": "Request received"}).encode('utf-8'))
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            print("Error: {}".format(e))

    def do_GET(self):
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

os.chdir(DIRECTORY)
print(f"Serving at http://localhost:{PORT}")
print("Press Ctrl+C to stop")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
