#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""局域网 HTTPS 静态服务器，用于摄像头权限访问"""
import http.server
import ssl
import socket
import os

PORT = 8080
DIR = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)
    def end_headers(self):
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        super().end_headers()

httpd = http.server.HTTPServer(("0.0.0.0", PORT), Handler)

ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ctx.load_cert_chain(certfile=os.path.join(DIR, "cert.pem"),
                     keyfile=os.path.join(DIR, "key.pem"))
httpd.socket = ctx.wrap_socket(httpd.socket, server_side=True)

# 获取局域网 IP（多方式兜底）
local_ip = "未知"
try:
    # 方法1: UDP 连接探测（不实际发包）
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    local_ip = s.getsockname()[0]
    s.close()
except Exception:
    try:
        local_ip = socket.gethostbyname(socket.gethostname())
    except Exception:
        pass

print(f"✅ HTTPS 服务器已启动")
print(f"   本地访问: https://localhost:{PORT}")
if local_ip != "未知":
    print(f"   局域网访问: https://{local_ip}:{PORT}")
print(f"   ⚠️  浏览器会提示证书不安全，点击「高级」→「继续访问」即可")
print(f"   按 Ctrl+C 停止")
httpd.serve_forever()
