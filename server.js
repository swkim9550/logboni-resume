// EC2 배포용 간단한 Express 서버
const express = require('express');
const path = require('path');
const app = express();

// 환경 변수에서 포트 설정 (기본값: 3000)
const PORT = process.env.PORT || 3000;

// 정적 파일 서빙
app.use(express.static(__dirname));

// 메인 페이지 라우트
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

// 404 처리
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'main.html'));
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`🌐 접속 URL: http://localhost:${PORT}`);
});

module.exports = app;