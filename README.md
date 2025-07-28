- 먼저 빠르게 만들고, 리팩토링은 몰아서 하기
- 처음에는 디테일보다는 작업 속도에 집중

# 링크

## 앱 페이지

https://memory-helper-prototype-fe.vercel.app/wordset

## 스웨거

https://port-0-memory-helper-prototype-be-m6ekc447ebe44eb6.sel4.cloudtype.app/swagger-ui/index.html

## 백엔드 레포

https://github.com/KimJungMook/memory-helper-prototype-be

# [250727] To-do List

## 코어 기능

- 시험 생성 -> 시험 보기 -> 결과 보기 플로우 전체가 굴러가도록 API 부착하고 테스트 - 백엔드랑 소통하면서 고칠 거 고치면서 진행하기
  - /api/exam/check 잘 굴러가는지 확인, 시험 보고 제출하는 부분에다가 API 붙이기
    -> multipleChoices -> singleChoice 변경사항을 먼저 적용해야 함(15분?)
  - 백엔드에 요청해서 API가 시험 이름을 반환하도록 하기(id뿐만 아니라..)

- (백엔드 작업 완료 시) /exam/{id} API 붙이기
- 로그인 플로우 점검(라우팅 구조와 Blocking)

## 소단위 기능 작업

### 로딩 UI 적용

- /wordset/{id} 단어 생성 버튼 클릭 시 로딩 UI
- 각종 경고/알림 등을 유저에게 전달하기 위한 Toast UI 제작과 적용

### 페이지 최상단 Header or SearchBar(/wordset, /exam)

 -> 보류 상태(백엔드에서의 API 작업이 선행되어야 함)

- 각 페이지에다가 최신 헤더 적용
- Header position을 sticky로


### 이외

- 로그인 페이지 마크업 새로 작성(10분?)

## 리팩토링

- 123123

## 프로젝트 구성 및 설정

- storybook 설정
- React 테스트 학습과 적용
- msw로 서버 꺼져도 앱 써볼 수 있게 설정
