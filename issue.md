# 멤버쉽 프로젝트 1주차 Login Front-End 구현

## [요구사항](https://docs.google.com/presentation/d/1xvs24VWVJc2KhmHUoj1Rm88zvtzItzQuD-6vBuzkvA0/edit#slide=id.g5cf3d2e797_0_28)


### 해야할 사항 
1. HTML
- 기본 틀 만들기
    - 아이디 창
    - 비밀번호
    - 비밀번호 재확인
    - 이름만들기
    - 생년월일
    - 성별
    - 이메일
    - 휴대전화
    - 관심사
    - 약관

2. CSS / Javascript
-  회원가입 모든 요소가 가운데에 위치하도록 한다. 
-  모든 입력창에 focus가 되면 입력창 테두리에 색이 기존과 다른 색으로 변경된다.
-  아이디는 5~20자의 영 소문자, 숫자, 특수기호만 사용가능하게한다.
-  입력된 아이디 상태에 따라 색깔의 다른 메세지가 출력
    - 이미 사용중인 아이디입니다(Error)
-  비밀번호
    - 8~16 이하로 입력 
    - 영문 대문자를 최소 1자이상 포함
    - 숫자를 최소 1자 이상 포함
    - 특수문자를 최소 1자 이상 포함
    - 부합하지 않을 때 메세지 출력
- 생년월일 
    - 15~99세만 입력 가능하게 하기
    - 월에 따라 숫자 범위 달라지게 하기
-  성별
    - 성별 (남/녀)
-  이메일
    - XXX@xxx.xxx형태여야한다.
    - 부합하지 않을 경우 메세지 출력하기 (이메일 주소를 다시 확인해 주세요)
-  휴대전화
    - 숫자만 가능하게 하기
    - 10~11자리만 가능하게 하기
    - 부합하지 않을 때 메세지 출력하기(형식에 맞지 않는 번호입니다.)
-  관심사
    - 관심사는 3개 이상 입력한다
    - 관심사를 입력하고 쉼표를 입력하면 ui가 생성된다.
    - X버튼을 누르면 태그가 삭제된다.
    - Backspace키를 입력하면 커서 앞 태그 형태의 ui가 일반 텍스트 형태로 바뀌면서 수정이 가능해야한다.
    - 아무글자 없이 입력된 쉼표는 삭제된다.
    - 3개 미만일 때 메세지가 출력된다. (3개 이상의 관심사를 입력하세요)
- 약관 체크박스
    - 약관에 동의합니다를 누르면 새로운 약괸창이 뜨게한다.
    - 사용자가 체크할 수 없다.
    - 약관창에서 동의를 누르면 자동으로 체크된다.
    
- 약관창
    - 제목은 좌측, 가운데에 위치한다.
    - 스크롤에 있는 박스가 있고, 박스 안에 약관 내용이 있다.
    - 스크롤을 한번이라도 내려갔을때만 동의 버튼이 활성화된다.
- 초기화
    - 초기화를 눌렀을 경우 `모든 내용을 새로 작성하시겠습니까?`라는 확인창이 뜬다.
    - 취소를 클릭하면 창이 닫힌다.
    - 확인을 클릭하면 모든 입력 항목의 내용이 지워진다.
- 가입하기
    - 입력된 것이 하나라도 비워져있다면 비워진 항목을 입력해달라는 내용의 새로운 팝업레이어가 뜬다.

### 완료된 사항



### 공부 한 것
- 기획서
- 이미지 img
- 대체 이미지-> 태그에 넣는 속성 - screen reader
- footer
- 네비게이션 = <nav>
- HTML 언어이지만 프로그래밍 X
- querySelector
- DOM API (Document Object Model)
- 디버깅을 잘하면 개발 속도가 빠름
```css
#jisu > p:nth-child(2) { color :red }
jisu인 id에서 p 두번째를 red로
```
- CSS - Box 모델
    - flexBox를 사용해도 됩니다. 
- addEventListener (Event Type, EventHandler)
- [이벤트 타입](https://developer.mozilla.org/ko/docs/Web/Events)

### 참고 할만한 사이트
- [w3school](https://www.w3schools.com/)
- [CSS-Trick](https://css-tricks.com/)
- [html 코드를 검사하는 사이트](https://css-tricks.com/)

https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML


