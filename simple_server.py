mport http.server
import ssl

def run_server():
    server_address = ('localhost', 8080)
    httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)
    httpd.socket = ssl.wrap_socket(httpd.socket,
                                   server_side=True,
                                   certfile='localhost.crt',
                                   keyfile='localhost.key',
                                   ssl_version=ssl.PROTOCOL_TLS)
    print("Server running on https://localhost:8080")
    httpd.serve_forever()

if __name__ == "__main__":
    run_server()

