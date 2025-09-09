---
date: 2025-01-01
title: 01-SQL注入缺陷 
author: [SecCMD]
description: >
  SQL注入是网站存在最多也是最简单的漏洞，原因是应用程序在处理用户输入没有过滤, 转义, 限制或处理不严谨, 导致用户可以通过输入精心构造的字符串去非法获取到数据库中的数据。
categories: 安全开发
tags:
  - 安全开发
  - 应用安全
---

### SQL注入缺陷 - 腾讯安全代码审计实战系列01

SQL注入是网站存在最多也是最简单的漏洞，原因是应用程序在处理用户输入没有过滤, 转义, 限制或处理不严谨, 导致用户可以通过输入精心构造的字符串去非法获取到数据库中的数据。

危害如下: 

1. 获取敏感数据, 修改数据库数据(插入, 更新, 删除), 执行数据库管理操作(如关闭数据库管理系统)等 
1. 在某些情况下能执行系统命令, 进而直接获取数据库服务器的系统权限

### 修复建议

1. 使用数据库预编译语句 (prepared statements) 或参数绑定，而不是直接将用户输入拼接到SQL查询中。这可以极大地减少SQL注入的风险。 
2. 对所有用户输入进行严格的验证和过滤，尤其是对于那些用于数据库查询的输入。删除或转义SQL语句中可能被用于注入攻击的特殊字符。 
3. 使用最新的库和API，确保使用具有内置防注入特性的数据库访问技术和框架。 4. 确保所有的数据库查询都使用一致的字符编码，推荐使用UTF-8，以避免由于编码不一致导致的安全漏洞。

### 示例代码

Java代码示例：

```Java
// bad：直接将用户输入拼接到SQL查询中，存在SQL注入的风险
public void unsafeQuery(HttpServletRequest request, Connection connection) {
    String custname = request.getParameter("name"); 
    String query = "SELECT * FROM user_data WHERE user_name = '" + custname + "'";
    try {
        Statement stmt = connection.createStatement();
        ResultSet results = stmt.executeQuery(query);
    } catch (SQLException e) {
        e.printStackTrace();
    }
}

// good：已提供的示例使用PreparedStatement防止SQL注入
String custname = request.getParameter("name"); 
String query = "SELECT * FROM user_data WHERE user_name = ? ";
PreparedStatement pstmt = connection.prepareStatement(query);
pstmt.setString(1, custname); 
ResultSet results = pstmt.executeQuery();

// good：使用MyBatis的#{ }占位符自动处理参数，避免SQL注入
<select id="queryRuleIdByApplicationId" parameterType="java.lang.String" resultType="java.lang.String">    
    select rule_id from scan_rule_sqlmap_tab where application_id=#{applicationId} 
</select>

// good：对用户输入进行严格的验证和过滤后使用PreparedStatement
public void safeQueryWithValidation(HttpServletRequest request, Connection connection) {
    String custname = request.getParameter("name").replaceAll("[^\\w\\s]", ""); // 过滤掉非字母数字的字符
    String query = "SELECT * FROM user_data WHERE user_name = ?";
    try {
        PreparedStatement pstmt = connection.prepareStatement(query);
        pstmt.setString(1, custname);
        ResultSet results = pstmt.executeQuery();
    } catch (SQLException e) {
        e.printStackTrace();
    }
}
```

Go代码示例：

```Go
// bad: 直接将用户输入拼接到SQL查询中，存在SQL注入的风险
func vulnerableHandler(db *sql.DB, req *http.Request) {
    query := fmt.Sprintf("SELECT ITEM, PRICE FROM PRODUCT WHERE ITEM_CATEGORY='%s' ORDER BY PRICE",
        req.URL.Query().Get("category"))
    db.Query(query)
}

// good: 使用预编译语句和参数绑定，防止SQL注入
func safeHandler(db *sql.DB, req *http.Request) {
    query := "SELECT ITEM, PRICE FROM PRODUCT WHERE ITEM_CATEGORY=? ORDER BY PRICE"
    db.Query(query, req.URL.Query().Get("category"))
}
```

PHP代码示例：

