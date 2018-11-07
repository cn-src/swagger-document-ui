[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Maven Central](https://img.shields.io/maven-central/v/cn.javaer.springfox/swagger-document-ui.svg)

Swagger 文档型 UI

------
Swagger 规范接口的文档型 API UI 界面

主要使用 Vue CLI 3，iView 开发，主要体现文档的可读性功能。

[Github & Issues: https://github.com/cn-src/swagger-document-ui](https://github.com/cn-src/swagger-document-ui)

[码云: https://gitee.com/cn-src/swagger-document-ui](https://gitee.com/cn-src/swagger-document-ui)

# 使用方式
## 主要步骤
* 此项目需要配合 springfox 框架使用，因此使用之前需要对 springfox 有所了解
* 配置 swagger-document-ui 替换其它 UI
* 地址样例 http://localhost:8080/swagger-ui.html
* [springfox 官方文档](http://springfox.github.io/springfox/docs/current/)

1. **移除**官方 UI 依赖
```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>${springfox.version}</version>
</dependency>
```

2. 添加 swagger-document-ui 依赖
```xml
<dependency>
    <groupId>cn.javaer.springfox</groupId>
    <artifactId>swagger-document-ui</artifactId>
    <version>0.1.2</version>
</dependency>
```

## Spring Boot 集成
与 Spring Boot 集成使用是最简单的方式，推荐使用 [程序猿DD/spring-boot-starter-swagger](https://gitee.com/didispace/spring-boot-starter-swagger)
提供的集成方式，然后你需要：

1. 排除自带 UI 依赖
```xml
<dependency>
    <groupId>com.spring4all</groupId>
    <artifactId>swagger-spring-boot-starter</artifactId>
    <version>${swagger-spring-boot-starter.version}</version>
    <!--排除自带 UI 依赖-->
    <exclusions>
        <exclusion>
            <artifactId>springfox-swagger-ui</artifactId>
            <groupId>io.springfox</groupId>
        </exclusion>
    </exclusions>
</dependency>
```

2. 添加 swagger-document-ui 依赖
```xml
<dependency>
    <groupId>cn.javaer.springfox</groupId>
    <artifactId>swagger-document-ui</artifactId>
    <version>0.1.2</version>
</dependency>
```

# 效果预览

![](docs/demo.png)

