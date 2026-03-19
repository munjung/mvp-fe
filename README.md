# 🚀 React Build

npm run dev

# 🧹 ESLint + Prettier 설정

1. VS Code Extensions 설치

Prettier - Code formatter

ESLint

2. settings.json 설정

Ctrl + Shift + P → Preferences: Open User Settings (JSON)

{
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode"
}

# 📁 프로젝트 구조

src
├─ main.ts # 앱 진입점 (Provider, Router 연결)
├─ api # 서버 통신 레이어 (axios 인스턴스, API 함수)
├─ assets # 이미지, 아이콘 등 정적 리소스
├─ components # 재사용 UI 컴포넌트
│ ├─ common # 공통 컴포넌트 (Button, Select 등)
│ └─ tabs # 탭 관련 컴포넌트
├─ hooks # 커스텀 훅 (상태 및 로직 분리)
├─ layouts # 페이지 레이아웃 (RootLayout 등)
├─ lib # 기능 호출 API (alert, confirm 등 인터페이스)
├─ pages # 라우트 단위 페이지
├─ providers # 전역 상태 및 UI 실행 (Dialog, Context 등)
├─ router # 라우팅 설정
├─ styles # 전역 스타일
└─ utils # 순수 유틸 함수 모음

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
