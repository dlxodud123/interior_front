export const frontTechnologyData = [
    {
        question: "프로그래밍이란?",
        answer: "컴퓨터에게 특정 작업을 수행하도록 명령하는 과정으로 알고리즘 설계, 코드작성, 디버깅 및 테스트를 포함"
    },
    {
        question: "브라우저의 렌더링 원리",
        answer: "HTML과 CSS를 해석하여 DOM과 CSSOM을 생성하고, 이를 결합해 렌더 트리를 만들고, 이를 기반으로 화면에 표시"
    },
    {
        question: "동기 개념",
        answer: "작업이 순차적으로 실행되어 이전 작업이 완료되어야 다음 작업이 시작"
    },
    {
        question: "비동기 개념",
        answer: "작업이 동시에 실행이 가능하며, 이전 작업 여부와 관계없이 작업 시작"
    },
    {
        question: "라이브러리란 개념",
        answer: "특정 기능을 수행하는 코드 모음으로, 개발자가 필요할 때 호출하여 가능"
    },
    {
        question: "프레임워크란 개념",
        answer: "애플리케이션 구조를 제공하여, 특정 규칙을 따르도록 강제하며, 전체 애플리케이션 흐름을 관리"
    },
    {
        question: "주소창에 google.com을 입력하면 일어나는 일",
        answer: "DNS 조회를 통해 IP 주소를 찾고, 서버와 통신하여 받은 HTML, CSS, JavaScript 등을 렌더링해 화면에 표시"
    },
    {
        question: "호이스팅(hoisting) 개념",
        answer: "변수 및 함수 선언문이 스코프 내의 최상단으로 끌어올려지는 현상 (변수를 선언하기 전에도 사용할 수 있어 유연성이 올라간다"
    },
    {
        question: "클로저(Closure) 개념",
        answer: "함수가 속한 렉시컬스코프(함수를 어디서 호출하는지가 아니라 어디에 선언하였는지)를 기억하여 접근할 수 있도록 도와주는 역할"
    },    
    {
        question: "이벤트 버블링 개념",
        answer: "이벤트가 발생 시 해당 요소에서 이벤트가 처리 된 후 상위 요소로 이벤트가 전파되는 현상"
    },
    {
        question: "이벤트 캡처링 개념?",
        answer: "이벤트 버블링과 반대로 최상위 태그에서 해당 태그가 전파되는 과정"
    },
    {
        question: "가비지 컬렉터 개념",
        answer: "더 이상 사용되지 않는 메모리를 자동으로 회수하는 시스템 (메모리 누수 방지)"
    },
    {
        question: "margin과 padding 개념",
        answer: "margin = 바깥쪽 여백을 의미, padding = 안쪽 여백을 의미"
    },
    {
        question: "position(static) 개념",
        answer: "요소를 일반적인 문서 흐름에 따라 배치, 오프셋(top, right, bottom, left) 적용 불가능"
    },
    {
        question: "position(relative) 개념",
        answer: "static + 자신을 기준으로 오프셋(top, right, bottom, left) 적용"
    },
    {
        question: "position(fixed) 개념",
        answer: "뷰포트를 기준으로 고정, 항상 같은 위치에 머물도록 지정"
    },
    {
        question: "position(sticky) 개념",
        answer: "스크롤을 통해 일정 스크롤구간에서는 relative처럼 동작하다가, 설정된 임계점 이후에는 fixed로 동작합니다."
    },
    {
        question: "position(absolute) 개념",
        answer: "요소를 일반적인 문서 흐름을 제거, 가장 가까운 부모 요소나 조상 요소 기준으로 정확한 위치 지정"
    },
    {
        question: "async 개념",
        answer: "함수를 비동기 함수로 선언하는 역할 (항상 Promise를 반환)"
    },
    {
        question: "awiat 개념",
        answer: "async 함수 내에서 비동기 작업을 기다리는 역할"
    },
    {
        question: "Promise 개념",
        answer: "비동기 작업의 결과를 처리하기 위한 객체로, 작업이 완료되면 성공 또는 실패를 반환하는 구조이다 \n (then = 성공, catch = 실패, finally = 항상 실행)"
    },
    {
        question: "API 개념",
        answer: "소프트웨어 간의 상호작용을 가능하게 하는 프로토콜로, 다양한 서비스나 기능을 사용할 수 있도록 도와주는 역할"
    },
    {
        question: "Rest API, Restful API 공통점",
        answer: "HTTP 프로토콜을 사용해, CRUD 작업을 수행하는 인터페이스 \n (GET = 기존 자원을 조회, POST = 새로운 자원을 생성, DELETE = 기존 자원을 삭제, PUT = 기존 자원을 수정)"
    },
    {
        question: "Rest API, Restful API 차이점",
        answer: "Rest API는 REST규칙을 준수하지 않을 수 도 있지만, \n Restful API는 REST규칙을 엄격히 준수해야한다 (Rest API > Restful API)"
    },
    {
        question: "REST 규칙",
        answer: "클라이언트와 서버는 독립적으로 존재, 클라이언트와 서버 간의 상호작용은 일관된 인터페이스를 통해 이루어져야한다"
    },
    {
        question: "AJAX 개념",
        answer: "자바스크립트를 통해 서버와 클라이언트가 비동기 방식으로 데이터를 교환할 수 있는 통신기능"
    },
    {
        question: "OAuth 개념",
        answer: "인터넷 사용자가 비밀번호를 제공하지 않고 웹사이트를 이용할 수 있도록 하는 프로토콜"
    },
    {
        question: "URI, URL 차이점",
        answer: "URI = 자원을 식별, URL = 자원의 위치를 나타냄 (URI > URL)"
    },
    {
        question: "CORS 개념",
        answer: "웹 애플리케이션이 다른 출처의 리소스에 안전하게 접근할 수 있도록 돕는 역할"
    },
    {
        question: "DOCTYPE 개념",
        answer: "HTML 문서의 타입을 정의하여 브라우저가 올바르게 렌더링하도록 돕는 역할"
    },
    {
        question: "meta 개념 및 종류",
        answer: "메타 데이터의 줄임말 \n charset(문자 인코딩 정의) => UTF=8 \n name(메타데이터 종류 정의) => description | keyword | author \n viewport(반응형 웹 디자인을 위한 설정) => initial-scale=1.0"
    },
    {
        question: "PX, EM 정의",
        answer: "PX = 절대 단위로 고정된 픽셀 수로 나타낸다 \n EM = 상대 단위로 현재 요소의 글꼴 크기를 기준으로 정의"
    },
    {
        question: "반응형 웹의 3요소",
        answer: "유연한 레이아웃 = 유연한 단위를 사용하여, 다양한 화면 크기에 자동 조정 되도록 설정 \n 유연한 이미지 = max-width: 100%를 사용하여 이미지가 부모 요소의 크기를 초과하지 않도록 설정 \n 미디어 쿼리 = @media 규칙을 사용하여, 다양한 디바이스에 맞게 스타일을 적용하는 역할"
    },
    {
        question: "CSS 적용 우선순위",
        answer: "1) HTML요소에 style속성에 직접 작성 (인라인 스타일) \n 2) ID를 선택하여 style 적용 (ID 선택자) \n 3) 클래스를 선택하여 style 적용 (클래스 선택자) \n 4) 태그를 선택하여 style 적용 (태그 선택자) \n 5) 유니버설(*)을 선택하여 style 적용 (유니버설 선택자) \n * !important를 사용하여 우선순위를 높일 수 있음 *"
    },
    {
        question: "this 개념",
        answer: "문맥에 따라 달라지는 객체를 가리키는 참조 역할 (주로 함수나 메소드가 호출될때, 그 함수에 소속된 객체를 가리킨다)"
    },
    {
        question: "브라우저 저장소(LocalStorage, SessionStorage, Cookie)의 차이점",
        answer: "LocalStorage = 영구적으로 보관 가능(자동 로그인) \n SessionStorage = 세션 종료시 삭제(입력 폼 정보, 비로그인 활동) \n Cookie = 사용자 정보를 저장 및 세션 관리(팝업 창)"
    },
    {
        question: "null, undefined, undeclared, NaN 개념",
        answer: "null = 빈값 \n undefined = 정의(변수에 값을 할당)되지 않음 \n undeclared = 선언(변수를 만드는 것)되지 않음 \n NaN = 표현 불가능한 수치형 결과"
    },
    {
        question: "HTML 렌더링 중에 JavaScript가 실행되면 렌더링이 멈추는 이유",
        answer: "JavaScript에게 엔진 제어권을 넘겨서"
    },
    {
        question: "import, require 차이점",
        answer: "import = 비동기적으로 모듈을 불러온다. 파일 상단에 위치한다. ES6 (JavaScript의 표준 사양 중 하나) 시스템에서 사용된다 \n require = 동기적으로 모듈을 불러온다. 코드 실행 시점에서 모듈을 가져온다. CommonJS (Node.js에서 사용, JavaScript에 최적화) 시스템에서 사용된다."
    },
    {
        question: "scope 개념 및 종류",
        answer: "프로그램에서 접근 가능한 범위를 정의 \n Global Scope (전역 스코프) = 프로그램 전체에서 접근할 수 있는 범위 \n Function Scope (함수 스코프) = 함수 내에서만 접근 가능한 범위 \n Block Scope (블록 스코프) = {}로 묶인 블록 내에서만 접근 가능한 범위 \n Lexical Scope (어휘적 스코프) = 함수가 선언된 위치에 따라 접근 범위가 정해진다 \n Module Scope (모듈 스코프) = 각 모듈 파일이 독립적으로 범위를 가지도록 설정, 다른 모듈에서는 접근 불가능"
    },
    {
        question: "var, let, const 차이점",
        answer: "var = 재선언 o, 재할당 o \n let = 재선언 x, 재할당 o \n const = 재선언 x, 재할당 x (var는 function scope개념 / let, const는 block scope 개념)"
    },
    {
        question: "CSS와 SASS(SCSS) 차이점",
        answer: "더 복잡한 스타일링을 간단하게 처리할 수 있다. \n 1) 조건문 사용 가능 \n 2) 스타일을 중첩할 수 있다. \n 3) $(달러)표시를 통해 변수 생성 가능 \n 4) @(앳)mixin이라는 기능으로 @include를 통해 재사용 가능 \n 5) 단순 계산 기능 7) @extend를 통해 상속 기능"
    },
    {
        question: "React를 사용하는 이유",
        answer: "1)컴포넌트 기반이므로 재사용이 편리하고 \n 2)유지보수가 용이 \n 3)가상DOM을 사용하여 변경을 최소화 하고, 렌더링 성능을 개선 \n 4)SPA(Single Page Application)이므로 필요한 부분만 업데이트 하여, 사용자가 더 빠르고 매끄럽게 이용 가능"
    },
    {
        question: "virtual DOM 개념",
        answer: "DOM이 변화할때마다 변경된 부분만 찾아서, 해당 부분만 업데이트하게 도와주는 역할"
    },
    {
        question: "DOM 개념 및 종류",
        answer: "웹페이지의 구조와 요소를 트리 형태로 표현하는 객체 모델 (JavaScript를 통한 API) \n Real DOM = 실제로 사용자에게 보여지는 DOM / 업데이트 비용이 크고, UI변경이 느림 \n Virtual DOM = 변화가 있을때 효율적으로 처리하기 위한 기술 / 빠른 렌더링, 효율적인 업데이트"
    },
    {
        question: "props, state 차이점",
        answer: "props = 읽기 전용이며, 부모 컴포넌트에서만 변경 가능하다. \n state = setState를 통해 변경 가능하다."
    },
    {
        question: "FLUX 개념",
        answer: "단방향 데이터 흐름을 통해 상태 관리를 단순화하고 예측가능하게 도와주는 역할"
    },
    {
        question: "LEDUX 개념",
        answer: "불편성 원칙을 적용하여 예측 가능한 데이터 흐름을 제공"
    },
    {
        question: "Hooks 종류",
        answer: "useState = 상태 관리를 하기위한 훅으로, 변수와 이를 업데이트하는 함수를 반환, useEffect = 컴포넌트가 마운트(컴포넌트 생성), 언마운트(컴포넌트 제거), 업데이트 될 때 특정 작업을 수행하도록 도와주는 역할, useMemo = 계산 비용이 높은 값을 계산할때, 지정된 값이 변경될때만 실행되도록 하는 역할, useRef = 렌더링에 영향을 주지 않으면서 값을 변경하게 도와주는 역할 (HTML요소에 직접 접근하여 조작하게 도와주는 역할)"
    },
    {
        question: "컴포넌트의 라이프 사이클",
        answer: "마운팅, 언마운팅, 업데이트 단계로 나뉘며, 각 단계에서 메소드가 호출되어 상태관리와 UI 업데이트를 수행"
    },
    {
        question: "Reflow와 Repaint가 실행되는 시점",
        answer: "Reflow가 끝나고 Repaint가 실행된다"
    },
];

export const frontTechnologyHtmlData = [
    {
        question: "",
        answer: ""
    },
]

export const frontTechnologyCssData = [
    {
        question: "",
        answer: ""
    },
]

export const frontTechnologyJavascriptData = [
    {
        question: "",
        answer: ""
    },
]

export const frontTechnologyReactData = [
    {
        question: "",
        answer: ""
    },
]

export const frontTechnologyTypescriptData = [
    {
        question: "",
        answer: ""
    },
]

export const frontPortfolioData = [
    {
        question: "",
        answer: ""
    },
];










export const frontCompanyData = [
    {
        question: "질문",
        answer: "답답"
    },
];