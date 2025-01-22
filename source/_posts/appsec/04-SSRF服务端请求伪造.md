---
date: 2025-01-01
title: SSRF服务端请求伪造缺陷 - 腾讯安全代码审计实战系列04
authors: [SecCMD]
description: >
  SSRF（Server-Side Request Forgery）服务端请求伪造是一种由攻击者构造形成由服务端发起请求的一个安全漏洞。 一般情况下，SSRF攻击的目标是从外网无法访问的内部系统。正是因为它是由服务端发起的，所以它能够请求到与它相连而与外网隔离的内部系统。
categories: 安全开发
tags:
  - 安全开发
  - 应用安全
---

### SSRF服务端请求伪造缺陷 - 腾讯安全代码审计实战系列04

SSRF（Server-Side Request Forgery）服务端请求伪造是一种由攻击者构造形成由服务端发起请求的一个安全漏洞。 一般情况下，SSRF攻击的目标是从外网无法访问的内部系统。正是因为它是由服务端发起的，所以它能够请求到与它相连而与外网隔离的内部系统。

恶意用户可以利用此漏洞: 

1. 内网, 本地端口扫描, 获取开放端口信息 
2. 主机信息收集, web应用指纹识别, 获取服务banner信息 
3. 根据识别出的应用针对性的发送payload攻击, 例如struts2 
4. 攻击内网和本地的应用程序及服务 
5. 穿越防火墙 
6. 利用file协议读取本地文件, 比如file:///etc/passwd

### 修复建议

1. 限制请求的端口为HTTP常用的端口，比如80, 443, 8080, 8090。这可以防止通过不常用端口发起的恶意请求。 
2. 使用黑名单策略禁止内网IP地址，防止应用被用来获取内网数据或攻击内网。 
3. 禁用不需要的协议，仅允许HTTP和HTTPS请求。这可以阻止通过如file:///, gopher://, ftp://等协议引起的安全问题。 
4. 对所有外部请求的URL进行严格的验证，确保只允许请求到预定义的安全域名或路径。

### 示例代码

Java代码示例：

```java
// bad：直接从用户输入获取URL并打开连接，没有进行任何验证，存在SSRF风险
@RequestMapping("/ssrf")
public void test(String str) throws IOException {
    URL u = new URL(str);
    HttpURLConnection conn = (HttpURLConnection) u.openConnection();  // SSRF风险
}

// good：限制只能访问特定域名
@RequestMapping("/safe_ssrf")
public void test(String str) throws IOException {
    URL u = new URL(str);
    // .oa.com是一个可信的域名，可信域名根据具体业务而定
    if (u.getHost().endsWith(".oa.com")) {
        HttpURLConnection conn = (HttpURLConnection) u.openConnection();
    }
}

// good：检查并阻止内网IP地址
@RequestMapping("/safe_ssrf")
public void test(String str) throws IOException {
    URL u = new URL(str);
    String host = u.getHost();
    InetAddress inet = InetAddress.getByName(host);
    String ip = inet.getHostAddress();
    // isInternalIp方法自己实现，判断该url对应的ip地址是否安全
    if (!isInternalIp(ip)) {
        HttpURLConnection conn = (HttpURLConnection) u.openConnection();
        conn.setFollowRedirects(false);
    }
}
```

Go代码示例：

```go
// bad：直接从用户输入获取URL并发起请求，未进行任何安全检查
func handleBadSSRF(w http.ResponseWriter, r *http.Request) {
	userURL := r.URL.Query().Get("url")
	resp, err := http.Get(userURL) // SSRF风险
	if err != nil {
		http.Error(w, "Failed to make request", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()
	// ...处理响应...
}

// good：限制只能访问特定域名
func handleGoodSSRFDomain(w http.ResponseWriter, r *http.Request) {
	userURL := r.URL.Query().Get("url")
	parsedURL, err := url.Parse(userURL)
	if err != nil {
		http.Error(w, "Invalid URL", http.StatusBadRequest)
		return
	}
	if parsedURL.Hostname() == "example.com" {
		resp, err := http.Get(userURL)
		if err != nil {
			http.Error(w, "Failed to make request", http.StatusInternalServerError)
			return
		}
		defer resp.Body.Close()
		// ...处理响应...
	}
}

// good：禁用非HTTP/HTTPS协议，检查并阻止内网IP地址
func handleGoodSSRFSecure(w http.ResponseWriter, r *http.Request) {
	userURL := r.URL.Query().Get("url")
	parsedURL, err := url.Parse(userURL)
	if err != nil || (parsedURL.Scheme != "http" && parsedURL.Scheme != "https") {
		http.Error(w, "Unsupported protocol", http.StatusBadRequest)
		return
	}
	// 这里应当有更多的IP验证逻辑
	resp, err := http.Get(userURL)
	if err != nil {
		http.Error(w, "Failed to make request", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()
	// ...处理响应...
}
```

PHP代码示例：

