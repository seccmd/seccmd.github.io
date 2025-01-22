---
date: 2025-01-01
title: XML外部实体缺陷 - 腾讯安全代码审计实战系列03
authors: [SecCMD]
description: >
  XML用于标记电子文件使其具有结构性的标记语言, 可以用来标记数据, 定义数据类型, 是一种允许用户对自己的标记语言进行定义的源语言. XML文档结构包括XML声明, DTD文档类型定义(可选), 文档元素. DTD的作用是定义XML文档的合法构建模块, DTD可以在XML文档内声明, 也可以外部引用. 当应用程序允许XML引用外部实体时, 通过构造恶意内容, 可导致XXE漏洞。
categories: 安全开发
tags:
  - 安全开发
  - 应用安全
---

### XML外部实体缺陷 - 腾讯安全代码审计实战系列03

XML用于标记电子文件使其具有结构性的标记语言, 可以用来标记数据, 定义数据类型, 是一种允许用户对自己的标记语言进行定义的源语言. XML文档结构包括XML声明, DTD文档类型定义(可选), 文档元素. DTD的作用是定义XML文档的合法构建模块, DTD可以在XML文档内声明, 也可以外部引用. 当应用程序允许XML引用外部实体时, 通过构造恶意内容, 可导致XXE漏洞。

危害如下: 1. 读取任意文件 2. 执行系统命令 3. 探测内网端口 4. 攻击内网网站

### 修复建议

1. 使用开发语言提供的禁用外部实体的方法。确保在解析XML前禁用DTD（文档类型定义）和禁止外部实体的解析。 
2. 过滤用户提交的XML数据，特别是对于嵌入XML或DTD的输入，进行严格的验证和过滤，确保它们不包含对外部实体或不安全的结构的引用。

### 示例代码

Java代码示例：

```java
// bad：直接解析未经过滤或检查的XML字符串
@RequestMapping("/xxe")
public void test(String xmlstr) throws IOException {
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    try {
        InputStream is = new ByteArrayInputStream(xmlstr.getBytes());
        DocumentBuilder builder = factory.newDocumentBuilder();
        builder.parse(is);               
    } catch (Exception e) {
        e.printStackTrace();
    }
}

// good：禁用外部实体和DTD，防止XXE
@RequestMapping("/no_xxe")
public void test(String xmlstr) throws IOException {
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    try {
        // 禁用DTD、禁止外部实体解析
        factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
        factory.setFeature("http://xml.org/sax/features/external-general-entities", false);
        factory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
        InputStream is = new ByteArrayInputStream(xmlstr.getBytes());
        DocumentBuilder builder = factory.newDocumentBuilder();
        builder.parse(is);               
    } catch (Exception e) {
        e.printStackTrace();
    }
}

// good：在解析XML前对XML内容进行验证和过滤
@RequestMapping("/validate_xxe")
public void validateAndParse(String xmlstr) throws IOException {
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    try {
        if (!isValidXML(xmlstr)) {  // 假设isValidXML为自定义方法，用于检查XML的安全性
            throw new IOException("Invalid XML content.");
        }
        
        factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
        factory.setFeature("http://xml.org/sax/features/external-general-entities", false);
        factory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
        
        InputStream is = new ByteArrayInputStream(xmlstr.getBytes());
        DocumentBuilder builder = factory.newDocumentBuilder();
        builder.parse(is);
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

Go代码示例：

```go
//bad: 使用默认的XML解析器，未禁用外部实体解析
func unsafeParseXML(data []byte) {
    xmlReader := bytes.NewReader(data)
    decoder := xml.NewDecoder(xmlReader)
    
    var target interface{}
    if err := decoder.Decode(&target); err != nil {
        log.Println("Error decoding XML:", err)
    }
}

//good: 明确禁用DTD和外部实体解析
func safeParseXML(data []byte) {
    xmlReader := bytes.NewReader(data)
    decoder := xml.NewDecoder(xmlReader)
    decoder.Strict = false
    decoder.Entity = nil
    
    var target interface{}
    if err := decoder.Decode(&target); err != nil {
        log.Println("Error decoding XML:", err)
    }
}
```

PHP代码示例：

```php
// bad：未禁用外部实体加载，容易受到XXE攻击
function unsafeXMLParse($xmlContent) {
    $xml = simplexml_load_string($xmlContent);  // 这里没有禁用实体加载
    // 假设进行一些基于$xml的处理
}

// good：加载XML前，禁用实体解析
libxml_disable_entity_loader(true);
$xml = simplexml_load_string($xmlContent);

// good：通过DOMDocument禁用外部实体，增加安全性
function safeXMLParse($xmlContent) {
    libxml_disable_entity_loader(true);  // 禁用外部实体加载
    $dom = new DOMDocument();
    $dom->loadXML($xmlContent, LIBXML_NOENT | LIBXML_DTDLOAD);  // 明确禁用DTD加载和外部实体
    // 假设进行一些基于$dom的处理
}
```

Python代码示例：

```python
# bad：允许外部实体，可能导致XXE攻击
from xml.etree.ElementTree import parse

