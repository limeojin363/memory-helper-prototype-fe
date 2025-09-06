- 먼저 빠르게 만들고, 리팩토링은 몰아서 하기
- 처음에는 디테일보다는 작업 속도에 집중

# 링크

## 앱 페이지

https://memory-helper-prototype-fe.vercel.app/wordset

## 스웨거

https://port-0-memory-helper-prototype-be-m6ekc447ebe44eb6.sel4.cloudtype.app/swagger-ui/index.html

## 백엔드 레포

https://github.com/KimJungMook/memory-helper-prototype-be

# [250903] To-do List

## 코어 기능(전반적인 플로우 구현)

* 단어장 생성 및 편집 -> 시험 생성 -> 문제 풀기 or 시험 결과 보기

- "/wordset/{id}"의 "시험" 탭이 API에서 호출한 정보들을 리스트 형태로 표시 <- 구현은 했고 디자인 개선이 필요함
- "/exam/{id}" 페이지의 "시험 결과"에 결과 리스트 UI를 표시하고, "/result/{id}"로 navigate할 수 있도록 하기 <- 구현은 했고 디자인 개선이 필요함
- "/result/{id}" 페이지 만들기 <- 구현은 했고 디자인 개선이 필요함

## 소단위 기능 작업

- (디자인작업 선행 필요) wordset과 exam의 constraints 기획 및 백엔드에 요청, UI 작업 진행하기
- 로그인 플로우 개선(라우팅 구조와 Blocking 방식에 대해 고민)
- 검색 기능(wordset 및 exam)
- 무한 스크롤(wordset 및 exam)

### 로딩 UI 적용

- /wordset/{id} 단어 생성 버튼 클릭 시 로딩 UI
- 각종 경고/알림 등을 유저에게 전달하기 위한 Toast UI 제작과 적용

### 페이지 최상단 Header or SearchBar(/wordset, /exam)

 -> 보류 상태(백엔드에서의 API 작업이 선행되어야 함)

- 각 페이지에다가 최신 헤더 적용
- Header position을 sticky로

### 기타 작업

- 로그인 페이지 마크업 새로 작성(10분?)

## 리팩토링

- 123123

## 프로젝트 구성 및 설정

- storybook 설정
- React 테스트 학습과 적용
- msw로 서버 꺼져도 앱 써볼 수 있게 설정
