# 시작하기 전에

- [AirBnB 스타일 가이드](https://github.com/airbnb/javascript)를 참고하였음


# 선언자

- `var`은 사용하지 마세요.
- `const`를 사용하세요.
- 재할당이 필요한 경우 `let`을 사용하세요.

```js
// never
var  foo = 1;

// good 
const bar = 2;
```
# 객체

## 객체 생성

- 리터럴을 사용하세요.

```js
// bad
const obj = new Object();

// good 
const obj = { };
```

## 메서드

- 단축 구문문을 사용하세요.

  ```js
  // bad
  const obj =  {
    value: 1

    addValue: function(value) {
      return obj.value + value; 
    }
  };

  // good
  const obj =  {
    value: 1

    addValue(value) {
      return obj.value + value; 
    }
  };
  ```

## 속성

- 단축 구문을 사용하세요.

  ```js
  const key = 'key';

  // bad 
  const obj =  {
    key: key,
  };

  //good
  const obj = {
    key,
  };
  ```

- 단축 구문은 시작에 모아주세요.

  ```js
  const anakinSkywalker = 'Anakin Skywalker';
  const lukeSkywalker = 'Luke Skywalker';

  // bad
  const obj = {
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
    lukeSkywalker,
    episodeThree: 3,
    mayTheFourth: 4,
    anakinSkywalker,
  };

  // good
  const obj = {
    lukeSkywalker,
    anakinSkywalker,
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
    episodeThree: 3,
    mayTheFourth: 4,
  };
  ```

## 식별자

- 유효하지 않은 식별자만 따옴표`'`를 사용하세요.
  - 유효하지 않은 식별자?
    - js에서 속성 식별자는 알파벳, 언더바`_`, 달러사인`$`으로만 시작해야 합니다.
    - 시작은 제외하면 숫자가 들어갈 수 있습니다.
  
  ```js
  const obj = {
    validKey: 1,
    "invalid-key": 2,  // 중간에 대쉬 들어감 ⇒ 유효하지 않은 식별자
    "123name": 3       // 숫자로 시작함 ⇒ 유효하지 않은 식별자
  };
  ```

- 얕은 복사: 전개 구문을 사용하세요.
  - 전개구문?
    - `...`을 찍어 객체의 내용을 풀어낼 수 있습니다.
    - 전개구문과 리터럴을 합치면 새로운 객체를 얉게 복사 할 수 있습니다.
  
  ```js
    const original = { a: 1, b: 2 };
    const copy = { ...original, c: 3 }; // copy ⇒ { a: 1, b: 2, c: 3 }

    const { a, ...noA } = copy; // noA ⇒ { b: 2, c: 3 }
  ```

# 배열

## 생성

- 리터럴을 사용하세요.

  ```js
  // bad
  const arr = new Array();

  // good
  const arr = [];
  ```

## 값 할당

- 생성할 때를 제외하고는 `Array.prototype.push`를 사용하세요.

  ```js
  // good
  const arr = [];
  arr.push('abcdefg');
  ```

## 복사

- 전개 구문 `...`을 사용하세요.

  ``` js 
  // good
  const arr = [ 1, 2, 3];
  const copy = [...arr];
  ```

## 순회 가능 객체로 변환

- `Array.from()`보다는 전개구문`...`을 사용하세요.

  ```js
  const foo  = document.querySelectorAll('.foo');
  
  // good 
  const nodes = Array.from(foo);

  // best
  const nodes = [...foo];
  ```
## 유사 배열 변환

- 유사 배열은 전개구문으로 변환하면 예상처럼 동작하지 않을 수 있습니다.
- `Array.from`을 사용하세요.

  ```js
  const arrLike = {...};

  // good
  const arr = Array.from(arrLike);
  ```

## 'map'

- 전개구문`...`대신 `Array.from()`을 사용하세요.
- 중간 배열을 만들지 않아 성능적으로 유리합니다.

  ```js
  // bad
  const baz = [...foo].map(bar);

  //good 
  const baz = Array.from(foo,bar);
  ```

## 배열 메소드 콜백

- 리턴을 **꼭** 넣으세요.

  ```js
  // good
  [1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
  });

  // good
  [1, 2, 3].map(x => x + 1);
  ```

## 여러 줄

- 배열을 여러 줄로 쓸 때는 요소를 한 줄 씩 쓰세요.

  ```js
  // bad
  const arr = [
    [0, 1], [2, 3], [4, 5],
  ];

  const objectInArray = [{
    id: 1,
  }, {
    id: 2,
  }];

  const numberInArray = [
    1, 2,
  ];

  // good
  const arr = [[0, 1], [2, 3], [4, 5]];

  const objectInArray = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];

  const numberInArray = [
    1,
    2,
  ];
  ```

# 구조 분해

## 객체에서

- 여러 속성을 접근 할 때, 구조 분해 할당을 이용하세요
  - 임시참조를 만들지 않고 불필요한 접근을 막습니다.

  ```js
  // bad
  function getFullName(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;

    return `${firstName} ${lastName}`;
  }

  // good
  function getFullName(user) {
    const { firstName, lastName } = user;
    return `${firstName} ${lastName}`;
  }

  // best
  function getFullName({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
  }
  ```

## 배열에서

- 사용하세요.

  ```js
  const arr = [1, 2, 3, 4];

  // bad
  const first = arr[0];
  const second = arr[1];

  // good
  const [first, second] = arr;
  ```

## 반환

- 여러 값을 반환할 때는 배열보다는 객체를 반환하세요

  ```js
  // bad
  function processInput(input) {
    // ...
    return [left, right, top, bottom];
  }

  const [left, __, top] = processInput(input); // 순서를 고려해야 한다

  // good
  function processInput(input) {
    // ...
    return { left, right, top, bottom };
  }

  // 필요한 데이터만 선택하면 됩니다
  const { left, top } = processInput(input); // 필요한 속성만 빼낼 수 있다.
  ```

# 문자열

## `'`

- `"`가 아니라 `'`를 쓰세요.

## 긴 문자열

- 한 줄에 쓰세요.
- 개발 과정에서 보는 경우는 드물고, 개행되어 있으면 작업하기 어렵습니다.

## 동적 문자열

- 템플릿 리터럴을 사용하세요. (`)
- `+`으로 문자열을 연결하지 마세요.
  - 읽기 어렵고
  - 자동 형변환이 일어나면 찾기 힘듭니다.

  ```js   
  // bad
  function sayHi(name) {
    return 'How are you, ' + name + '?';
  }

  // good
  function sayHi(name) {
    return `How are you, ${name}?`;
  }
  ```

# 함수

메서드 내부에서는 무조건 화살표, this 바인딩

앵간하면 화살표
```js
const foo = () =>  {

};

```

디버깅에 이름이 필요하거나 자기 참조가 필요한 경우
```js
const foo = function bar() {}
```

# 화살표

# 클래스 & 생성자

# 모듈
