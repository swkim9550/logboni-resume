// 배포 환경 설정
const CONFIG = {
    // 배포 환경: 'github' 또는 'ec2'
    DEPLOYMENT: 'github',
    
    // GitHub Pages 설정
    GITHUB: {
        BASE_URL: 'https://swkim9550.github.io/logboni-resume',
        REPO_NAME: 'logboni-resume'
    },
    
    // EC2 배포 설정
    EC2: {
        BASE_URL: 'https://your-domain.com',  // 실제 도메인으로 변경
        PORT: 3000
    },
    
    // 현재 환경에 따른 BASE_URL 반환
    getBaseUrl: function() {
        return this.DEPLOYMENT === 'github' ? this.GITHUB.BASE_URL : this.EC2.BASE_URL;
    },
    
    // 상대 경로 생성 (GitHub Pages의 경우 repo name 포함)
    getPath: function(path) {
        if (this.DEPLOYMENT === 'github') {
            return path.startsWith('/') ? path : '/' + path;
        }
        return path.startsWith('/') ? path : '/' + path;
    }
};

// 전역으로 사용 가능하게 설정
window.CONFIG = CONFIG;