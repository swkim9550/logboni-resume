# 김성우 개발자 이력서

12년 경력의 소프트웨어 엔지니어 이력서 웹사이트

## 🚀 배포 방법

### GitHub Pages 배포
```bash
npm run deploy:github
```
또는
```bash
./deploy.sh github
```

### EC2 배포
```bash
npm run deploy:ec2
```
또는
```bash
./deploy.sh ec2
```

## 🛠 로컬 개발

### 정적 파일로 실행 (GitHub Pages 환경)
브라우저에서 `main.html` 파일을 직접 열기

### Node.js 서버로 실행 (EC2 환경 테스트)
```bash
npm install
npm start
```

개발 모드 (nodemon 사용):
```bash
npm run dev
```

## 📁 프로젝트 구조

```
logboni-resume/
├── main.html              # 메인 이력서 페이지
├── styles.css             # 스타일시트
├── config.js              # 배포 환경 설정
├── server.js              # EC2용 Express 서버
├── deploy.sh              # 배포 스크립트
├── package.json           # Node.js 설정
├── companies/             # 회사별 상세 페이지
│   ├── spotv.html
│   ├── rotonda.html
│   ├── score.html
│   ├── inlife.html
│   ├── sbtm.html
│   └── esom.html
└── projects/              # 사이드 프로젝트 페이지
    └── side-projects.html
```

## 🔧 환경 설정

`config.js` 파일에서 배포 환경을 변경할 수 있습니다:

- `DEPLOYMENT: 'github'` - GitHub Pages 배포
- `DEPLOYMENT: 'ec2'` - EC2 서버 배포

## 📝 수정 방법

1. **개인 정보 수정**: `main.html`의 header 섹션
2. **회사 경력 추가/수정**: `companies/` 폴더의 각 HTML 파일
3. **사이드 프로젝트 추가**: `projects/side-projects.html`
4. **기술 스택 수정**: `main.html`의 skills 섹션

## 🌐 접속 URL

- **GitHub Pages**: https://swkim9550.github.io/logboni-resume/main.html
- **EC2**: 설정한 도메인 주소