```PHP
// bad：未使用参数绑定方式执行SQL查询
$id = $_GET['id'];
$sql = "SELECT * FROM pages WHERE id = $id";
$result = $mysql->query($sql);

// good: 使用PDO，基于参数绑定的方式执行SQL语句
$sth = $dbh->prepare('SELECT name, colour, calories
    FROM fruit
    WHERE calories < ? AND colour = ?');
$sth->execute(array(150, 'red'));
$red = $sth->fetchAll();

// good: 使用PDO，基于参数绑定的方式执行SQL语句
$sql = 'SELECT name, colour, calories
    FROM fruit
    WHERE calories < :calories AND colour = :colour';
$sth = $dbh->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$sth->execute(array(':calories' => 150, ':colour' => 'red'));
$red = $sth->fetchAll();
```

Python代码示例：

```Python
# bad：直接通过字符串格式化将用户输入拼接到SQL查询中，存在SQL注入风险
import mysql.connector

mydb = mysql.connector.connect(
  ... ...
)

cur = mydb.cursor()
userid = get_id_from_user()
cur.execute("SELECT `id`, `password` FROM `auth_user` WHERE `id`='%s'" % userid)  # 前后添加引号，查询仍然危险
myresult = cur.fetchall()

# good：使用参数化查询方式，避免SQL注入
import mysql.connector

mydb = mysql.connector.connect(
  ... ...
)

cur = mydb.cursor()
userid = get_id_from_user()
# 使用参数化查询，用户输入作为查询参数
cur.execute("SELECT `id`, `password` FROM `auth_user` WHERE `id`=%s", (userid,))
myresult = cur.fetchall()

# good：增加输入验证，确保用户输入格式正确
import mysql.connector
import re

def safe_get_id_from_user():
    userid = get_id_from_user()
    if not re.match(r"^\d+$", userid):
        raise ValueError("Invalid user ID format")
    return userid

mydb = mysql.connector.connect(
  ... ...
)

cur = mydb.cursor()
userid = safe_get_id_from_user()
cur.execute("SELECT `id`, `password` FROM `auth_user` WHERE `id`=%s", (userid,))
myresult = cur.fetchall()
```

JavaScript代码示例：

```JavaScript
// bad：拼接SQL语句查询，存在安全风险
const mysql  = require("mysql");
const connection = mysql.createConnection(options);
connection.connect();

const sql = util.format("SELECT * from some_table WHERE Id = %s and Name = %s", req.body.id, req.body.name);
connection.query(sql, (err, result) => {
    // handle errors...
});  

// good：使用预编译绑定变量构造SQL语句
const mysql  = require("mysql");
const connection = mysql.createConnection(options);
connection.connect();

const sql = "SELECT * from some_table WHERE Id = ? and Name = ?";
const sqlParams = [req.body.id, req.body.name];
connection.query(sql, sqlParams, (err, result) => {
    // handle errors...
});
```



WebGoat-main/src/main/java/org/owasp/webgoat/lessons/challenges/challenge5/Assignment5.java

```JAVA
/*
Assignment5.java:52 username_login是污点来源
Assignment5.java:61 污点从username_login传递至statement
Assignment5.java:68 SQL注入类型风险触发，由入参statement导致
*/
package org.owasp.webgoat.lessons.challenges.challenge5;

@RestController
@Slf4j
@RequiredArgsConstructor
public class Assignment5 implements AssignmentEndpoint {

  private final LessonDataSource dataSource;
  private final Flags flags;

  @PostMapping("/challenge/5")
  @ResponseBody
  public AttackResult login(
      @RequestParam String username_login, @RequestParam String password_login) throws Exception {
    if (!StringUtils.hasText(username_login) || !StringUtils.hasText(password_login)) {
      return failed(this).feedback("required4").build();
    }
    if (!"Larry".equals(username_login)) {
      return failed(this).feedback("user.not.larry").feedbackArgs(username_login).build();
    }
    try (var connection = dataSource.getConnection()) {
      PreparedStatement statement =
          connection.prepareStatement(
              "select password from challenge_users where userid = '"
                  + username_login
                  + "' and password = '"
                  + password_login
                  + "'");
      ResultSet resultSet = statement.executeQuery();

      if (resultSet.next()) {
        return success(this).feedback("challenge.solved").feedbackArgs(flags.getFlag(5)).build();
      } else {
        return failed(this).feedback("challenge.close").build();
      }
    }
  }
}
```