def unsafe_parse_xml(xml_file):
    # 这种方式没有禁用外部实体
    tree = parse(xml_file)
    root = tree.getroot()
    return root

# bad：错误的配置解析器，未禁用外部实体
from lxml import etree

def incorrect_parse_xml(xml_file):
    parser = etree.XMLParser()  # 默认情况允许外部实体
    tree = etree.parse(xml_file, parser)
    root = tree.getroot()
    return root

# good：禁用外部实体
from lxml import etree

def safe_parse_xml(xml_file):
    # 配置解析器以禁用外部实体
    parser = etree.XMLParser(resolve_entities=False)
    tree = etree.parse(xml_file, parser)
    root = tree.getroot()
    return root

# good 禁用外部实体
from lxml import etree
def parse_xml(xmlSource):
    xmlData = etree.parse(xmlSource, etree.XMLParser(resolve_entities=False))
    return xmlData.getroot()
```

JavaScript代码示例：

```javascript
const xml2js = require('xml2js');
const fs = require('fs');

//bad：未禁用外部实体，可能导致XXE攻击
function unsafeParseXML(xmlData) {
    const parser = new xml2js.Parser(); // 默认情况下可能允许外部实体
    parser.parseString(xmlData, (err, result) => {
        console.log(result);
    });
}

//good：禁用外部实体和DTD
function safeParseXML(xmlData) {
    const parser = new xml2js.Parser({
        explicitRoot: false,            // 不解析根节点
        ignoreAttrs: true,              // 不解析属性
        explicitArray: false,           // 不强制数组输出
        dtd: {
            external: false             // 禁止加载外部DTD
        }
    });
    parser.parseString(xmlData, (err, result) => {
        if (err) {
            console.error("Failed to parse XML:", err);
            return;
        }
        console.log("Safely parsed XML:", result);
    });
}

const xmlData = fs.readFileSync('example.xml', 'utf8');
unsafeParseXML(xmlData);
safeParseXML(xmlData);
```



WebGoat-main/src/main/java/org/owasp/webgoat/lessons/xxe/CommentsCache.java

```java
/*
SimpleXXE.java:68     commentStr是污点来源
SimpleXXE.java:72     污点commentStr传入方法parseXml(String, boolean)
CommentsCache.java:86 parseXml(String, boolean)方法的xml参数为污点
CommentsCache.java:97 XML外部实体类型风险触发，由入参xml导致
*/
@Component
@Scope("singleton")
public class CommentsCache {

  static class Comments extends ArrayList<Comment> {
    void sort() {
      sort(Comparator.comparing(Comment::getDateTime).reversed());
    }
  }

  private static final Comments comments = new Comments();
  private static final Map<WebGoatUser, Comments> userComments = new HashMap<>();
  private static final DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd, HH:mm:ss");

  public CommentsCache() {
    initDefaultComments();
  }

  void initDefaultComments() {
    comments.add(new Comment("webgoat", LocalDateTime.now().format(fmt), "Silly cat...."));
    comments.add(
        new Comment(
            "guest",
            LocalDateTime.now().format(fmt),
            "I think I will use this picture in one of my projects."));
    comments.add(new Comment("guest", LocalDateTime.now().format(fmt), "Lol!! :-)."));
  }

  protected Comments getComments(WebGoatUser user) {
    Comments allComments = new Comments();
    Comments commentsByUser = userComments.get(user);
    if (commentsByUser != null) {
      allComments.addAll(commentsByUser);
    }
    allComments.addAll(comments);
    allComments.sort();
    return allComments;
  }

  protected Comment parseXml(String xml, boolean securityEnabled)
      throws XMLStreamException, JAXBException {
    var jc = JAXBContext.newInstance(Comment.class);
    var xif = XMLInputFactory.newInstance();

    // TODO fix me disabled for now.
    if (securityEnabled) {
      xif.setProperty(XMLConstants.ACCESS_EXTERNAL_DTD, ""); // Compliant
      xif.setProperty(XMLConstants.ACCESS_EXTERNAL_SCHEMA, ""); // compliant
    }

    var xsr = xif.createXMLStreamReader(new StringReader(xml));

    var unmarshaller = jc.createUnmarshaller();
    return (Comment) unmarshaller.unmarshal(xsr);
  }

  public void addComment(Comment comment, WebGoatUser user, boolean visibleForAllUsers) {
    comment.setDateTime(LocalDateTime.now().format(fmt));
    comment.setUser(user.getUsername());
    if (visibleForAllUsers) {
      comments.add(comment);
    } else {
      var comments = userComments.getOrDefault(user.getUsername(), new Comments());
      comments.add(comment);
      userComments.put(user, comments);
    }
  }

  public void reset(WebGoatUser user) {
    comments.clear();
    userComments.remove(user);
    initDefaultComments();
  }
}
```

