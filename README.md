# english-quiz
내가 공부하고 싶은 단어를 저장하고, 퀴즈로 풀어볼 수 있는 서비스입니다.
## ERD
<img width="804" alt="image" src="https://github.com/npngnpng/english-quiz/assets/103028187/3459067d-883e-48e3-8f61-024a57ee410a">

## Table
### 

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

# Modules
### Domain Module 
서비스 기능이 존재하는 사용자, 인증, 단어, 퀴즈 각 도메인 별로 모듈을 구성하였습니다.
### Global Module
서비스 기능 외적으로 요구되는 DB 관련 기능을 모듈로 분리하였습니다.

## ORM Abstraction
추후 ORM의 변경등에 유연하게 대체하기 위해 인터페이스를 이용해 비즈니스 로직에서 영속성 영역에 접근하는 부분을 추상화 시켰습니다.

### Transaction Interceptor
prisma에서 제공되는 transaction 함수를 Nestjs의 interceptor 기능을 이용해 비즈니스 로직에서 분리하였습니다.

## Features
### User

**회원가입** (`POST` `/users`)\
회원정보를 입력후 회원가입할 수 있습니다.

### Auth

**로그인** (`POST` `/auth`)\
아이디와 비밀번호를 입력후 로그인할 수 있습니다.\
인증은 JWT 토큰 방식으로 access token과 refresh token을 발급해 진행됩니다.\
인증을 필요로 하는 요청의 해더에 Authorization(Bearer)으로 넣어 요청해 인증할 수 있습니다.

**토큰 재발급** (`PUT` `/auth`)\
로그인시 발급되는 refresh token을 통해 토큰을 재발급할 수 있습니다.\
요청 해더에 X-Refresh-Token으로 넣어 요청해야 됩니다.

### Word

**단어 추가** (`POST` `/words`)\
영단어와 한글 뜻을 입력해 단어를 추가할 수 있습니다.

**단어 수정** (`PUT` `/words/{word-id}`)\
단어의 영단어와 한글 뜻을 수정할 수 있습니다.

**단어 삭제** (`DELETE` `/words/{word-id}`)\
단어를 삭제할 수 있습니다.

**단어 조회** (`DELETE` `/words`)\
단어리스트를 조회합니다.\
만약 한번 퀴즈로 푼 단어라면 푼 날과 정답 여부를 반환합니다.

### Quiz

**퀴즈 조회** (`GET` `/quiz`)\
QueryString으로 word-id를 넣어 그 단어에 대한 퀴즈를 조회할 수 있습니다.\
만약 word-id를 넣지 않는다면 단어장의 단어중 무작위로 퀴즈가 조회됩니다.

**퀴즈 풀기** (`POST` `/quiz/{word-id}`)\
퀴즈 조회에서 조회된 4개의 한글 뜻중 한가지를 선택해 퀴즈를 풀 수 있습니다.

### Admin
AdminJS 라이브러리를 이용해 어드민 웹을 구현하였습니다.
(사진)
왼쪽 네비게이션에서 User를 선택해 사용자 정보를 확인해 볼 수 있습니다.
(사진)
사용자를 선택해 사용자가 작성한 단어와 퀴즈들을 확인해 볼 수 있습니다.
