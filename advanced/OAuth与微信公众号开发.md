<!--
$theme: gaia
template: gaia
-->

Node.js进阶
OAuth2与微信公共号开发<p style="text-align:right;font-size:28px;margin-right:50px;color:#cFc;">:star: by calidion</p>
===

---
OAuth介绍
===
OAuth是一个开放的资源授权标准。
目前主要有两个版本：
1. 1.0, 1.0a
对应[rfc5849](https://tools.ietf.org/html/rfc5849)
2. 2.0	
对应[rfc6749](https://tools.ietf.org/html/rfc6749)

---
为什么要使用OAuth？
===
对于腾讯、阿里这样的公司，它们需要
1. 分享用户
与第三方公司合作，让第三方公司可以访问到它们的相关用户信息。

2. 分享资源
把很多资源拿出来授权给可信的个人或者组织，但是又不能完全授权

3. 扩展网站能力
虽然他们的能力非常强大，但是不可能面面具到，所以需要第三方参与提供更加多元的能力

---

4. 有限访问
可以尽可能更加细粒度的控制自己的资源，并且进行管理

5. 实现无密码访问
不需要将密码保存在第三方网站，就能享用第三方网站的功能

6. 授权管理
可以随时对授权进行撤回处理，提高安全性

---
OAuth的角色
===
1. resource owner（资源拥有者）
一个可以授权资源的实体。如果是一个个人时，通常是指最终用户。比如微信用户。

2. resource server（资源服务器）
拥有资源的服务器，基于访问token接受或者响应对受限资源的请求。比如微信的各种资源服务器。

3. client（客户）
请求资源的应用。不限于应用的形式，可以是服务器，桌面应用，手机应用等。比如微信公众号开发者的服务器。

---
4. authorization server（身份鉴权服务器/授权服务器）
发出访问token给client的服务器。当resource owner允许了client的授权请求后，authorization server就会生成一个token给client。

>2和4可以是同一个服务器
>2和4的交互不在OAuth的讨论范围

---

```
+--------+                               +---------------+
|        |--(A)- Authorization Request ->|   Resource    |
|        |                               |     Owner     |
|        |<-(B)-- Authorization Grant ---|               |
|        |                               +---------------+
|        |
|        |                               +---------------+
|        |--(C)-- Authorization Grant -->| Authorization |
| Client |                               |     Server    |
|        |<-(D)----- Access Token -------|               |
|        |                               +---------------+
|        |
|        |                               +---------------+
|        |--(E)----- Access Token ------>|    Resource   |
|        |                               |     Server    |
|        |<-(F)--- Protected Resource ---|               |
+--------+                               +---------------+
                Figure 1: Abstract Protocol Flow
```

---
协议流程
===
1. 向资源拥有者(Resource Owner)发起资源许可(Grant)请求。
请求通常可以直接向资源拥有者(Resource Owner)发起，也可以通过授权服务器(Authorization Server）跳转过来。
2. 从资源拥有者(Resource Owner)手中获取资源许可(Grant)
这个授权代表资源拥有者(Resource Owner)，并且包含有四种许可(Grant)类型。许可(Grant)类型与客户端的请求和服务器的支持相关。

---

3. 客户端带允许(Grant)向授权服务器(Authorization Server）请求Token
4. 鉴权成功，客户端获取Token
5. 客户端带Token向资源服务器(Resource Server)请求资源
6. 资源服务器(Resource Server)返回资源内容

---
简单说就是：
1. 用户许可(Grant)
2. 服务器授权(Token)
3. 资源获取

OAuth添加了1, 2两步用于验证，让第三步更加安全

---
OAuth运行的先决条件
===
1. 资源服务器(Resource Server)与拥有者(Resource Owner）都已经存在
2. 授权服务器(Authorization Server)存在，并且可以注册
3. 客户端（Client）在授权服务器(Authorization Server)上已经注册完成，否则无法获得服务器授权或者跳转

最后客户端要实现相关的请求。

对于微信开发来讲，微信用户就资源与拥有者。只需要对接微信的授权服务器就可以开始微信开发了。

---
客户注册(Client Registration)
===
1. 通常会填写相关的表单
2. 或者其它的方式创建客户信息

必须完成的工作：
1.确定客户类型
2.重定向URI，回调URL
3.其它服务器要求的信息（比如密钥）

这个过程类似于微信公众帐号的注册。

---
客户类型（Client Types）
===
1. confidential
客户可以自己维护好授权信息，能有效限制不合法的访问。通常HTTP服务器都是这种类型。

2. public
不能通过自己来维护授权信息。比如手机原生应用与基于浏览器的应用。

所以微信API里会分成不同的调用SDK，有给服务器的，有给客户端的。

---
客户标识（Client Identifier）
===
客户标识（Client Identifier）是一个唯一的字符串。
用于在授权服务器（authorization server）上标记客户身份。

这里的客户标识（Client Identifier）对应于微信里的AppId。

---
客户验证（Client Authentication)
===
当客户是confidential类型时，授权服务器（authorization server）与客户需要建立一个可信的机制。
授权服务器（authorization server）可以设定各种安全的验证形式以方便客户端访问。

例如微信的ack服务器可以用来验证客户端。

---
客户密码（Client Password）
===
客户密码可以有以下几种形式：

1. HTTP Basic(服务器端必须支持)
这时username与password都被保存在HTTP的Authorization头里，以application/x-www-form-urlencoded的形式。

示例：
```
Authorization: Basic czZCaGRSa3F0Mzo3RmpmcDBaQnIxS3REUmJuZlZkbUl3
```

---

2. POST请求发送body(服务器可选支持)
适合可信的客户端。

必须包含下面两个字段：
1.client_id 客户ID或者客户标识（Client Identifier）
2.client_secret 客户端密钥


不允许将这两个字符放在URI中，必须放在POST的body里。
这种方式不是推荐的方式。
这时鉴定权服务器必须使用TLS，也就是必须是HTTPS服务器

---
示例：

```
     POST /token HTTP/1.1
     Host: server.example.com
     Content-Type: application/x-www-form-urlencoded

     grant_type=refresh_token&refresh_token=tGzv3JOkF0XG5Qx2TlKWIA
     &client_id=s6BhdRkqt3&client_secret=7Fjfp0ZBr1KtDRbnfVdmIw
         
```

微信里有app_secret。

client_id => AppId
client_secret => app_secret

可以看出微信API的命名的不规范性

---
获取验证（Obtaining Authorization）
===
为了获取Token，Client需要从资源拥有者(Resource Owner)手里获取到授权（Authorization）。
这个授权（Authorization）是以某种授权许可(Authorization Grant)的形式来表达的。Client使用这个授权许可(Authorization Grant)	来获取Token.

而这个授权许可(Authorization Grant)可以分成多种类型。

---
授权许可(Authorization Grant)类型
===
1. 授权代码(Authorization Code)
2. 隐性（implicit）
3. 密码授权（Resource owner password）
4. 客户信任（Client Credentials）
5. 自定义类型

---


微信开发应用了1, 2, 4,三种类型的授权许可(Authorization Grant)类型，分别作用于
1) 网页授权
2) 应用授权
3) 服务器API授权

---
授权代码(Authorization Code)
===
---
这种模式可以用于获取Acess Token和Refresh Token两种形式，是针对可信客户端的（confidential clients）。
由于这个流程是基于重定向的，所以User-Agent(通常是浏览器）必须能处理来自授权服务器的请求。

类似于使用微信帐号登录第三方网站。

---


图示：

```
     +----------+
     | Resource |
     |   Owner  |
     |          |
     +----------+
          ^
          |
         (B)
     +----|-----+          Client Identifier      +---------------+
     |         -+----(A)-- & Redirection URI ---->|               |
     |  User-   |                                 | Authorization |
     |  Agent  -+----(B)-- User authenticates --->|     Server    |
     |          |                                 |               |
     |         -+----(C)-- Authorization Code ---<|               |
     +-|----|---+                                 +---------------+
       |    |                                         ^      v
      (A)  (C)                                        |      |
       |    |                                         |      |
       ^    v                                         |      |
     +---------+                                      |      |
     |         |>---(D)-- Authorization Code ---------'      |
     |  Client |          & Redirection URI                  |
     |         |                                             |
     |         |<---(E)----- Access Token -------------------'
     +---------+       (w/ Optional Refresh Token)

   Note: The lines illustrating steps (A), (B), and (C) are broken into
   two parts as they pass through the user-agent.

                     Figure 3: Authorization Code Flow
                     
```
---
说明

```
   (A)  The client initiates the flow by directing the resource owner's
        user-agent to the authorization endpoint.  The client includes
        its client identifier, requested scope, local state, and a
        redirection URI to which the authorization server will send the
        user-agent back once access is granted (or denied).

   (B)  The authorization server authenticates the resource owner (via
        the user-agent) and establishes whether the resource owner
        grants or denies the client's access request.

   (C)  Assuming the resource owner grants access, the authorization
        server redirects the user-agent back to the client using the
        redirection URI provided earlier (in the request or during
        client registration).  The redirection URI includes an
        authorization code and any local state provided by the client
        earlier.

   (D)  The client requests an access token from the authorization
        server's token endpoint by including the authorization code
        received in the previous step.  When making the request, the
        client authenticates with the authorization server.  The client
        includes the redirection URI used to obtain the authorization
        code for verification.

   (E)  The authorization server authenticates the client, validates the
        authorization code, and ensures that the redirection URI
        received matches the URI used to redirect the client in
        step (C).  If valid, the authorization server responds back with
        an access token and, optionally, a refresh token.
        
```

---
授权请求(Authorization Request)
===

格式：application/x-www-form-urlencoded
参数：

---

```
   response_type
         REQUIRED.  Value MUST be set to "code".

   client_id
         REQUIRED.  The client identifier as described in Section 2.2.

   redirect_uri
         OPTIONAL.  As described in Section 3.1.2.

   scope
         OPTIONAL.  The scope of the access request as described by
         Section 3.3.

   state
         RECOMMENDED.  An opaque value used by the client to maintain
         state between the request and callback.  The authorization
         server includes this value when redirecting the user-agent back
         to the client.  The parameter SHOULD be used for preventing
         cross-site request forgery as described in Section 10.12.
```

---
示例：

```
    GET /authorize?response_type=code&client_id=s6BhdRkqt3&state=xyz
        &redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb HTTP/1.1
    Host: server.example.com
```
---
授权返回(Authorization Response）

```
   code
         REQUIRED.  The authorization code generated by the
         authorization server.  The authorization code MUST expire
         shortly after it is issued to mitigate the risk of leaks.  A
         maximum authorization code lifetime of 10 minutes is
         RECOMMENDED.  The client MUST NOT use the authorization code
         more than once.  If an authorization code is used more than
         once, the authorization server MUST deny the request and SHOULD
         revoke (when possible) all tokens previously issued based on
         that authorization code.  The authorization code is bound to
         the client identifier and redirection URI.

   state
         REQUIRED if the "state" parameter was present in the client
         authorization request.  The exact value received from the
         client.

```
---
示例：

```
     HTTP/1.1 302 Found
     Location: https://client.example.com/cb?code=SplxlOBeZQQYbYS6WxSbIA
               &state=xyz
```

---
错误返回（Error Response）
```
   error
         REQUIRED.  A single ASCII [USASCII] error code from the
         following:

         invalid_request
               The request is missing a required parameter, includes an
               invalid parameter value, includes a parameter more than
               once, or is otherwise malformed.

         unauthorized_client
               The client is not authorized to request an authorization
               code using this method.

         access_denied
               The resource owner or authorization server denied the
               request.

         unsupported_response_type
               The authorization server does not support obtaining an
               authorization code using this method.

         invalid_scope
               The requested scope is invalid, unknown, or malformed.

         server_error
               The authorization server encountered an unexpected
               condition that prevented it from fulfilling the request.
               (This error code is needed because a 500 Internal Server
               Error HTTP status code cannot be returned to the client
               via an HTTP redirect.)

         temporarily_unavailable
               The authorization server is currently unable to handle
               the request due to a temporary overloading or maintenance
               of the server.  (This error code is needed because a 503
               Service Unavailable HTTP status code cannot be returned
               to the client via an HTTP redirect.)

         Values for the "error" parameter MUST NOT include characters
         outside the set %x20-21 / %x23-5B / %x5D-7E.

   error_description
         OPTIONAL.  Human-readable ASCII [USASCII] text providing
         additional information, used to assist the client developer in
         understanding the error that occurred.
         Values for the "error_description" parameter MUST NOT include
         characters outside the set %x20-21 / %x23-5B / %x5D-7E.

   error_uri
         OPTIONAL.  A URI identifying a human-readable web page with
         information about the error, used to provide the client
         developer with additional information about the error.
         Values for the "error_uri" parameter MUST conform to the
         URI-reference syntax and thus MUST NOT include characters
         outside the set %x21 / %x23-5B / %x5D-7E.
   state
         REQUIRED if a "state" parameter was present in the client
         authorization request.  The exact value received from the
         client.
```

---

```
 HTTP/1.1 302 Found
   Location: https://client.example.com/cb?error=access_denied&state=xyz
```
---
Token请求（Access Token Request）

```
   grant_type
         REQUIRED.  Value MUST be set to "authorization_code".

   code
         REQUIRED.  The authorization code received from the
         authorization server.

   redirect_uri
         REQUIRED, if the "redirect_uri" parameter was included in the
         authorization request as described in Section 4.1.1, and their
         values MUST be identical.

   client_id
         REQUIRED, if the client is not authenticating with the
         authorization server as described in Section 3.2.1.
```
---

示例:

```
     POST /token HTTP/1.1
     Host: server.example.com
     Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
     Content-Type: application/x-www-form-urlencoded

     grant_type=authorization_code&code=SplxlOBeZQQYbYS6WxSbIA
     &redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb
```

---
- Token响应（Access Token Response）
通常是JSON结果。示例：
```
     HTTP/1.1 200 OK
     Content-Type: application/json;charset=UTF-8
     Cache-Control: no-store
     Pragma: no-cache

     {
       "access_token":"2YotnFZFEjr1zCsicMWpAA",
       "token_type":"example",
       "expires_in":3600,
       "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
       "example_parameter":"example_value"
     }
```

---
默认许可(Implicit Grant)
===
---
这种模型主要是用来获取Access Token的，并且不支持Refresh Token。主要是用来提供公共的客户端(public clients)，即手机或者浏览器，知道如何处理重定向。
通常这里的客户端是浏览器的Javascript脚本

与授权代码（authorization code)不同，这个模型不需要发起两次请求（一次是授权，一次是获取Token)。
一次请求成功就会获得Token

---
不包含客户端验证，依靠资源拥有者的存在和重定向URI的注册。因为Access Token已经在重定向URI里面。这样它就可以交资源拥有者或者其它同一设备的应用。

---

```

     +----------+
     | Resource |
     |  Owner   |
     |          |
     +----------+
          ^
          |
         (B)
     +----|-----+          Client Identifier     +---------------+
     |         -+----(A)-- & Redirection URI --->|               |
     |  User-   |                                | Authorization |
     |  Agent  -|----(B)-- User authenticates -->|     Server    |
     |          |                                |               |
     |          |<---(C)--- Redirection URI ----<|               |
     |          |          with Access Token     +---------------+
     |          |            in Fragment
     |          |                                +---------------+
     |          |----(D)--- Redirection URI ---->|   Web-Hosted  |
     |          |          without Fragment      |     Client    |
     |          |                                |    Resource   |
     |     (F)  |<---(E)------- Script ---------<|               |
     |          |                                +---------------+
     +-|--------+
       |    |
      (A)  (G) Access Token
       |    |
       ^    v
     +---------+
     |         |
     |  Client |
     |         |
     +---------+

   Note: The lines illustrating steps (A) and (B) are broken into two
   parts as they pass through the user-agent.

                       Figure 4: Implicit Grant Flow
                       
```

---

说明：

```
   The flow illustrated in Figure 4 includes the following steps:

   (A)  The client initiates the flow by directing the resource owner's
        user-agent to the authorization endpoint.  The client includes
        its client identifier, requested scope, local state, and a
        redirection URI to which the authorization server will send the
        user-agent back once access is granted (or denied).

   (B)  The authorization server authenticates the resource owner (via
        the user-agent) and establishes whether the resource owner
        grants or denies the client's access request.

   (C)  Assuming the resource owner grants access, the authorization
        server redirects the user-agent back to the client using the
        redirection URI provided earlier.  The redirection URI includes
        the access token in the URI fragment.

   (D)  The user-agent follows the redirection instructions by making a
        request to the web-hosted client resource (which does not
        include the fragment per [RFC2616]).  The user-agent retains the
        fragment information locally.

   (E)  The web-hosted client resource returns a web page (typically an
        HTML document with an embedded script) capable of accessing the
        full redirection URI including the fragment retained by the
        user-agent, and extracting the access token (and other
        parameters) contained in the fragment.

   (F)  The user-agent executes the script provided by the web-hosted
        client resource locally, which extracts the access token.

   (G)  The user-agent passes the access token to the client.
```
---
授权请求（Authorization Request）
===

参数

---

```
   response_type
         REQUIRED.  Value MUST be set to "token".

   client_id
         REQUIRED.  The client identifier as described in Section 2.2.

   redirect_uri
         OPTIONAL.  As described in Section 3.1.2.

   scope
         OPTIONAL.  The scope of the access request as described by
         Section 3.3.

   state
         RECOMMENDED.  An opaque value used by the client to maintain
         state between the request and callback.  The authorization
         server includes this value when redirecting the user-agent back
         to the client.  The parameter SHOULD be used for preventing
         cross-site request forgery as described in Section 10.12.
```
---
示例：

```
    GET /authorize?response_type=token&client_id=s6BhdRkqt3&state=xyz
        &redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb HTTP/1.1
    Host: server.example.com   
```

---
Token响应（Access Token Response）
```
   access_token
         REQUIRED.  The access token issued by the authorization server.

   token_type
         REQUIRED.  The type of the token issued as described in
         Section 7.1.  Value is case insensitive.

   expires_in
         RECOMMENDED.  The lifetime in seconds of the access token.  For
         example, the value "3600" denotes that the access token will
         expire in one hour from the time the response was generated.
         If omitted, the authorization server SHOULD provide the
         expiration time via other means or document the default value.

   scope
         OPTIONAL, if identical to the scope requested by the client;
         otherwise, REQUIRED.  The scope of the access token as
         described by Section 3.3.

   state
         REQUIRED if the "state" parameter was present in the client
         authorization request.  The exact value received from the
         client.
         
```
---
示例

```
     HTTP/1.1 302 Found
     Location: http://example.com/cb#access_token=2YotnFZFEjr1zCsicMWpAA
               &state=xyz&token_type=example&expires_in=3600
```

Fragement是用#号开头的内容，这里对应
```
#access_token=2YotnFZFEjr1zCsicMWpAA&state=xyz&token_type=example&expires_in=3600
```

---
错误返回（Error Response）

同上

---

Resource Owner Password Credentials Grant
===
---
适合资源拥有者对客户端有足够的信任的情况。也就是客户端能方便的获得用户授权信息。


---
```
     +----------+
     | Resource |
     |  Owner   |
     |          |
     +----------+
          v
          |    Resource Owner
         (A) Password Credentials
          |
          v
     +---------+                                  +---------------+
     |         |>--(B)---- Resource Owner ------->|               |
     |         |         Password Credentials     | Authorization |
     | Client  |                                  |     Server    |
     |         |<--(C)---- Access Token ---------<|               |
     |         |    (w/ Optional Refresh Token)   |               |
     +---------+                                  +---------------+

            Figure 5: Resource Owner Password Credentials Flow
```
---
说明

```
   (A)  The resource owner provides the client with its username and
        password.

   (B)  The client requests an access token from the authorization
        server's token endpoint by including the credentials received
        from the resource owner.  When making the request, the client
        authenticates with the authorization server.

   (C)  The authorization server authenticates the client and validates
        the resource owner credentials, and if valid, issues an access
        token.
```

---

Token请求（Access Token Request）

```
   grant_type
         REQUIRED.  Value MUST be set to "password".

   username
         REQUIRED.  The resource owner username.

   password
         REQUIRED.  The resource owner password.

   scope
         OPTIONAL.  The scope of the access request as described by
         Section 3.3.
```

---

示例

```
     POST /token HTTP/1.1
     Host: server.example.com
     Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
     Content-Type: application/x-www-form-urlencoded

     grant_type=password&username=johndoe&password=A3ddj3w
```

---
Token响应（Access Token Response）

```
     HTTP/1.1 200 OK
     Content-Type: application/json;charset=UTF-8
     Cache-Control: no-store
     Pragma: no-cache

     {
       "access_token":"2YotnFZFEjr1zCsicMWpAA",
       "token_type":"example",
       "expires_in":3600,
       "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
       "example_parameter":"example_value"
     }
```
---

Client Credentials Grant
===
---
这种方式下客户端只能通过自己的授权信息来发起请求获取Access Token。这时他可以处理自己管理的资源或者被其它所有者授权的资源。

这种类型只适合confidential的客户端。
```
     +---------+                                  +---------------+
     |         |                                  |               |
     |         |>--(A)- Client Authentication --->| Authorization |
     | Client  |                                  |     Server    |
     |         |<--(B)---- Access Token ---------<|               |
     |         |                                  |               |
     +---------+                                  +---------------+

                     Figure 6: Client Credentials Flow
```
---
说明
```
   The flow illustrated in Figure 6 includes the following steps:

   (A)  The client authenticates with the authorization server and
        requests an access token from the token endpoint.

   (B)  The authorization server authenticates the client, and if valid,
        issues an access token.
```

---
Token请求（Access Token Request）
```
   grant_type
         REQUIRED.  Value MUST be set to "client_credentials".

   scope
         OPTIONAL.  The scope of the access request as described by
         Section 3.3.
```

---
 示例
 ```
      POST /token HTTP/1.1
     Host: server.example.com
     Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
     Content-Type: application/x-www-form-urlencoded

     grant_type=client_credentials
```
---
Token响应（Access Token Response）

```
     HTTP/1.1 200 OK
     Content-Type: application/json;charset=UTF-8
     Cache-Control: no-store
     Pragma: no-cache

     {
       "access_token":"2YotnFZFEjr1zCsicMWpAA",
       "token_type":"example",
       "expires_in":3600,
       "example_parameter":"example_value"
     }
```

---

Refresh Token
===
```
  +--------+                                           +---------------+
  |        |--(A)------- Authorization Grant --------->|               |
  |        |                                           |               |
  |        |<-(B)----------- Access Token -------------|               |
  |        |               & Refresh Token             |               |
  |        |                                           |               |
  |        |                            +----------+   |               |
  |        |--(C)---- Access Token ---->|          |   |               |
  |        |                            |          |   |               |
  |        |<-(D)- Protected Resource --| Resource |   | Authorization |
  | Client |                            |  Server  |   |     Server    |
  |        |--(E)---- Access Token ---->|          |   |               |
  |        |                            |          |   |               |
  |        |<-(F)- Invalid Token Error -|          |   |               |
  |        |                            +----------+   |               |
  |        |                                           |               |
  |        |--(G)----------- Refresh Token ----------->|               |
  |        |                                           |               |
  |        |<-(H)----------- Access Token -------------|               |
  +--------+           & Optional Refresh Token        +---------------+

               Figure 2: Refreshing an Expired Access Token
               
``` 

---
微信公众号开发
===
1. 注册成为微信的客户端
2. 直接根据授权信息发送请求 
3. 验证可信服务器接收回调函数



         
               

 


























