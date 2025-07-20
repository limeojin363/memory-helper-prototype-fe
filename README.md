우선은 빠르게 만들고, 리팩토링은 몰아서 하기
처음에는 디테일보다는 작업 속도에 집중

# 링크

## 앱 페이지

https://memory-helper-prototype-fe.vercel.app/wordset

## 스웨거

https://port-0-memory-helper-prototype-be-m6ekc447ebe44eb6.sel4.cloudtype.app/swagger-ui/index.html

## 백엔드 레포

https://github.com/KimJungMook/memory-helper-prototype-be


# [250715] To-do List

## 코어 기능
- (현재 작업 중) 시험 생성 -> 시험 보기 -> 결과 보기 등 플로우 전체가 굴러가도록 API 부착하기 - 일부 API에 이상이 있으니 백엔드와 소통해서 고치면서 진행하기
    - 백에다요청 -> API가 시험 이름을 반환하도록 하기(id뿐만 아니라..)
    - 시험 보고 제출하는 부분 API 붙이기
- /exam/{id} API 붙이기
- 각종 경고/알림 등을 유저에게 전달하기 위한 Toast UI 제작과 적용

## 소단위 디자인 변경사항
- Header position을 sticky로
- /wordset, /exam 페이지에다가 최신 헤더 적용
- /wordset/{id} 단어 생성 버튼 클릭 시 로딩 UI
- /wordset/{id} 생성하는동안 로딩 UI
- 로그인 페이지 마크업 새로 작성
- /wordset/{id} 팝업 색상변경

## 프로젝트 구성 및 설정
- import path alias 지정
- storybook 설정
- 테스트 코드 작성
- msw로 서버 꺼져도 앱 써볼 수 있게 설정