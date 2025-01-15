# 시작하기 전에

- [AirBnB 스타일 가이드](https://github.com/airbnb/css)를 참고하였음

# CSS

## 서식

- tab 대신 space를 쓰세요.
  - 용량은 조금 늘어나지만 일관성을 보장합니다.

- 카멜 케이스보다는 대쉬`-`를 사용하세요.
  - BEM을 사용할때는 파스칼 케이스와 언더바`_`를 사용하세요.

  - *BAD*
    ```css
    .cardBtn {
      ... 
    }
    ```

  - *GOOD*
    ```css
    .card-btn {
      ...
    }
    ```

- 선택자로 id를 사용하지 마세요.

- 규칙 선언에서 선택자를 여러개 쓸 경우, 각 선택자를 한줄에 하나씩 쓰세요.
  - *BAD*
    ```css
    .foo, .bar, .baz {
      ...
    }
    ```
  - *GOOD*
    ```css
    .foo,
    .bar,
    .baz {
      ...
    }
    ```

- 중괄호`{`를 열기전에 **하나의 공백**을 넣으세요.
  - *BAD*
    ```css
    .foo{
      ...
    }
    .bar    {
      ...
    }
    ```
  - *GOOD*
    ```css
    .foo {
      ...
    }
    ```

- 속성 뒤 쌍점`:` 뒤에 **하나의 공백**을 넣으세요.
  - *GOOD*
    ```css
    .foo {
      color: black;
    }
    ```
- 중괄호`}`를 닫을 때는 새 줄에서 닫으세요. *(한 줄이더라도 )*
  - *BAD*
    ```css
    .foo { ... }
    ```
  - *GOOD*
    ```css
    .foo {
      ...
    }
    ```

- 규칙 선언 사이에 빈 줄을 넣으세요.
  - *BAD*
    ```css
    .foo {
      ...
    }
    .bar {
      ...
    }
    ```
  - *GOOD*
    ```css
    .foo {
      ...
    }

    .bar {
      ...
    }
    ```

## BEM


### 이점

- CSS와 HTML 사이에 엄겸한 관계를 만들 수 있습니다.
- 중첩(nesting)을 줄일 수 있습니다.
- 확장성에서 이점이 있습니다.

### 무엇인가

- Block - Element - Modifier
  - Block 단위로 디자인을 나누고
  - 하위 요소는 Element로서 두개의 언더바`__`로 깊이를 구분합니다.
  - 수정자는 두개의 대쉬`--`로 구분합니다.
- Block은 PascalCase를 사용하길 권장합니다.
  - 대쉬`-`나 언더바`_`로 구분하면 혼동 될 수 있습니다.

### 예시

```HTML
<article class="ListingCard ListingCard--featured">
  
  <h1 class="ListingCard__title">Adorable 2BR in the sunny Mission</h1>

  <div class="ListingCard__content">
    <p>Vestibulum id ligula porta felis euismod semper.</p>
  </div>

</article>
```

```css
.ListingCard { }
.ListingCard--featured { }
.ListingCard__title { }
.ListingCard__content { }
```

## ID 선택자

쓰지마세요.

## 자바스크립트 후크 (협의 필요)

- css와 자바스크립트가 동일한 클래스를 바인딩하는걸 피하세요.

- 두가지를 합치면 개발자가 리펙토링할때 일이 두배가 됩니다.

- 최악은 복잡한 참조를 망칠까 개발자가 변경을 두려워 합니다.

- 바인딩할 자바스크립트 전용 클래스를 만드는게 좋습니다.
  -  `.js-`를 접두사로 붙이세요.

## `border:`

- `none` 대신 `0`을 써서 테두리를 지우세요.
  - `none`은 브라우저마다 렌더링 방식이 약간 다릅니다.
- *BAD*
  ```css
  .foo {
    border: none;
  }
  ```

- *GOOD*
  ```css
  .bar {
    border: 0; 
  }
  ```
# Sass

## 문법

- `.scss`문법을 쓰세요. 괄호를 생략하는 `.sass` 문법은 쓰지 마세요.
- `@include`와 일반 css는 논리에 맞춰 순서를 배치하세요.
  - 위치에 따라 선언 위치가 달라집니다.

## 속성 선언 순서

1. 속성 선언

일반적인 속성 선언이 최상단으로 오게 하세요.
```scss
.btn-green {
  background: green;
  font-weight: bold;
}
```

2. `@include` 선언

그 다음에  `@include`를 모아서 선언하세요.

```scss
.btn-green {
  background: green;
  font-weight: bold;
  @include transition(background 0.5s ease);
  // ...
}
```

3. 네스팅 선택자

네스팅 선택자(*필요하다면*)는 무조건 최하단에 위치 시키세요.
네스팅 선택자 뒤에는 어떠한 선언도 있어서는 안됩니다.
네스팅 안에서도 이러한 선택자 규칙은 유지됩니다.

```scss
.btn-green {
  background: green;
  font-weight: bold;
  @include transition(background 0.5s ease);
  // ...
  .icon {
    margin-right: 10px;
  }
}
```

## 변수

- 대쉬 케이스 (예: `$my-variable`)를 camelCase와 snake_case 보다 선호합니다.
- 같은 파일 내에서 사용하도록 의도록 의도된 언더바를 접두사로 붙이는 것은 허용됩니다. (예: `$my_variable`)

## `@mixin`

- 반복을 줄이고, 명확성을 더하고, 복잡성을 추상화 하는데  사용하세요
  - 남발하지 말고 목적성을 고려하고 설계해야 합니다.
  - 남발되면 오히려 참조를 왔다갔다 해야해서 읽는데 어렵습니다.

## `@extend`

- 피하세요

## 네스팅

### 선택자를 3단계 이상 중첩하지 마세요.

- 하지 마세요. 중첩된 선택자는 읽기 극히 어렵습니다.
- html과의 결합성이 너무 높아집니다.

```scss 
.foo {
  .bar {
    .baz {
      // STOP 
    }
  }
}
```


