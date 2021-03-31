function padLeft(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error("Expected string or number, got '" + padding + "'.");
}
var indentedString = padLeft("Hello world", 1);
// state라는 필드 모두 갖고 있다.
function networkStatus(state) {
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
            return "Error " + state.code + " downloading";
        case "success":
            return "Downloaded " + state.response.title + " - " + state.response.summary;
    }
}
var handleArtistsResponse = function (response) {
    if (response.error) {
        console.error(response.error.message);
        return;
    }
    console.log(response.artists);
};
// 교차를 통한 믹스인 (Mixins via Intersections)
// 교차는 믹스인 패턴을 실행하기 위해 사용된다
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function (name) {
        console.log("Hello, I'm " + name + ".");
    };
    return ConsoleLogger;
}());
// 두 객체를 받아 하나로 합친다
function extend(first, second) {
    var result = {};
    for (var prop in first) {
        if (first.hasOwnProperty(prop)) {
            result[prop] = first[prop];
        }
    }
    for (var prop in second) {
        if (second.hasOwnProperty(prop)) {
            result[prop] = second[prop];
        }
    }
    return result;
}
var jim = extend(new Person("Jim"), ConsoleLogger.prototype);
jim.log(jim.name);
