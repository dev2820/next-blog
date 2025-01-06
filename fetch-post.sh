#!/bin/bash

# 실행할 커맨드
COMMAND="pnpm fetch:posts"

# 실행할 커맨드 수행
$COMMAND

# 커맨드가 성공했는지 확인
if [ $? -eq 0 ]; then
  # 변경된 파일을 git staging에 추가
  git add .

  # 한줄 커밋 생성
  git commit -m "chore: update posts"

  echo "Command executed and changes committed successfully."
else
  echo "Command failed. No commit made."
fi
