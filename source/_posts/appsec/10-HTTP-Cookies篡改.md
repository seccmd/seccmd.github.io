---
date: 2025-01-01
title: HTTP Cookies 篡改缺陷 - 腾讯安全代码审计实战系列10
authors: [SecCMD]
description: >
  应用程序将未经验证的输入数据置于 HTTP 响应的 Cookie 中，可以导致多种安全攻击，例如跨站请求伪造 (CSRF)、HTTP 响应拆分、跨站脚本攻击 (XSS) 和页面劫持。这些攻击利用应用程序未能验证输入数据的漏洞，将恶意内容注入响应头中，并可能危害用户的敏感信息和应用的完整性。
categories: 安全开发
tags:
  - 安全开发
  - 应用安全
---

### HTTP Cookies 篡改缺陷 - 腾讯安全代码审计实战系列10

应用程序将未经验证的输入数据置于 HTTP 响应的 Cookie 中，可以导致多种安全攻击，例如跨站请求伪造 (CSRF)、HTTP 响应拆分、跨站脚本攻击 (XSS) 和页面劫持。这些攻击利用应用程序未能验证输入数据的漏洞，将恶意内容注入响应头中，并可能危害用户的敏感信息和应用的完整性。

### 修复建议

1. 对输入数据进行严格校验，确保其格式和内容符合预期。 
2. 实施严格的输出验证，防止不受控制的字符出现在 HTTP 响应头中。 
3. 使用HTTP-only和Secure标志配置Cookies，限制其访问性和传输安全性。 
4. 采用安全字符允许列表，并拒绝出现特殊字符（如 CR 和 LF）的输入数据。
5. 定期审查和测试应用程序，以确保对新兴攻击向量的防御能力。

### 示例代码

```java
public class CookieHandler {

    //bad：直接从请求参数获取数据并设置为Cookie，没有进行数据验证
    public void AddUnsafeCookie(HttpResponse response, string author) {
        response.Cookies.Add(new HttpCookie("author", author)); // 漏洞：没有进行适当的验证和清理
    }

    //good：对Cookie数据进行验证，并设置HTTP-only和Secure标志
    public void AddSafeCookie(HttpResponse response, string author) {
        if (!IsValidAuthor(author)) {
            throw new ArgumentException("Invalid author data");
        }
        HttpCookie cookie = new HttpCookie("author", HttpUtility.HtmlEncode(author))
        {
            HttpOnly = true, // 限制客户端脚本访问
            Secure = true    // 只能通过HTTPS传输
        };
        response.Cookies.Add(cookie); // 安全：经过有效性验证并设置安全标志
    }

    //good：使用更严格的数据清理机制
    public void AddSecureCookie(HttpResponse response, string author) {
        if (!IsValidAuthor(author)) {
            throw new ArgumentException("Invalid author data");
        }
        HttpCookie cookie = new HttpCookie("author", HttpUtility.HtmlEncode(author))
        {
            HttpOnly = true,
            Secure = true
        };
        response.Cookies.Add(cookie); // 安全：经过严格的验证和编码
    }

    private bool IsValidAuthor(string author) {
        // 假设有效的作者名仅包含字母或数字字符
        return !string.IsNullOrEmpty(author) && !author.Any(ch => !char.IsLetterOrDigit(ch));
    }
}
```