```php
//bad：直接从用户输入获取URL并使用file_get_contents，没有进行任何验证，存在SSRF风险
function badSSRF($url) {
    $data = file_get_contents($url); // 可能会被用来访问内网或敏感文件
    echo $data;
}

//good：限制只能访问特定域名
function goodSSRFDomain($url) {
    $parsedUrl = parse_url($url);
    $hostname = $parsedUrl['host'];
    if ($hostname == "example.com") {
        $data = file_get_contents($url);
        echo $data;
    } else {
        echo "Access denied.";
    }
}

//good：检查并阻止内网IP地址
function goodSSRFCheckIp($url) {
    $parsedUrl = parse_url($url);
    $ip = gethostbyname($parsedUrl['host']);
    if (!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
        $data = file_get_contents($url);
        echo $data;
    } else {
        echo "Internal IP detected. Access denied.";
    }
}

//good：限制请求使用的端口
function goodSSRFPort($url) {
    $parsedUrl = parse_url($url);
    $port = isset($parsedUrl['port']) ? $parsedUrl['port'] : 80;  // 默认端口80
    if (in_array($port, [80, 443, 8080])) {
        $data = file_get_contents($url);
        echo $data;
    } else {
        echo "Invalid port. Access denied.";
    }
}
```

Python代码示例：

```python
# bad：直接从用户输入获取URL并使用requests库打开连接，没有进行任何验证，存在SSRF风险
from flask import Flask, request
import requests

app = Flask(__name__)

@app.route('/ssrf')
def test():
    url = request.args.get('url')
    response = requests.get(url)  # 高风险的SSRF点
    return response.text

# good：限制只能访问特定域名
@app.route('/safe_ssrf')
def safe_test():
    url = request.args.get('url')
    parsed_url = urlparse(url)
    if parsed_url.hostname.endswith('.oa.com'):
        response = requests.get(url)
        return response.text
    else:
        return "Invalid URL"

# good：检查并阻止内网IP地址
from ipaddress import ip_address, ip_network

def is_internal_ip(ip):
    private_networks = [
        ip_network('10.0.0.0/8'),
        ip_network('172.16.0.0/12'),
        ip_network('192.168.0.0/16'),
        ip_network('127.0.0.1')
    ]
    address = ip_address(ip)
    for network in private_networks:
        if address in network:
            return True
    return False

@app.route('/safe_ssrf')
def safe_test_2():
    url = request.args.get('url')
    parsed_url = urlparse(url)
    host_ip = socket.gethostbyname(parsed_url.hostname)
    if not is_internal_ip(host_ip):
        response = requests.get(url)
        return response.text
    else:
        return "Access Denied"
```

JavaScript代码示例：

```javascript
// bad: 直接从用户输入获取URL并发起请求，没有进行URL验证
app.get('/unsafe_ssrf', function(req, res) {
    var url = req.query.url;
    request(url, function(error, response, body) {
        res.send(body);
    });
});

// good: 限制只能访问特定域名
app.get('/safe_ssrf', function(req, res) {
    var url = req.query.url;
    var allowedHost = "example.com"; // 可信域名
    var parsedUrl = new URL(url);

    if (parsedUrl.hostname.endsWith(allowedHost)) {
        request(url, function(error, response, body) {
            res.send(body);
        });
    } else {
        res.status(403).send("Access denied");
    }
});

// good: 检查并阻止内网IP地址
app.get('/safe_ssrf', function(req, res) {
    var url = req.query.url;
    var parsedUrl = new URL(url);

    dns.lookup(parsedUrl.hostname, function(err, address) {
        if (isInternalIp(address)) { // 自定义函数isInternalIp需要实现IP安全检查
            res.status(403).send("Access to internal resources is forbidden");
        } else {
            request(url, function(error, response, body) {
                res.send(body);
            });
        }
    });
});

// good: 仅允许HTTP和HTTPS请求，且限制为常用端口
app.get('/safe_ssrf', function(req, res) {
    var url = req.query.url;
    var parsedUrl = new URL(url);

    if ((parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") &&
        (parsedUrl.port === "80" || parsedUrl.port === "443" || parsedUrl.port === "8080" || parsedUrl.port === "8090")) {
        request(url, function(error, response, body) {
            res.send(body);
        });
    } else {
        res.status(403).send("Invalid protocol or port");
    }
});
```

WebGoat-main/src/main/java/org/owasp/webgoat/lessons/ssrf/SSRFTask2.java

```java
/*
SSRFTask2.java:47  url是污点来源
SSRFTask2.java:48  污点url传入方法furBall(String)
SSRFTask2.java:51  furBall(String)方法的url参数为污点
SSRFTask2.java:54  服务端请求伪造类型风险触发，由入参url导致
*/

@RestController
@AssignmentHints({"ssrf.hint3"})
public class SSRFTask2 implements AssignmentEndpoint {

  @PostMapping("/SSRF/task2")
  @ResponseBody
  public AttackResult completed(@RequestParam String url) {
    return furBall(url);
  }

  protected AttackResult furBall(String url) {
    if (url.matches("http://ifconfig\\.pro")) {
      String html;
      try (InputStream in = new URL(url).openStream()) {
        html =
            new String(in.readAllBytes(), StandardCharsets.UTF_8)
                .replaceAll("\n", "<br>"); // Otherwise the \n gets escaped in the response
      } catch (MalformedURLException e) {
        return getFailedResult(e.getMessage());
      } catch (IOException e) {
        // in case the external site is down, the test and lesson should still be ok
        html =
            "<html><body>Although the http://ifconfig.pro site is down, you still managed to solve"
                + " this exercise the right way!</body></html>";
      }
      return success(this).feedback("ssrf.success").output(html).build();
    }
    var html = "<img class=\"image\" alt=\"image post\" src=\"images/cat.jpg\">";
    return getFailedResult(html);
  }

  private AttackResult getFailedResult(String errorMsg) {
    return failed(this).feedback("ssrf.failure").output(errorMsg).build();
  }
}
```

