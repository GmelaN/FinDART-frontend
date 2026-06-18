# finDART Frontend

finDART의 Next.js 기반 웹 프런트엔드입니다. 현재 Today 페이지를 제공합니다.

## 실행

```bash
cp .env.example .env.local
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 환경 변수

| 변수 | 설명 |
| --- | --- |
| `FINDART_API_BASE_URL` | `/api/v1`까지 포함한 finDART API 주소 |

API 호출은 Next.js 서버에서 수행되므로 API 주소가 브라우저에 노출되지 않으며 CORS 설정에 의존하지 않습니다.
FinDART front-end codebase
