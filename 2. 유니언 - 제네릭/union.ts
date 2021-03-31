function padLeft(value: string, padding: string | number) { // any 대신
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
      }
      if (typeof padding === "string") {
        return padding + value;
      }
      throw new Error(`Expected string or number, got '${padding}'.`);
  }

  let indentedString = padLeft("Hello world", 1);


  // 공통 필드를 갖는 유니언
  interface Bird {
    fly(): void;
    layEggs(): void;
  }
  
  interface Fish {
    swim(): void;
    layEggs(): void;
  }
  
  declare function getSmallPet(): Fish | Bird;
  
  let pet = getSmallPet();
  pet.layEggs();
  
  // 두 개의 잠재적인 타입 중 하나에서만 사용할 수 있습니다.
//   pet.swim();


// 유니언 구별하기

type NetworkLoadingState = {
    state: "loading";
  };
  
  type NetworkFailedState = {
    state: "failed";
    code: number;
  };
  
  type NetworkSuccessState = {
    state: "success";
    response: {
      title: string;
      duration: number;
      summary: string;
    };
  };
  
  // 위 타입들 중 단 하나를 대표하는 타입을 만들었지만,
  // 그것이 무엇에 해당하는지 아직 확실하지 않습니다.
  type NetworkState =
    | NetworkLoadingState
    | NetworkFailedState
    | NetworkSuccessState;

// state라는 필드 모두 갖고 있다.
function networkStatus(state: NetworkState): string {
    // 현재 TypeScript는 셋 중 어떤 것이
    // state가 될 수 있는 잠재적인 타입인지 알 수 없습니다.
  
    // 모든 타입에 공유되지 않는 프로퍼티에 접근하려는 시도는
    // 오류를 발생시킵니다.

    // state.code;
  
    // state에 swtich문을 사용하여, TypeScript는 코드 흐름을 분석하면서
    // 유니언 타입을 좁혀나갈 수 있습니다.
    switch (state.state) {
      case "loading":
        return "Downloading...";
      case "failed":
        // 여기서 타입은 NetworkFailedState일 것이며,
        // 따라서 `code` 필드에 접근할 수 있습니다.
        return `Error ${state.code} downloading`;
      case "success":
        return `Downloaded ${state.response.title} - ${state.response.summary}`;
    }
  }

// 교차 타입(intersection types)
// 여러 타입을 하나로 결합한다
// 기존 타입을 합쳐 필요한 기능을 모두 가진 단일 타입을 얻을 수 있다.
interface ErrorHandling {
    success: boolean;
    error?: { message: string };
}

interface ArtworksData {
    artworks: { title: string }[];
}

interface ArtistsData {
    artists: { name: string }[];
}

type ArtworksResponse = ArtworksData & ErrorHandling; // art 데이터와 에러 핸들링 타입을 둘다 가짐.
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
    if(response.error){
        console.error(response.error.message);
        return;
    }
    console.log(response.artists);
}

// 교차를 통한 믹스인 (Mixins via Intersections)
// 교차는 믹스인 패턴을 실행하기 위해 사용된다
class Person {
    constructor(public name: string) {}
}
interface Loggable {
    log(name: string): void;
}
class ConsoleLogger implements Loggable {
    log(name: string) {
        console.log(`Hello, I'm ${name}.`);
    }
}

// 두 객체를 받아 하나로 합친다
function extend<First extends {}, Second extends {}>(
    first: First,
    second: Second
): First & Second {
    const result: Partial<First & Second> ={};
    for(const prop in first){
        if(first.hasOwnProperty(prop)){
            (result as First)[prop] = first[prop];
        }
    }
    for(const prop in second) {
        if(second.hasOwnProperty(prop)){
            (result as Second)[prop] = second[prop];
        }
    }
    return result as First & Second;
}

const jim = extend(new Person("Jim"), ConsoleLogger.prototype);
jim.log(jim.name);