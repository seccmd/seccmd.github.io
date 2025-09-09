---
date: 2025-01-01
title: 系统Debug信息泄露缺陷 - 腾讯安全代码审计实战系列12
authors: [SecCMD]
description: >
  将未经验证的用户输入写入Debug日志文件可能导致攻击者伪造日志条目或将恶意信息注入日志中。这种攻击方式被称为Log Forging，可能会破坏日志的完整性，掩盖攻击者的行为轨迹，甚至影响日志处理工具的正常功能。
categories: 安全开发
tags:
  - 安全开发
  - 应用安全
---

### 系统Debug信息泄露缺陷 - 腾讯安全代码审计实战系列12

将未经验证的用户输入写入Debug日志文件可能导致攻击者伪造日志条目或将恶意信息注入日志中。这种攻击方式被称为Log Forging，可能会破坏日志的完整性，掩盖攻击者的行为轨迹，甚至影响日志处理工具的正常功能。

### 修复建议

1. 创建和使用一组预定义的、合法的日志条目，确保输入不会直接写入日志，尤其是用户提供的未经验证的数据。 
2. 在日志记录之前，对用户输入进行校验和清理，仅允许安全的字符集出现，例如移除换行符以及其他特定字符。 
3. 使用服务器控制的数值来记录动态内容，避免使用用户直接提供的数据。 
4. 对敏感信息进行脱敏或使用占位符代替，避免记录原始输入值。

### 示例代码

```java
// bad：直接记录未经验证的用户输入，可能导致日志伪造攻击
public class UnsafeLoggerExample {
    private static final Log logger = LogFactory.getLog(UnsafeLoggerExample.class);

    public void logUserInput(String userInput) {
        // 不安全：直接记录用户输入
        logger.debug("User input: " + userInput);
    }
}

// good：对用户输入进行验证和清理，防止日志伪造攻击
public class SafeLoggerExample {
    private static final Log logger = LogFactory.getLog(SafeLoggerExample.class);

    public void logUserInput(String userInput) {
        // 安全：对用户输入进行验证和清理
        String sanitizedInput = sanitizeInput(userInput);
        logger.debug("User input: {}", sanitizedInput);
    }

    private String sanitizeInput(String input) {
        // 实现具体的输入验证和清理逻辑
        // 例如，移除不允许的字符或模式
        return input.replaceAll("[\r\n]", "_");
    }
}
```