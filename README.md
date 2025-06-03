# 링크

## 스웨거

https://port-0-memory-helper-prototype-be-m6ekc447ebe44eb6.sel4.cloudtype.app/swagger-ui/index.html

## 백엔드 레포

https://github.com/KimJungMook/memory-helper-prototype-be


# [250604] 해야할 작업

## 급함

- wordset 생성페이지 제목편집 V/X 표시(GitHub PR제목 편집이랑 유사하게)
- wordset Detail가 wordset 정보(생성 일자, 각 단어) + 시험 정보로
- DetailViewModal 리팩토링 + 기존 것 보기에 적용
- DetailViewModal 편집/삭제 - 가능 / 불가능 분기처리(마크업 레벨에서 차단)
  - 제목 편집(?)
  - 셋 삭제
  - 단어 편집
  - 단어 삭제
- 시험리스트 페이지 라우팅 + 푸터 네비게이션 작업

## 덜급함

- Form에서 생성 버튼 클릭 시 로딩바 처리
- GenPage 들어갔을 때 생성하는동안 로딩
- 각종 경고/알림 등을 유저에게 전달하기 위한 Toast UI 띄우기
- auth route 좀 더 세련되게 처리
- 라우팅 구조 및 URL명 정리
- Modal에서의 Input(공통된 마크업 솎아내기)
- 페이지 변수명 통일
- 로그인 페이지 마크업 작성
