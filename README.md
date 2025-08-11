<!-- 대문 -->
<h1 align="center">🌸 Nest.js Study Project - COUPANG API 🌸</h1>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-FF69B4?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-ffb6c1?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/MariaDB-ff69b4?style=for-the-badge&logo=mariadb&logoColor=white" />
</p>

<p align="center">
  🛍️ <b>쿠팡 스타일 쇼핑몰 API</b>를 구현한 프로젝트입니다.<br>
</p>

---

<h2 align="center">📂 프로젝트 구조</h2>

<pre align="center">
src
├── dto                  # 요청/응답 DTO
├── product              # 상품 관련 API
│   ├── entity           # 상품 엔티티
│   ├── product.controller.ts
│   ├── product.module.ts
│   └── product.service.ts
├── user                 # 사용자 관련 API
│   ├── entity           # 사용자 엔티티
│   ├── security         # 인증/인가
│   │   ├── passport.jwt.strategy.ts
│   │   ├── payload.interface.ts
│   │   └── user.guard.ts
│   ├── user.controller.ts
│   ├── user.module.ts
│   └── user.service.ts
├── app.controller.ts
├── app.module.ts        # 루트 모듈
└── app.service.ts
</pre>

<h2 align="center">✨ 기능</h2>

<p align="center">
회원가입 / 로그인 (JWT 인증)<br>
상품 CRUD (등록, 조회, 수정, 삭제)<br>
상품 구매 API<br>
보안 강화 (Passport, Guard, Strategy 적용)
</p>

<h2 align="center">🛠 사용 기술</h2>

<p align="center">

| 분류           | 기술            |
|----------------|-----------------|
| 백엔드 프레임워크 | NestJS          |
| 언어           | TypeScript      |
| DB             | MariaDB         |
| 인증           | JWT, Passport   |
| ORM            | TypeORM         |

</p>

---

<h3 align="center">💌 Made by MIO 💌</h3>
