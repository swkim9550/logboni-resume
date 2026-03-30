# 🏃 나의 기록 — D-Day & Running Log

개인 습관 트래커 + 러닝 기록 페이지

## 📌 트래킹 항목

### D-Day 카운터 (JS 하드코딩)
| 항목 | 시작일 | 비고 |
|------|--------|------|
| 🏃 러닝 | 3월 초 (확인 필요) | 3주차~ |
| 🚭 금연 — 전담 전환 | 2026-03-20 | 연초 끊기 |
| 💧 물 자주 마시기 | 2026-03-24 | 하루 2L 목표 |

### 러닝 기록 (Supabase 저장)
- 페이지 내 입력 폼으로 직접 기록
- 월별 캘린더 히트맵 (3월 / 4월 / 5월)

## 🛠 기술 구조

### 데이터 저장: Supabase
- 프로젝트: `vuzwljbxwwlgegwzlxuc.supabase.co` (기존 analytics와 동일)
- 테이블: `running_log`

```sql
CREATE TABLE running_log (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  date date NOT NULL,
  km numeric(4,2) NOT NULL,
  minutes integer NOT NULL,
  memo text,
  created_at timestamptz DEFAULT now()
);

-- RLS 활성화
ALTER TABLE running_log ENABLE ROW LEVEL SECURITY;

-- anon key로 읽기 허용
CREATE POLICY "공개 읽기" ON running_log FOR SELECT USING (true);

-- anon key로 쓰기 허용 (본인만 쓸 거니까 간단하게)
CREATE POLICY "쓰기 허용" ON running_log FOR INSERT WITH CHECK (true);
```

### 페이지 구성 (`index.html`)

```
┌─────────────────────────┐
│  🏃 나의 기록            │
├─────────────────────────┤
│  D-Day 카운터 x3        │
│  러닝 D+21 / 금연 D+10  │
│  물마시기 D+6            │
├─────────────────────────┤
│  📅 러닝 캘린더          │
│  [3월] [4월] [5월]      │
│  ┌─┬─┬─┬─┬─┬─┬─┐      │
│  │ │ │🟩│ │🟩│🟩│ │      │
│  │ │🟩│ │ │🟩│ │ │      │
│  └─┴─┴─┴─┴─┴─┴─┘      │
│  이번 달: 32km / 8회    │
├─────────────────────────┤
│  ➕ 기록 추가            │
│  날짜 [____]            │
│  거리 [__] km           │
│  시간 [__] 분           │
│  메모 [________]        │
│  [저장하기]              │
├─────────────────────────┤
│  📋 최근 기록 리스트     │
│  3/28 — 5.2km, 32분     │
│  3/26 — 3.1km, 20분     │
│  ...                    │
└─────────────────────────┘
```

### 데이터 흐름
1. 페이지 로드 → Supabase에서 `running_log` 전체 fetch
2. D-Day → JS로 시작일 기준 자동 계산 (하드코딩)
3. 캘린더 → fetch된 데이터로 월별 히트맵 렌더링
4. 기록 추가 → 폼 입력 → Supabase INSERT → 화면 갱신

## 📁 파일 구조

```
mylog/
├── README.md      ← 이 파일
└── index.html     ← 메인 페이지 (TODO)
```

## 🎯 TODO

1. [ ] Supabase에 `running_log` 테이블 생성
2. [ ] `index.html` 제작
3. [ ] 기존 러닝 기록 입력 (나이키런 보면서)


```html
1. 러닝 시작 - 3월 16일
2. 연초 금연 - 3월 23일
3. 물 많이 먹기  - 3월 26일 
```

```html
3/16-5.04/6.44/33:55
3/18-5.05/7.02/35:32
3/20-5.25/7.02/36:57
3/22-5.08/5.59/30:26
3/23-5.59/6.45/37:43
3/24-5.82/6.52/40:00
3/26-6.64/6.41/44:21
3/28-6.56/6:48/44:38
3/29-5.38/6:39/35:50
3/29-계양산 정상

```