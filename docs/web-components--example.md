# web component example

## example

```js
class CustomElement extends HTMLElement {
  //* js에서 class는 대문자로 시작되어야 함

  //* 웹컴포넌트 인스턴스가 생성될 때 호출
  //* DOM 파서가 태그를 처음 만날때 호출
  constructor() {
    super()
  }
  
  //* 컴포넌트가 DOM에 추가되었을 때 호출 = 실제로 DOM 트리가 생성됨
  //* 외부 속성에 의존하는 작업, 이벤트 리스너 등록 등을 안전하게 처리가능
  //* 랜더링 함수를 여기서 실행하는 이유 
  connectedCallback() {
    this.render()
  }
  
  //* 실제로 랜더링을 담당하는 함수
  render() {
    
    // get attribute
    const attribute = this.getAttribute(`attribute`) || 'default value' 
  
    // set inner html 
    this.innerHTML = /*html*/`
    <div>hello, world.</div>
    <div>i am 'cusotm-element'</div>
    `

    // set style
    const style = document.createElement('style')
    style.innerHTML = /*css*/`
    `
    this.appendChild(style)
  }
}

//* 브라우저에 정의한 커스텀 엘리먼트를 등록
//* `custom-element'는 tag에 들어갈 이름
//* `CustomElement`는 정의한 클래스스
customElements.define('custom-element', CustomElement);

//! 주의할것
//> 커스텀 엘리먼트의 이름(tag로 사용하는 이름)은 명확한 조건이 있음
//> 1. 모두 소문자
//> 2. 최소 2개의 단어가 `-` 로 연결되어 있어야 함
//> 3. 최소 1개의 `-`(대쉬)가 포함되어 있어야 함
//> yes: `my-component`, `button--to-up`
//>  no: `myComponent`, `buttonToUp`, `hero`
```

## with shadom DOM

```js
class CustomElement extends HTMLElement {

  constructor() {
    super()
    //> 쉐도우 돔 생성
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.render()
  }
  
  render() {
    
    // get attribute
    const attribute = this.getAttribute(`attribute`) || 'default value' 
  
    // set inner html
    //* shadow dom에 요소를 추가하기
    this.shadowRoot.innerHTML = /*html*/`
    <div>hello, world.</div>
    <div>i am 'cusotm-element'</div>
    `

    // set style
    const style = document.createElement('style')
    style.innerHTML = /*css*/`
    `
    //* style을 shadow에 넣기
    this.shadowRoot.appendChild(style)
  }
}

// 브라우저에 정의한 커스텀 엘리먼트를 등록
customElements.define('custom-element', CustomElement);
```

