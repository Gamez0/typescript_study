// 접근자, #name 같은 경우는 ECMASCRIPT 6 이상이여야 함
// tsc -t es6 class.ts
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _name;
class Animal {
    constructor(theName) { this.name = theName; }
    move(distanceInMeters = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
class Snake extends Animal {
    constructor(name) { super(name); } // 기초 생성자를 실행할 super()를 호출해야 한다
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters); // 
    }
}
class Horse extends Animal {
    constructor(name) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}
let sam = new Snake("Sammy the Python");
let tom = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);
// public, private 그리고 protected 지정자
// ts눈 기본적으로 public
// ECMAScript 비공개 필드, TS 3.8
class _Animal {
    // private name: string;
    constructor(theName) {
        _name.set(this, void 0);
        __classPrivateFieldSet(this, _name, theName);
    }
}
_name = new WeakMap();
// Property '#name' is not accessible outside class '_Animal' because it has a private identifier.
// new _Animal("Cat").#name;
// protected 이해하기
class Personal {
    constructor(theName) { this.name = theName; }
}
// Constructor of class 'Personal' is protected and only accessible within the class declaration.
// let johny = new Personal("johny");
// 매개변수 프로퍼티 (Parameter properties)
// 접근자 (Accessors)
const fullNameMaxLength = 10;
class Employee {
    get fullName() {
        return this._fullName;
    }
    set fullName(newName) {
        if (newName && newName.length > fullNameMaxLength) {
            throw new Error("fullName has ... " + fullNameMaxLength);
        }
        this._fullName = newName;
    }
}
let emp = new Employee();
emp.fullName = "Bob Smith";
if (emp.fullName) {
    console.log(emp.fullName);
}
// static 변수 접근할 때 this. 로는 접근 안되고 Grid. (클래스 이름) 로 접근해야 한다.
console.log("static Properties");
class Grid {
    constructor(scale) {
        this.scale = scale;
    }
    calculateDistanceFromOrigin(point) {
        //Property 'origin' does not exist on type 'Grid'. Did you mean to access the static member 'Grid.origin' instead?
        // let xDist = (point.x - this.origin.x);
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
}
Grid.origin = { x: 0, y: 0 };
let grid1 = new Grid(1.0); // 1x scale
let grid2 = new Grid(5.0); // 5x scale
console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log("Abstract Classes");
class __Animal {
    move() {
        console.log("roaming the earth...");
    }
}
class Department {
    constructor(name) {
        this.name = name;
    }
    printName() {
        console.log("Department name: " + this.name);
    }
}
class AccountingDepartment extends Department {
    constructor() {
        super("Accounting and Auditing"); // 파생된 클래스의 생성자는 반드시 super()를 호출해야 합니다.
    }
    printMeeting() {
        console.log("The Accounting Department meets each Monday at 10am.");
    }
    generateReports() {
        console.log("Generating accounting reports...");
    }
}
let department; // 추상 타입의 레퍼런스를 생성합니다
// department = new Department(); // 오류: 추상 클래스는 인스턴스화 할 수 없습니다
department = new AccountingDepartment(); // 추상이 아닌 하위 클래스를 생성하고 할당합니다
department.printName();
department.printMeeting();
// department.generateReports(); // 오류: 선언된 추상 타입에 메서드가 존재하지 않습니다
// 고급 기법
// 생성자 함수
class Greeter {
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}
Greeter.standardGreeting = "Hello, there";
let greeter1;
greeter1 = new Greeter();
console.log(greeter1.greet()); // "Hello, there"
let greeterMaker = Greeter; // Greeter 클래스 자체의 타입을 greeterMaker에 제공했다.
greeterMaker.standardGreeting = "Hey there!";
let greeter2 = new greeterMaker();
console.log(greeter2.greet()); // "Hey there!"
// interface 컴파일 할 때만 존재, abstract는 런타임에도 있음
// interface의 instanceof를 사용못함, abstract는 가능(런타임 타입)
class Point {
}
class Point3d extends Point {
}
let point3d = { x: 1, y: 2, z: 3 };
console.log(point3d.x);
