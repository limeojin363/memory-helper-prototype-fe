우선은 빠르게 만들고, 리팩토링은 몰아서 하기
처음에는 디테일보다는 작업 속도에 집중

# 링크

## 앱 페이지

https://memory-helper-prototype-fe.vercel.app/wordset

## 스웨거

https://port-0-memory-helper-prototype-be-m6ekc447ebe44eb6.sel4.cloudtype.app/swagger-ui/index.html

## 백엔드 레포

https://github.com/KimJungMook/memory-helper-prototype-be


# [250612] To-do List

- API 스펙 정하기 
- 체크 Icon 불러오기
- !!! /result/{id} 디자인 구상 및 마크업 작성
  - /exam/{id}/solve랑 맞춰서 짜기
- ! /wordset/{id} 단어 편집 시, 생성 대신 삭제(Default)와 수정(변경사항 있을 때만) 버튼 노출시키기
- ! /wordset/{id} 편집 가능 여부 하위 컴포넌트들에게 주입하기
- /wordset/{id} 제목편집 V/X 표시(GitHub PR제목 편집이랑 유사하게)와 리스너 부착
- /wordset/{id} 시험 보기 뒤에 개수 붙이기 [ {n} ]
- /wordset/{id} 단어 생성 버튼 클릭 시 로딩 UI
- /wordset/{id} 생성하는동안 로딩 UI

- Header position을 sticky로
- /wordset, /exam 헤더 적용

- 각종 경고/알림 등을 유저에게 전달하기 위한 Toast UI 제작과 적용
- 로그인 페이지 마크업 새로 작성

- import path alias 지정
- storybook 설정
- 테스트 코드 작성
- msw로 서버 꺼져도 앱 써볼 수 있게 설정