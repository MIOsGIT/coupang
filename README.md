<!-- 대문 -->
<h1 align="center">🌸 COUPANG API 🌸</h1>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-FF69B4?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-ffb6c1?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-ff69b4?style=for-the-badge&logo=postgresql&logoColor=white" />
</p>

<p align="center">
  🛍️ <b>쿠팡 스타일 쇼핑몰 API</b>를 구현한 프로젝트입니다.<br>
  분홍빛 코드 속에서 귀여움과 깔끔함을 함께 담았어요! 💖
</p>

---

## 📂 프로젝트 구조
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

## ✨ 기능
- 회원가입 / 로그인 (JWT 인증)
- 상품 CRUD (등록, 조회, 수정, 삭제)
- 상품 구매 API
- 보안 강화 (Passport, Guard, Strategy 적용)

## 🛠 사용 기술
| 분류           | 기술            |
|----------------|-----------------|
| 백엔드 프레임워크 | NestJS          |
| 언어           | TypeScript      |
| DB             | PostgreSQL      |
| 인증           | JWT, Passport   |
| ORM            | TypeORM         |

---

<h3 align="center">💌 Made by MIO 💌</h3>
