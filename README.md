우선은 빠르게 만들고, 리팩토링은 몰아서 하기
처음에는 디테일보다는 작업 속도에 집중

# 링크

## 앱 페이지

https://memory-helper-prototype-fe.vercel.app/wordset

## 스웨거

https://port-0-memory-helper-prototype-be-m6ekc447ebe44eb6.sel4.cloudtype.app/swagger-ui/index.html

## 백엔드 레포

https://github.com/KimJungMook/memory-helper-prototype-be


# [250725] To-do List

## 코어 기능
- (현재 작업 중) 시험 생성 -> 시험 보기 -> 결과 보기 등 플로우 전체가 굴러가도록 API 부착하기 - 일부 API에 이상이 있으니 백엔드와 소통해서 고치면서 진행하기
    - 백에다요청 -> API가 시험 이름을 반환하도록 하기(id뿐만 아니라..)
    - 시험 보고 제출하는 부분 API 붙이기
- (백엔드 작업 완료 시) /exam/{id} API 붙이기
- 로그인 플로우 점검

## 소단위 기능/UI 작업
- wordset으로부터 생성된 시험이 있을 때, 단어 수정 클릭 불가능하도록 수정
    -> 시발 props drilling 개좆같네 너는 내가 내일중으로 갈아엎는다(1시간?)
- /words 카드디자인 변경(5분?)
- /api/exam/check 잘 굴러가는지 확인과 적용
    -> multipleChoices -> singleChoice 변경사항을 먼저 적용해야 함(15분?)
- /wordset, /exam 페이지에다가 최신 헤더(워드셋, 시험명 변경에서의 TextField 일관되게) 적용(???)
- 제목변경 UI 손보기(10분?)
- 로그인 페이지 마크업 새로 작성(10분?)
- Header position을 sticky로 하고 각 페이지에 잘 적용되는지 확인(5분?)
- /wordset/{id} 단어 생성 버튼 클릭 시 로딩 UI
- 각종 경고/알림 등을 유저에게 전달하기 위한 Toast UI 제작과 적용
- /wordset/{id} 생성하는동안 로딩 UI
- /wordset/{id} 팝업 색상변경

## 리팩토링

## 프로젝트 구성 및 설정
- import path alias 지정
- storybook 설정
- 테스트 코드 작성
- (현재 작업 중)  msw로 서버 꺼져도 앱 써볼 수 있게 설정