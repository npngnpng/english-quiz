# english-quiz

내가 공부하고 싶은 단어를 저장하고, 퀴즈로 풀어볼 수 있는 서비스입니다.

# 목차

- [Database](#database)
    - [ERD](#erd)
    - [Table](#table)
        - [user](#user)
        - [word](#word)
        - [quiz](#quiz)
        - [cash](#cash)
        - [cash_history](#cash_history)
- [Libraries](#libraries)
- [Architecture](#architecture)
    - [Module](#module)
    - [ORM Abstraction](#orm-abstraction)
        - [Transaction Interceptor](#transaction-interceptor)
- [Features](#features)
    - [User](#user-1)
    - [Auth](#auth)
    - [Word](#word-1)
    - [Quiz](#quiz-1)
    - [Cash](#cash-1)
    - [Admin](#admin)
- [개선할 점](#개선할-점)

# 실행 방법

### Nodejs 설치

Nodejs 기반 프로젝트인 Nestjs 프로젝트이기 때문에 Nodejs를 다운로드해야 합니다.\
아래 링크를 통해 Nodejs를 다운로드 받습니다.\
https://nodejs.org/en/

### 프로젝트 클론

프로젝트를 로컬로 클론합니다.

```bash
git clone https://github.com/npngnpng/english-quiz.git
```

### .env 설정

루트 디렉토리 아래에 .env파일을 생성해 .env 설정을 해야합니다.\
설정이 필요한 환경변수는 다음과 같습니다.

- `DATABASE_URL`
    - 데이터베이스 연동시 필요합니다.
    - `mysql://{username}:{password}@{host}:{port}/{database}`
- `JWT_SECRET`
    - JWT Token의 signature를 만들기 위해 존재하는 JWT secret입니다.
- `DEFAULT_ADMIN_ACCOUNT_ID`
    - admin 페이지에 접근할 계정의 아이디입니다.
    - 여기서 설정한 아이디로 admin 페이지에 접근할 수 있습니다.
- `DEFAULT_ADMIN_PASSWORD`
    - admin 페이지에 접근할 계정의 비밀번호입니다.
- `ADMINJS_LICENCE`
    - AdminJS의 Relations 기능을 사용하기 위해 요구되는 라이선스입니다.

### 의존성 설치 및 실행

실행 전, 이 프로젝트에 존재하는 의존성을 설치하기 위해 다음 명령어를 실행합니다.

```bash
npm install
```

그 후 설치가 완료되면 다음 명령어를 통해 Nestjs server를 실행할 수 있습니다.

```bash
npm run start
```

# Database

## ERD

<img width="804" alt="image" src="https://github.com/npngnpng/english-quiz/assets/103028187/3459067d-883e-48e3-8f61-024a57ee410a">

## Table

### user

사용자의 정보를 저장하는 테이블입니다.

- id
    - `int` `primary key` `auto_increment`
    - 기본키를 위해 만든 칼럼입니다. auto_increment를 이용해 자동으로 1씩 증가합니다.
- account_id
    - `varchar(30)` `not null`
    - 사용자가 로그인시 사용하는 아이디입니다. 로그인시 user 정보를 식별하는 칼럼이기 때문에 unique 속성이 있습니다.
- password
    - `char(60)` `not null`
    - 비밀번호입니다. bcrypt를 이용해 인코딩후 저장하기 때문에 고정 문자열 60자로 타입을 지정하였습니다.
- name
    - `varchar(30)` `not null`
    - 사용자의 이름입니다.

### word

사용자의 단어가 저장되는 테이블입니다.

- id
    - `int` `primary key` `auto_increment`
- english
    - `varchar(50)` `not null`
    - 영어단어를 작성하는 칼럼입니다. 영단어중 제일 긴 단어의 길이를 참고해 가변 문자열 최대 길이를 설정하였습니다.
- korean
    - `varchar(20)` `not null`
    - 영어단어의 한글 뜻입니다. 한글 단어중 가장 긴 단어의 길이를 참고해 가변 문자열 최대 길이를 설정하였습니다.
- user_id
    - `int` `not null` `foreign key references user(id)`
    - 작성한 유저를 알기 위해 만든 user 테이블에 대한 외래키입니다.
    - word 관련 작업은 user_id를 통한 사용자 검증 후 이루어집니다.

### quiz

사용자가 단어를 저장하고 그 단어들을 기반으로 퀴즈를 풀 수 있습니다. 그 퀴즈의 정보를 저장하는 테이블입니다.

- id
    - `int` `primary key` `auto_increment`
- choice
    - `varchar(20)` `not null`
    - 퀴즈 조회 후 4개의 한글 문항중 한가지를 선택하고 그 선택이 이 칼럼에 저장됩니다.
- is_correct
    - `tinyint(1)` `not null`
    - choice의 정답 여부가 저장됩니다.
- created_at
    - `datetime` `default CURRENT_TIMESTAMP` `not null`
    - 퀴즈의 생성시간, 즉 퀴즈를 푼 시점을 저장합니다. MYSQL의 CURRENT_TIMESTAMP를 이용하였습니다.
- word_id
    - `int` `not null` `foreign key references word(id)`
    - 어떤 영단어에 대한 퀴즈인지를 알기 위해 만든 word 테이블에 대한 외래키입니다.
- user_id
    - `int` `not null` `foreign key references user(id)`
    - 퀴즈를 푼 유저를 알기 위해 만든 user 테이블에 대한 외래키입니다.
    - 퀴즈에 대한 작업은 user_id 외래키를 통해 사용자 검증 후 진행합니다.

### cash

사용자의 캐시 정보를 담는 테이블입니다.

- id
    - `int` `primary key` `auto_increment`
- cash
    - `int` `default 0` `not null`
    - 사용자가 가지고 있는 캐시입니다.
- unaccounted_cash
    - `int` `default 0` `not null`
    - 사용자가 적립하지 않은 캐시입니다. 캐시를 적립하는 api를 통해 cash로 옮길 수 있습니다.
- today_cash
    - `int` `default 0` `not null`
    - 오늘 획득한 캐시를 저장합니다. 오늘 획득한 캐시를 기반으로 퀴즈를 풀고 받을 수 있는 캐시가 결정됩니다.
- user_id
    - `int` `not null` `foreign key references user(id)` `unique`
    - 어떤 사용자의 캐시 정보 인지를 식별하기 위해 존재하는 user 테이블에 대한 외래키입니다.

### cash_history

사용자의 캐시 획득 내역을 저장하는 테이블입니다.

- id
    - `int` `primary key` `auto_increment`
- reward
    - `int` `not null`
    - 획득한 캐시가 얼마인지 저장하는 칼럼입니다.
    - today_cash에 따라 1 ~ 10 사이로 reward가 결정됩니다.
- user_id
    - `int` `not null` `foreign key references user(id)`
    - 어떤 사용자의 캐시 내역인지를 알기 위해 존재하는 user 테이블에 대한 외래키입니다.
- quiz_id
    - `int` `not null` `foreign key references quiz(id)` `unique`
    - 어떤 퀴즈에서 적립되었는지를 알기 위해 존재하는 quiz 테이블에 대한 외래키입니다.
    - 퀴즈 하나당 캐시는 한번만 적립될 수 있기 때문에 unique 속성이 존재합니다.
- created_at
    - `datetime` `default CURRENT_TIMESTAMP` `not null`
    - 적립된 시간을 저장합니다.

# Libraries

### **NestJS**

필수 조건

### **Typescript**

NestJS 기본 설정 언어입니다.

### **Prisma**

필수 조건

### **bcrypt**

비밀번호 암호화를 위해 사용하였습니다.

### **class-validator**

request validation을 위해 사용하였습니다.

### **cache-manager**

refresh token을 저장하는 용도로 사용하였습니다.

### **AdminJS**

어드민 패널 구현을 위해 사용하였습니다.

### nestjs/schedule

하루가 지날 때 마다 today_cash를 초기화 해주기 위해 사용하였습니다.

# Architecture

각 기능별로 모듈을 구성하여 결합도를 낮추고 응집도를 높혔습니다.\
또한 비즈니스 로직에서 최대한 prisma에 대한 의존도를 낮추기 위해\
prisma client를 바로 사용하지 않고, Repository 계층을 추가하여 사용하였습니다.

## Module

### Domain

서비스 기능이 존재하는 사용자, 인증, 단어, 퀴즈 각 도메인 별로 모듈을 구성하였습니다.

### Global

서비스 기능 외적으로 요구되는 DB 관련 기능을 모듈로 분리하였습니다.

## ORM Abstraction

추후 ORM의 변경등에 유연하게 대체하기 위해 인터페이스를 이용해 비즈니스 로직에서 영속성 영역에 접근하는 부분을 추상화 시켰습니다.

### Transaction Interceptor

prisma에서 제공되는 transaction 함수를 Nestjs의 interceptor 기능을 이용해 비즈니스 로직에서 분리하였습니다.\
[코드](./src/global/interceptor/prisma-transaction.interceptor.ts)

# Features

## User

### **회원가입** (`POST` `/users`)

회원정보를 입력후 회원가입할 수 있습니다.

\
`requst example`

```text
Body
{
  "name": "길근우",
  "accountId": "gggugg06",
  "password": "1234"
}
```

\
`response example`

`status : 201`

## Auth

### **로그인** (`POST` `/auth`)

아이디와 비밀번호를 입력후 로그인할 수 있습니다.\
인증은 JWT 토큰 방식으로 access token과 refresh token을 발급해 진행됩니다.\
인증을 필요로 하는 요청의 해더에 Authorization(Bearer)으로 넣어 요청해 인증할 수 있습니다.\
로그인, 회원가입, 토큰 재발급을 제외한 모든 요청은 토큰을 필요로 합니다.

\
`requst example`

```text
Body
{
  "accountId": "gggugg06",
  "password": "1234"
}
```

\
`response example`

`status : 200`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZ2d1Z2cwNiIsInR5cCI6ImFjY2VzcyIsImlhdCI6MTcxNTY5MzY4MiwiZXhwIjoxNzE1Njk3MjgyfQ.wMzIu0dq1zAP7Td0VKOEAsFpZ8SNby3UAYmVGmO6Wb4",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZ2d1Z2cwNiIsInR5cCI6InJlZnJlc2giLCJpYXQiOjE3MTU2OTM2ODIsImV4cCI6MTcxNTY5NzI4Mn0.wuMc7r9gCwzHthk1D7jIkWnu8cohPPbMTeIuBkzoNso"
}
```

### **토큰 재발급** (`PUT` `/auth`)

로그인시 발급되는 refresh token을 통해 토큰을 재발급할 수 있습니다.\
요청 해더에 X-Refresh-Token으로 넣어 요청해야 됩니다.

\
`requst example`

```text
Header
X-Refresh-Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZ2d1Z2cwNiIsInR5cCI6InJlZnJlc2giLCJpYXQiOjE3MTU2OTM2ODIsImV4cCI6MTcxNTY5NzI4Mn0.wuMc7r9gCwzHthk1D7jIkWnu8cohPPbMTeIuBkzoNso
```

\
`response example`

`status : 200`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZ2d1Z2cwNiIsInR5cCI6ImFjY2VzcyIsImlhdCI6MTcxNTY5MzY4MiwiZXhwIjoxNzE1Njk3MjgyfQ.wMzIu0dq1zAP7Td0VKOEAsFpZ8SNby3UAYmVGmO6Wb4",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZ2d1Z2cwNiIsInR5cCI6InJlZnJlc2giLCJpYXQiOjE3MTU2OTM2ODIsImV4cCI6MTcxNTY5NzI4Mn0.wuMc7r9gCwzHthk1D7jIkWnu8cohPPbMTeIuBkzoNso"
}
```

## Word

### **단어 추가** (`POST` `/words`)

영단어와 한글 뜻을 입력해 단어를 추가할 수 있습니다.

\
`requst example`

```text
Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZ2d1Z2cwNiIsInR5cCI6ImFjY2VzcyIsImlhdCI6MTcxNTY5MjY1MiwiZXhwIjoxNzE1Njk2MjUyfQ.3NHxzb6aZgSq8oB9HCFEDxwN_8XsQCFmIcymuOXbxac

Body
{
  "english": "podo",
  "korean": "포도"
}
```

\
`response example`

`status : 201`

### **단어 수정** (`PUT` `/words/{word-id}`)

단어의 영단어와 한글 뜻을 수정할 수 있습니다.

\
`requst example`

```text
Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZ2d1Z2cwNiIsInR5cCI6ImFjY2VzcyIsImlhdCI6MTcxNTY5MjY1MiwiZXhwIjoxNzE1Njk2MjUyfQ.3NHxzb6aZgSq8oB9HCFEDxwN_8XsQCFmIcymuOXbxac

Body
{
  "english": "apple",
  "korean": "사과"
}
```

\
`response example`

`status : 204`

### **단어 삭제** (`DELETE` `/words/{word-id}`)

단어를 삭제할 수 있습니다.

\
`requst example`

```text
Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZ2d1Z2cwNiIsInR5cCI6ImFjY2VzcyIsImlhdCI6MTcxNTY5MjY1MiwiZXhwIjoxNzE1Njk2MjUyfQ.3NHxzb6aZgSq8oB9HCFEDxwN_8XsQCFmIcymuOXbxac

Path Value
1
```

`response example`

`status : 204`

### **단어 조회** (`DELETE` `/words`)

단어리스트를 조회합니다.\
만약 한번 퀴즈로 푼 단어라면 푼 날과 정답 여부를 반환합니다.

\
`requst example`

```text
Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZ2d1Z2cwNiIsInR5cCI6ImFjY2VzcyIsImlhdCI6MTcxNTY5MjY1MiwiZXhwIjoxNzE1Njk2MjUyfQ.3NHxzb6aZgSq8oB9HCFEDxwN_8XsQCFmIcymuOXbxac
```

`response example`

`status : 200`

```json
{
  "words": [
    {
      "id": 9,
      "english": "apple",
      "korean": "사과",
      "quiz": null
    },
    {
      "id": 10,
      "english": "banana",
      "korean": "바나나",
      "quiz": null
    }
  ]
}
```

## Quiz

### **퀴즈 조회** (`GET` `/quiz`)

QueryString으로 word-id를 넣어 그 단어에 대한 퀴즈를 조회할 수 있습니다.\
만약 word-id를 넣지 않는다면 단어장의 단어중 무작위로 퀴즈가 조회됩니다.

`requst example`

```text
Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZ2d1Z2cwNiIsInR5cCI6ImFjY2VzcyIsImlhdCI6MTcxNTY5MjY1MiwiZXhwIjoxNzE1Njk2MjUyfQ.3NHxzb6aZgSq8oB9HCFEDxwN_8XsQCFmIcymuOXbxac

QueryString
word_id=3
```

\
`response example`

`status : 200`

```json
{
  "wordId": 3,
  "english": "company",
  "koreans": [
    "회사",
    "생성하다",
    "해변",
    "세계"
  ]
}
```

### **퀴즈 풀기** (`POST` `/quiz/{word-id}`)

퀴즈 조회에서 조회된 4개의 한글 뜻중 한가지를 선택해 퀴즈를 풀 수 있습니다.\
만약 한번 풀었다가 틀렸던 단어를 다시 풀고 정답을 맞았을 때, 혹은 처음 푸는 문제의 정답을 맞췄을 경우 캐시를 획득할 수 있습니다.\
이미 풀고 캐시를 획득한 퀴즈일 경우 캐시를 다시 지급하지 않습니다.

\
`requst example`

```text
Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZ2d1Z2cwNiIsInR5cCI6ImFjY2VzcyIsImlhdCI6MTcxNTY5MjY1MiwiZXhwIjoxNzE1Njk2MjUyfQ.3NHxzb6aZgSq8oB9HCFEDxwN_8XsQCFmIcymuOXbxac

Path Value
7

Body
{
  "choice": "머리"
}
```

\
`response example`

`status : 201`

```json
{
  "isCorrect": true,
  "reward": 6
}
```

## Cash

### 캐시 조회 (`GET` `/cash`)

사용자가 적립한 캐시와 아직 적립하지 않은 캐시, 오늘 획득한 캐시를 조회할 수 있습니다.

\
`requst example`

```text
Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZ2d1Z2cwNiIsInR5cCI6ImFjY2VzcyIsImlhdCI6MTcxNTY5MjY1MiwiZXhwIjoxNzE1Njk2MjUyfQ.3NHxzb6aZgSq8oB9HCFEDxwN_8XsQCFmIcymuOXbxac
```

\
`response example`

`status : 200`

```json
{
  "cash": 8,
  "unaccountedCash": 10,
  "todayCash": 10
}
```

### 캐시 적립 (`PATCH` `/cash`)

아직 적립하지 않은 캐시를 적립할 수 있습니다.\
적립할 수 있는 캐시는 적립하지 않은 캐시를 넘을 수 없습니다.

\
`requst example`

```text
Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZ2d1Z2cwNiIsInR5cCI6ImFjY2VzcyIsImlhdCI6MTcxNTY5MjY1MiwiZXhwIjoxNzE1Njk2MjUyfQ.3NHxzb6aZgSq8oB9HCFEDxwN_8XsQCFmIcymuOXbxac

Body
{
  "earnCash": 1
}
```

\
`response example`

`status : 204`

```json
{
  "isCorrect": true,
  "reward": 6
}
```

### 캐시 획득 내역 조회 (`GET` `/cash/histories`)

획득한 캐시 내역을 조회할 수 있습니다.\
획득한 시간과 어떤 퀴즈인지, 얼만큼 획득했는지가 조회됩니다.
\
`requst example`

```text
Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnZ2d1Z2cwNiIsInR5cCI6ImFjY2VzcyIsImlhdCI6MTcxNTY5MjY1MiwiZXhwIjoxNzE1Njk2MjUyfQ.3NHxzb6aZgSq8oB9HCFEDxwN_8XsQCFmIcymuOXbxac
```

\
`response example`

`status : 200`

```json
{
  "cashHistories": [
    {
      "reward": 10,
      "createdAt": "2024-05-14T14:00:24.000Z",
      "quiz": "company"
    }
  ]
}
```

## Admin

AdminJS 라이브러리를 이용해 어드민 웹을 구현하였습니다.\
(사진)\
왼쪽 네비게이션에서 User를 선택해 사용자 정보를 확인해 볼 수 있습니다.\
(사진)\
사용자를 선택해 사용자가 작성한 단어와 퀴즈들을 확인해 볼 수 있습니다.


# 개선할 점
## AdminJS와의 강한 결합도
어드민 웹을 빠르게 구현하기 위해 AdminJS를 사용했지만 AdminJS를 사용하기 위해 다양한 부분들이 변경되어야 했습니다.

첫번째로 데이터베이스 테이블을 기반으로 어드민 페이지를 생성해주다보니 데이터베이스에 대해 요구하는 부분이 많았습니다.\
우선 id라는 이름을 가진 인조키가 기본키로 반드시 존재해야했습니다. \
또한 DB 값에 의해 어떤 값이 나오는 행위가 불가능했기때문에 부득이하게 quiz 테이블이 isCorrect라는 필드를 가지게 되었습니다. user_id도 마찬가지 입니다.

두번째로 사용자 정보에서 사용자의 quiz와 word를 조회하기 위해 `adminjs/relations`라는 라이브러리를 사용하게 되었는데, 이 기능이 유료로 제공되는 기능이다 보니 완성을 위해 돈을 지불하게 되었습니다.

이런 요구사항들로 인해 AdminJS와의 결합도가 증가하게 되었다고 생각합니다.

하지만 그 외의 다른 어드민 패널 라이브러리들은 지원이 종료된 것들이었기 때문에 AdminJS를 사용할 수 밖에 없었습니다.
