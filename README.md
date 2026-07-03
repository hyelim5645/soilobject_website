# SOIL STUDIO — 오브제 판매 홈페이지

오브제(조명, 화병, 플랜트 스탠드, 원목 벤치) 판매를 위한 Next.js 사이트입니다.

## 시작하기

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 접속.

## 실제 사진 넣는 법

모든 이미지 슬롯은 사진이 없을 때 플레이스홀더 박스(권장 크기 표시)를 렌더링하는
`PlaceholderImage` 컴포넌트(`src/components/ui/PlaceholderImage.tsx`)를 사용합니다.
`public/` 폴더에 실제 사진을 넣고, 각 데이터 파일(`src/lib/data/mock/*.json`)의
`images`/`image`/`coverImage` 필드의 `"src": null`을 실제 경로(예: `"/products/ambient-table-lamp-1.jpg"`)로
바꾸면 자동으로 실제 이미지가 표시됩니다.

섹션별 권장 비율/크기(`src/lib/utils/constants.ts`의 `IMAGE_SLOTS`):

| 섹션 | 비율 | 권장 크기 |
|---|---|---|
| 히어로 | 16:10 | 1920×1200 이상 |
| Selected Projects 그리드 | 4:5 | 1000×1250 |
| 상품 카드 / 오브제 컬렉션 | 4:5 | 900×1125 (전 상품 동일 비율 유지) |
| 상품 상세 메인/썸네일 | 4:5 / 1:1 | 1200×1500 / 400×400 |
| Space Styling 카테고리 타일 | 3:4 | 1200×1600 |
| Journal 카드 | 4:3 | 800×600 |
| About/Contact 스플릿 | 4:5 | 1000×1250 |

## Supabase로 교체하는 법

현재 상품/주문 데이터는 `src/lib/data/` 아래의 저장소 함수(`products.ts`, `orders.ts`)가
로컬 JSON/인메모리 배열을 반환하는 방식으로 동작합니다. 모든 함수가 이미 `async`로
선언되어 있고 호출하는 쪽에서 전부 `await`하고 있으므로, Supabase 프로젝트가 생기면
**이 두 파일 내부 구현만 교체**하면 됩니다. 다른 파일은 수정할 필요가 없습니다.

예시 (`src/lib/data/products.ts`):

```ts
// 지금:
export async function getProducts(): Promise<Product[]> {
  return mockProducts;
}

// 나중에:
export async function getProducts(): Promise<Product[]> {
  const { data } = await supabase.from("products").select("*");
  return data as Product[];
}
```

`.env.example`에 `SUPABASE_URL` / `SUPABASE_ANON_KEY` 자리를 미리 문서화해두었습니다.

## 알려진 제한 사항 (MVP)

- **주문 저장소가 인메모리입니다.** `src/lib/data/orders.ts`의 주문 목록은 서버
  프로세스가 살아있는 동안만 유지됩니다. 개발 서버를 재시작하거나 배포 환경이
  여러 인스턴스로 확장되면 기존 주문 데이터는 사라집니다. Supabase 연동 전까지의
  임시 상태이며, 실제 서비스 전에는 반드시 실제 DB로 교체해야 합니다.
- **결제 연동이 없습니다.** 체크아웃은 주문 접수(배송 정보 + 상품 목록 저장)까지만
  처리하며, 실제 결제 게이트웨이(PG)는 추후 연동 예정입니다. `Order.paymentStatus`는
  항상 `"pending"`입니다.
- **다국어는 시각적 토글만 있습니다.** 상단 내비게이션의 KR/EN 전환 버튼은 아직
  실제 번역/라우팅을 수행하지 않습니다.

## 프로젝트 구조

```
src/
  app/            # 라우트 (App Router)
  components/
    ui/           # 버튼, 컨테이너, 플레이스홀더 이미지 등 원시 컴포넌트
    layout/       # TopNav, Footer
    sections/     # 홈페이지 섹션 (Hero, ObjectCollection 등)
    commerce/     # 상품 카드, 장바구니, 체크아웃 폼 등
  lib/
    data/         # 데이터 접근 레이어 (Supabase 교체 지점)
    cart/         # 장바구니 Context + localStorage
    validation/   # zod 스키마
    utils/        # 포맷팅, 상수
```
