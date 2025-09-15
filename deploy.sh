#!/bin/bash

# 배포 스크립트
# 사용법: ./deploy.sh [github|ec2]

DEPLOYMENT_TYPE=${1:-github}

echo "🚀 배포 환경: $DEPLOYMENT_TYPE"

# config.js 업데이트
if [ "$DEPLOYMENT_TYPE" = "github" ]; then
    echo "📝 GitHub Pages 배포 설정 적용..."
    sed -i.bak "s/DEPLOYMENT: '[^']*'/DEPLOYMENT: 'github'/" config.js
    
    echo "📤 GitHub에 푸시..."
    git add .
    git commit -m "Deploy to GitHub Pages - $(date)"
    git push origin main
    
    echo "✅ GitHub Pages 배포 완료!"
    echo "🌐 접속 URL: https://swkim9550.github.io/logboni-resume/main.html"
    
elif [ "$DEPLOYMENT_TYPE" = "ec2" ]; then
    echo "📝 EC2 배포 설정 적용..."
    sed -i.bak "s/DEPLOYMENT: '[^']*'/DEPLOYMENT: 'ec2'/" config.js
    
    echo "📦 빌드 파일 생성..."
    # 필요시 빌드 과정 추가
    
    echo "📤 EC2 서버에 배포..."
    # rsync 또는 scp를 사용한 파일 전송
    # rsync -avz --delete ./ user@your-ec2-server:/var/www/html/
    
    echo "🔄 서버 재시작..."
    # ssh user@your-ec2-server "sudo systemctl restart nginx"
    
    echo "✅ EC2 배포 완료!"
    echo "🌐 접속 URL: https://your-domain.com"
    
else
    echo "❌ 잘못된 배포 타입입니다. 'github' 또는 'ec2'를 사용하세요."
    exit 1
fi

# 백업 파일 정리
rm -f config.js.bak

echo "🎉 배포가 완료되었습니다!"