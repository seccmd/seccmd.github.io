# caddy

- https://caddy2.dengxiaolong.com/docs/getting-started

## 启动，停止，运行

```bash
caddy run   # 前台运行 Ctrl+C 停止caddy
caddy start # 后台运行
caddy stop  # 后台停止 或者使用API的/stop接口停止服务
caddy reload # 重载配置 不停机加载/更改配置
```

## 运行 Demo

### JSON 配置

```bash
caddy --help
caddy run

## 加载配置
curl localhost:2019/load \
	-X POST \
	-H "Content-Type: application/json" \
	-d '{"apps":{"http":{"servers":{"example":{"listen":[":2015"],"routes":[{"handle":[{"handler":"static_response","body":"Hello, world!"}]}]}}}}}'

# 管理API查看配置
curl localhost:2019/config/

# 使用curl测试它是否符合预期
curl localhost:2015
Hello, world!

```

### Caddyfile 配置

``` Caddyfile
:2015
respond "Hello, world!"
```

现在有一个Caddyfile在当前文件夹，运行caddy run

```bash
caddy run
caddy run --config /path/to/Caddyfile

# 配置适配器来将我们的Caddyfile转换成Caddy的原生JSON结构
caddy adapt # 当前目录配置文件 Caddyfile
caddy adapt --config /path/to/Caddyfile
```

## 静态文件

命令行

```bash
caddy file-server # 当前目录 80端口
caddy file-server --listen :2015 # 指定端口
caddy file-server --browse       # 列目录
caddy file-server --root ~/mysite # 指定目录
```

Caddyfile - caddy run

```text
localhost：2015
file_server browse
root * /home/me/mysite
```

## 反向代理

命令行

```bash
caddy reverse-proxy --to 127.0.0.1:9000
caddy reverse-proxy --from :2016 --to 127.0.0.1:9000
```

Caddyfile - caddy run

```text
:2016
reverse_proxy 127.0.0.1:9000
```

## HTTPS快速入门

Caddyfile - caddy run

```
example.com
respond "Hello, privacy!"
```

file-server命令

```bash
caddy file-server --domain example.com
```

reverse-proxy命令

```bash
caddy reverse-proxy --from example.com --to localhost:9000
```

JSON配置

```json
{
	"apps": {
		"http": {
			"servers": {
				"hello": {
					"listen": [":443"],
					"routes": [
						{
							"match": [{
								"host": ["example.com"]
							}],
							"handle": [{
								"handler": "static_response",
								"body": "Hello, privacy!"
							}]
						}
					]
				}
			}
		}
	}
}
```


## 实验室

代理到指定域名，并修改host请求头为指定域名

```bash
# http
caddy reverse-proxy --from :2016 --to cip.cc:80 --change-host-header
# https
caddy file-server --domain test.us.seccmd.net
caddy reverse-proxy --from test.us.seccmd.net --to cip.cc:80 --change-host-header

# cat Caddyfile
test.us.seccmd.net {
  reverse_proxy https://github.com:443 {
    header_up Host github.com
  }
}
```

