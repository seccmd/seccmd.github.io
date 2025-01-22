# curl

```
curl --compressed https://www.example.com/large-data
--compressed：请求服务器发送压缩过的响应，并在接收到数据后自动解压缩。

curl --max-time 10 -s -w "\nHTTP_CODE: %{http_code}" ${url} 2>&1

for i in {1..200}; do curl -sILk -w "%{http_code}\n" -o /dev/null http://test.com/ ;done
```
