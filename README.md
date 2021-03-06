# ๐Calendar App

## **๐ฌ์๊ฐ**

&nbsp;

> **React์ SCSS๋ฅผ ์ด์ฉํ ์บ๋ฆฐ๋ App**

![๋ฌ๋ ฅ](https://user-images.githubusercontent.com/68778883/138595394-d75a1dfa-76e1-461d-9c5f-f735efe68ee5.PNG)

&nbsp;
&nbsp;
&nbsp;
<br/>
<br/>

# ๐์คํ์์ 

## ์คํ์์

![์บ๋ฆฐ๋ ์คํ ์์](https://user-images.githubusercontent.com/68778883/138595928-f7a121c7-d045-45bf-a702-4fd6b6f620a1.gif)
<br/>
<br/>

## ์ค๋ ๋ ์ง๋ก ๋์์ค๊ธฐ

![์ค๋ ๋ ์ง๋ก ๋์์ค๊ธฐ ๋ฒํผ](https://user-images.githubusercontent.com/68778883/138595958-4ec99cb2-67d0-4471-a999-50aab50f3d75.gif)
<br/>
<br/>

## ๋ ์ง ์ฐพ๊ธฐ

![๋ถ๊ฐ๊ธฐ๋ฅ-๋ ์ง ์ฐพ๊ธฐ](https://user-images.githubusercontent.com/68778883/138595998-45a45c91-8a12-459d-8fa0-d7f6d67ad3ae.gif)
&nbsp;
&nbsp;
&nbsp;
<br/>
<br/>

# ๐ฆํจํค์ง

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

# ๐ํด๋๊ตฌ์กฐ

&nbsp;

```javascript
โโCALENDAR
โ  โ  README.md
โ  โ  package.json
โ  โโpublic
โ  โ  โ index.html
โ  โ  โ //์ดํ ์ค๋ต
โ  โ  โ manifest.json
โ  โโsrc
โ     โโCalendar
โ     โ  โโBuild.js
โ     โ  โโCalendar.js
โ     โ  โโCalendarBody.js
โ     โ  โ Header.js
โ     โโScss
โ     โ  โโApp.scss
โ     โ  โcalendar.scss
โ     โโApp.js
โ     โ index.js
```

&nbsp;
<br/>
<br/>

# ๐์ค๋ช

## **Build.js**

moment ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ๋ฐ์์ ํ ๋ฌ์ ํด๋นํ๋ ๋ ์ง๋ค์ ์์ฑํด์ ์ผ์ฃผ์ผ ๋จ์๋ก ๋ฐฐ์ด๋ก ์ ์ฅํ์ฌ ์ด 6์ฃผ์ ํด๋นํ๋ ๋ฐฐ์ด์ ๋ฆฌํดํ๋ ํจ์ **(๋ฌ๋ ฅ์ ๋ชธ์ฒด)**

```javascript
export default function Build(value) {
  const startDay = value.clone().startOf("month").startOf("week"); //๋งค์ 1์ผ ์ฃผ์ ์์์ผ
  const endDay = value.clone().endOf("month").endOf("week"); //ํ ๋ฌ ๋ง์ง๋ง์ฃผ์ ๋ง์ง๋ง ๋ 

  const day = startDay.clone().subtract(1, "day");
  const calendar = [];
  const nextWeek = [];

  //์์์ผ๋ถํฐ ๋์ผ๊น์ง ๋ฐฐ์ด์ ๋ด๊ธฐ
  while (day.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone())
    );
  }

  //6์ฃผ๋ก ๋ง์ถ๊ธฐ
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

ํค๋์ ๋ชธ์ฒด๋ฅผ ํฌํจํ ๋ฌ๋ ฅ ์ ์ฒด๋ฅผ ๋ํ๋ด๋ ์ปดํฌ๋ํธ๋ก ์ฌ๊ธฐ์ moment ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ state๋ก ์ ์ฅํ์ฌ ๊ฐ ์ปดํฌ๋ํธ์ props๋ก ๋ฟ๋ ค์ค๋ค.

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

๋ฌ๋ ฅ์ ๊ธฐ๋ฅ๋ค์ด ๋๋ถ๋ถ ์คํ๋๋ ์ปดํฌ๋ํธ.

๋ฌ ๊ฐ ์ด๋, ์ค๋๋ก ๋์์ค๋ ๊ธฐ๋ฅ, ๋ ์ง ์ฐพ๊ธฐ ๊ธฐ๋ฅ ๋ฑ์ด ์ฌ๊ธฐ์ ์คํ๋๋ค.

props๋ก ๋๊ฒจ๋ฐ์ ๋ชจ๋จผํธ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ ์ดํ๋ค
<br/>
<br/>
![ํค๋](https://user-images.githubusercontent.com/68778883/138596077-cf2c0079-28f8-4772-a9df-dd9c7a7e8316.PNG)

## **CalendarBody.js**

๋ฌ๋ ฅ์ ๋ชธ์ฒด ์ปดํฌ๋ํธ๋ก์ Build.js ์์ ๋ฆฌํด๋ ๋ฐฐ์ด์ ๊ฐ์ง๊ณ  ๋ชธ์ฒด๋ฅผ ์์ฑํ๋ค.

mapํจ์๋ฅผ ํตํด ๋ฐฐ์ด์ ํ๋ฃจ ๋จ์๋ก ๋ฐ๊พธ๊ธฐ

![๋ชธ์ฒด](https://user-images.githubusercontent.com/68778883/138596261-792f2755-844f-4e3a-8cae-911e497d8abd.PNG)

<br/>
<br/>

# ๐์ํ๋ค๊ณ  ์๊ฐํ ์ 

## 1. Scss์ ์์ฃผ ์ฐ์ด๋ ํจ๊ณผ๋ค์ ์ง์ ํ ๊ฒ!

์์ฃผ ์ฐ์ผ๋งํ ํจ๊ณผ๋ค์ ๋ฏธ๋ฆฌ ๋ง๋ค์ด๋๊ณ  import ํด์ ์ฌ์ฉ

```css
//์์ ํ์ ์ง์ 
$SkyBlue: #2e8fe4;
$LightSky: #63aff1;
$SkyBlue-: #5fc3e4;
$Sky: #b3edfa;
$Sky-: #9de5f5;
$WhiteGray: #e3e3e3;
$Gray: #c2c2c2;
$DarkGray: #999999;

//๋ฌ๋ ฅ ๋ ์ง๋ชจ์ ๋ชจ์ ์ง์ 
@mixin border($border-weight, $border-color) {
  width: 50px;
  height: 50px;
  padding: 1px;
  border: $border-weight solid $border-color;
  border-radius: 5px;
  cursor: pointer;
}

//๋ฒํผ ๋ชจ์ ์ง์ 
@mixin button($color) {
  border: 1px solid $color;
  background-color: white;
  color: $color;
  padding: 5px;
}

//hover์ ์์ง์
@mixin hover {
  transform: translate(1px, 1px);
}
```

## 2. ํด๋์ค๋ช ์ง์  ํจ์ ๋ง๋ค๊ธฐ

css์ ์ค๋ณต๋๋ ํด๋์ค๋ค์ ํจ์๋ฅผ ํตํด `return`์์ผ์ ํจ๊ณผ๋ฅผ ์ํ ๊ฒ.

```javascript
//ํด๋์ค๋ช ์ง์ ์ ์ํ ํจ์ (ํ ,์ผ ์์น ํ๊ธฐ)
const name = (idx) => {
  if (idx === 0) {
    return " sun";
  } else if (idx === 6) {
    return " sat";
  } else {
    return "";
  }
};

//์ค๋ ๋ ์ง๋ฅผ ์ฐพ๋๋ค๋ฉด ๋ ์ง์ ๋ฐฐ๊ฒฝ์์ ์์น ํ๋ ํจ์
const findToday = (day) => {
  if (day === moment().format("YYYYMMDD")) {
    return " today";
  } else {
    return "";
  }
};
```

<br/>

> ### ์ด๋ ๊ฒ className ๊ตฌํ  ๋ ์ฌ์ฉ
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
