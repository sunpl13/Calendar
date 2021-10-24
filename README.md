# 📆Calendar App

## **💬소개**

&nbsp;

> **React와 SCSS를 이용한 캘린더 App**

![달력](https://user-images.githubusercontent.com/68778883/138595394-d75a1dfa-76e1-461d-9c5f-f735efe68ee5.PNG)

&nbsp;
&nbsp;
&nbsp;
<br/>
<br/>

# 📅실행예제

## 실행영상

![캘린더 실행 영상](https://user-images.githubusercontent.com/68778883/138595928-f7a121c7-d045-45bf-a702-4fd6b6f620a1.gif)
<br/>
<br/>

## 오늘 날짜로 돌아오기

![오늘 날짜로 돌아오기 버튼](https://user-images.githubusercontent.com/68778883/138595958-4ec99cb2-67d0-4471-a999-50aab50f3d75.gif)
<br/>
<br/>

## 날짜 찾기

![부가기능-날짜 찾기](https://user-images.githubusercontent.com/68778883/138595998-45a45c91-8a12-459d-8fa0-d7f6d67ad3ae.gif)
&nbsp;
&nbsp;
&nbsp;
<br/>
<br/>

# 📦패키지

&nbsp;

```
moment
```

```
node-sass
```

&nbsp;
<br/>
<br/>

# 📁폴더구조

&nbsp;

```javascript
├─CALENDAR
│  │  README.md
│  │  package.json
│  ├─public
│  │  │ index.html
│  │  │ //이하 중략
│  │  └ manifest.json
│  └─src
│     ├─Calendar
│     │  ├─Build.js
│     │  ├─Calendar.js
│     │  ├─CalendarBody.js
│     │  └ Header.js
│     ├─Scss
│     │  ├─App.scss
│     │  └calendar.scss
│     ├─App.js
│     └ index.js
```

&nbsp;
<br/>
<br/>

# 📝설명

## **Build.js**

moment 라이브러리를 받아서 한 달에 해당하는 날짜들을 생성해서 일주일 단위로 배열로 저장하여 총 6주에 해당하는 배열을 리턴하는 함수 **(달력의 몸체)**

```javascript
export default function Build(value) {
  const startDay = value.clone().startOf("month").startOf("week"); //매월 1일 주의 시작일
  const endDay = value.clone().endOf("month").endOf("week"); //한 달 마지막주의 마지말 날

  const day = startDay.clone().subtract(1, "day");
  const calendar = [];
  const nextWeek = [];

  //시작일부터 끝일까지 배열에 담기
  while (day.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone())
    );
  }

  //6주로 맞추기
  if (calendar.length < 6) {
    for (let i = 0; i < 7; i++) {
      nextWeek[i] = endDay.clone().add(i + 1, "days");
    }

    calendar.push(nextWeek);
  }
  return calendar;
}
```

## **Calendar.js**

헤더와 몸체를 포함한 달력 전체를 나타내는 컴포넌트로 여기서 moment 라이브러리를 state로 저장하여 각 컴포넌트에 props로 뿌려준다.

```javascript
function Calendar() {
  const [state, setstate] = useState(moment());

  return (
    <div className="Calendar">
      <div className="cal_header">
        <Header value={state} setvalue={setstate} moment={moment} />
      </div>
      <div className="cal_body">
        <CalendarBody value={state} setvalue={setstate} moment={moment} />
      </div>
    </div>
  );
}
```

## **Header.js**

달력의 기능들이 대부분 실행되는 컴포넌트.

달 간 이동, 오늘로 돌아오는 기능, 날짜 찾기 기능 등이 여기서 실행된다.

props로 넘겨받은 모먼트 라이브러리를 제어한다
<br/>
<br/>
![헤더](https://user-images.githubusercontent.com/68778883/138596077-cf2c0079-28f8-4772-a9df-dd9c7a7e8316.PNG)

## **CalendarBody.js**

달력의 몸체 컴포넌트로서 Build.js 에서 리턴된 배열을 가지고 몸체를 생성한다.

map함수를 통해 배열을 하루 단위로 바꾸기

![몸체](https://user-images.githubusercontent.com/68778883/138596261-792f2755-844f-4e3a-8cae-911e497d8abd.PNG)

<br/>
<br/>

# 😊잘했다고 생각한 점

## 1. Scss의 자주 쓰이는 효과들을 지정한 것!

자주 쓰일만한 효과들을 미리 만들어놓고 import 해서 사용

```css
//색상 타입 지정
$SkyBlue: #2e8fe4;
$LightSky: #63aff1;
$SkyBlue-: #5fc3e4;
$Sky: #b3edfa;
$Sky-: #9de5f5;
$WhiteGray: #e3e3e3;
$Gray: #c2c2c2;
$DarkGray: #999999;

//달력 날짜모양 모양 지정
@mixin border($border-weight, $border-color) {
  width: 50px;
  height: 50px;
  padding: 1px;
  border: $border-weight solid $border-color;
  border-radius: 5px;
  cursor: pointer;
}

//버튼 모양 지정
@mixin button($color) {
  border: 1px solid $color;
  background-color: white;
  color: $color;
  padding: 5px;
}

//hover시 움직임
@mixin hover {
  transform: translate(1px, 1px);
}
```

## 2. 클래스명 지정 함수 만들기

css에 중복되는 클래스들을 함수를 통해 `return`시켜서 효과를 입힌 것.

```javascript
//클래스명 지정을 위한 함수 (토,일 색칠하기)
const name = (idx) => {
  if (idx === 0) {
    return " sun";
  } else if (idx === 6) {
    return " sat";
  } else {
    return "";
  }
};

//오늘 날짜를 찾는다면 날짜에 배경색을 색칠하는 함수
const findToday = (day) => {
  if (day === moment().format("YYYYMMDD")) {
    return " today";
  } else {
    return "";
  }
};
```

<br/>

> ### 이렇게 className 구할 때 사용
>
> <br/>

```javascript
<div
  key={idx}
  className="selected"
  onClick={() => {
    setvalue(item);
  }}
>
  <div className={"day" + name(idx) + findToday(item.format("YYYYMMDD"))}>
    <span>{item.format("D").toString()}</span>
  </div>
</div>
```
