# VPN 相关工具

### Firezone

- https://www.firezone.dev/docs

### Gost 

- 隧道神器 gost
- https://github.com/semigodking/redsocks
- https://v2.gost.run/getting-started/

```bash
### Gost Demo

# server:
sudo ./gost -L="socks5+tls://user:pass@:8443?cert=/etc/letsencrypt/live/www.net/fullchain.pem&key=/etc/letsencrypt/live/www.net/privkey.pem"

# client: 
gost -L=:1080 -F=socks5+tls://user:pass@www.net:8443

工具使用
- https://medium.com/@rampage_router/%E7%AE%80%E5%8D%95%E8%AE%B0%E5%BD%95%E4%B8%8B-socks5-over-tls-https-and-http2-%E9%9A%A7%E9%81%93%E4%BB%A3%E7%90%86%E7%9A%84%E5%BB%BA%E7%AB%8B-8876d62bafc9
- https://medium.com/@offline8/%E4%BD%BF%E7%94%A8-socks5-tls-%E4%BC%98%E5%8C%96%E7%BD%91%E7%BB%9C-604f7f29193e

```

# 相关工具

- https://github.com/semigodking/redsocks
- Surge 
- gsocks5
