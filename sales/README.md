# 매출관리 앱 구성 정리

## 파일 구조

```
sales/
├── index.html          # 대시보드
├── report.html         # 월간 운영 보고서
├── register.html       # 매출 등록 (매장 직원용)
├── bank.html           # 통장 금액 입력 (관리자용)
├── stores.html         # 매장 등록/관리
├── help.html           # 매장 직원용 입력 도움말
├── assets/
│   ├── semodubu-hero.png # 세모두부 대표 사진
│   └── semodubu-hero.svg # 대체 대표 비주얼
├── sales-common.css    # 공통 스타일 (화이트/블랙, 모바일 최적화)
├── sales-app.js        # Supabase 연결 + 공통 유틸
├── SUPABASE_TABLES.md  # 전체 테이블 생성 SQL
├── SUPABASE_ADD_MENU_DRINK_QUERIES.md # 메뉴/주류 추가 쿼리
├── SUPABASE_IMPORT_APRIL_2026_FULL.md # 엑셀 2026년 4월 전체 데이터 적재 SQL
├── SUPABASE_IMPORT_REPORT_APRIL_2026.md # 보고서 시트 월간 손익/노무비 적재 SQL
├── UI_UX_REDESIGN.md   # UI/UX 개편 계획과 우선순위
└── README.md           # 이 파일
```

## 기술 스택

- **호스팅**: GitHub Pages (logboni-resume 프로젝트 하위)
- **DB**: Supabase (기존 연동된 인스턴스)
- **프론트**: 순수 HTML/CSS/JS (프레임워크 없음)
- **백엔드**: 없음 (Supabase JS Client로 직접 CRUD)

## 페이지별 기능

### 1. 대시보드 (index.html)
- 매장/월 선택
- 월 총매출, 일평균, 총건수, 평균단가
- 점심 vs 저녁 매출 비율 바
- 판매분류별 비율 (식사/코스/포장/단품)
- 통장 대조 현황 (일치/불일치/미확인)
- 비용 요약 (총비용, 변동비, 고정비, 영업이익)
- 일별 매출 추이 바 차트
- 최근 매출 리스트

### 2. 운영 보고서 (report.html)
- 보고서 시트 기반 월간 손익 대시보드
- 세후 영업이익, 순이익, Prime Cost, BEP 매출
- 비용 구조: 재료비/노무비/수도광열비/임대료/기타 경비
- 직원별 노무비 상세
- 월간 비용 상세와 보고서 메모

### 3. 매출 등록 (register.html)
- 매장 선택 + 날짜 선택
- 매출 입력: 총매출, 점심/저녁 매출·건수
- 판매분류: 식사/코스/포장/단품
- 메뉴별 매출: 한우사골, 얼큰해물, 명란맑은, 마파두부, 짬뽕순두부, 두부구이, 모두부, 순두부, 콩비지스프레드, 수육추가, 솥밥추가, 두유크림제철과일, 따듯한모두부반모, 한우차돌박이100G, 버크셔K목살100G, 코스, 반찬
- 주류·음료 상세: 지평막걸리, 복순도가, 소주, 맥주, 시드르, 디노쇼, 레쎄생트앙투안, 파조세뇨랑스, 무칸테이, 아마구지, 카오리란만, 미야칸바이, 쿨키지, 음료수
- 메뉴/주류·음료 항목은 매장관리에서 추가 가능
- 재료비 입력 (거래처 선택 + 금액 + 변동비/고정비)
- 경비 입력 (재료비와 분리)
- 같은 날짜 재등록 시 upsert (덮어쓰기)

### 4. 통장 금액 입력 (bank.html)
- 매장/월 선택
- 해당 월의 일별 매출 목록 테이블
- 각 행에서 통장 금액 인라인 입력
- 입력 즉시 자동 대조 (보고매출 vs 통장금액)
- 불일치 시 상태 라벨 + 차액 표시
- 상단 요약: 총 보고매출 / 총 통장합계 / 불일치 건수 / 미입력 건수

### 5. 매장 관리 (stores.html)
- 매장 목록 조회
- 매장 추가 (이름 입력)
- 매장 삭제 (관련 매출 데이터 cascade 삭제)
- 매장별 메뉴 항목 추가/비활성화
- 매장별 주류·음료 항목 추가/비활성화

### 6. 도움말 (help.html)
- 하루 마감 입력 순서 안내
- 비용 구분 기준 안내
- 기존 정산 시트의 입력방법 내용을 모바일용으로 정리

## DB 테이블 (4개)

| 테이블 | 용도 |
|--------|------|
| `stores` | 매장 정보 (id, name) |
| `daily_sales` | 일별 매출 + 비용 요약 (store_id, sale_date, 매출/비용 컬럼들, bank_amount, is_matched) |
| `sales_items` | 매장별 판매 항목 마스터 (메뉴/주류·음료) |
| `menu_sales` | 메뉴별 매출 상세 (daily_sale_id, menu_name, amount) |
| `drink_sales` | 주류·음료별 매출 상세 (daily_sale_id, drink_name, amount) |
| `supplier_costs` | 거래처별 비용 상세 (daily_sale_id, supplier_name, amount, cost_type) |
| `monthly_reports` | 보고서 시트의 월간 손익/노무비/BEP 요약 |
| `monthly_labor_costs` | 보고서 시트의 직원별 노무비 상세 |
| `monthly_report_expenses` | 4대보험, 수도광열비, 영업외비용 등 월간 비용 상세 |

## 셋업 순서

1. Supabase에 필요한 테이블을 생성
2. 매장관리(stores.html)에서 "세모두부" 등록
3. 매출등록(register.html)에서 데이터 입력
4. `git push` → GitHub Pages에서 접근
   - URL: `https://swkim9550.github.io/logboni-resume/sales/`

## 디자인

- 화이트 앤 블랙 기반의 운영툴 UI
- 세모두부 브랜드 히어로 + 네이버지도 연결
- 선택 매장은 로컬 저장되며 기본값은 세모두부
- 일별 흐름, 원가율, 상위 메뉴/주류 시각화
- 카드 반경 8px 이하, 회색 보더, 절제된 상태 배지
- 모바일 최적화 (max-width: 560px)
- 하단 네비게이션 바 (대시보드/매출등록/통장입력/매장관리)
- 금액 입력 시 자동 콤마 포맷
