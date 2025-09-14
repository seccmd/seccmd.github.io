# 命令工具小技巧


## 浏览器隐私模式 Chrome

```Markdown
Original: “C:\Program Files\Google\Chrome\Application\chrome.exe”
Modified: “C:\Program Files\Google\Chrome\Application\chrome.exe” –incognito
```


## curl命令

```
curl --compressed https://www.example.com/large-data
--compressed：请求服务器发送压缩过的响应，并在接收到数据后自动解压缩。

curl --max-time 10 -s -w "\nHTTP_CODE: %{http_code}" ${url} 2>&1

for i in {1..200}; do curl -sILk -w "%{http_code}\n" -o /dev/null http://test.com/ ;done
```

```bash
# 循环读取urls.txt中的每一行（每个URL）
while read url; do
    # 执行curl请求，并将结果（包括标准输出和标准错误输出）保存到变量中
    # url=${url}/druid/index.html
    echo $url
    result=$(curl --max-time 10 -s -w "\nHTTP_CODE: %{http_code}" ${url} 2>&1)
    echo "$result ----> $url" >> $result_file
done < urls.txt
```

## pastebin 工具，私有化部署，自带阅后即


日常开发中，偶尔只想快速分享一段代码、一个链接或者一个文件，不想麻烦地搞个账号，也不想用笨重的服务器。

`microbin` ，帮你快速、安全地搭建属于自己的 PasteBin 服务，专治各种“小而急”的分享需求。

- 支持端到端加密（server-side 和 client-side），隐私更安全
- 支持上传文本／文件／URL 重定向，一站搞定多种用途

- https://github.com/szabodanika/microbin


## 网络加速器 Xget

Xget URL 转换器 https://xuc.xi-xu.me/

- https://mp.weixin.qq.com/s?__biz=MzkwMTQxODYwNQ%3D%3D&mid=2247483980&idx=1&sn=91238402171e2b298b4d666053b7474d

## Postman Requestly 抓包/改包/Mock/测接口

Requestly 是一个免费开源的 API 客户端和 HTTP 拦截工具，集成了 API 测试、HTTP 请求拦截与修改、API Mocking 等功能。它是一款同时能在浏览器插件和桌面应用上运行的软件，被称为 Postman 和 Charles Proxy 的强大替代品。

- 开源地址：https://github.com/requestly/requestly
- https://mp.weixin.qq.com/s?__biz=Mzg3NzU0NzIxMA%3D%3D&mid=2247505812&idx=1&sn=9201f59674115d65d1fa15191327ca17

## 1Panel-Halo 学习对象

- https://1panel.cn/

