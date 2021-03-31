// 접근자, #name 같은 경우는 ECMASCRIPT 6 이상이여야 함
// tsc -t es6 class.ts

class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); } // 기초 생성자를 실행할 super()를 호출해야 한다
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters); // 
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) { // default 값이 45
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

// public, private 그리고 protected 지정자
// ts눈 기본적으로 public

// ECMAScript 비공개 필드, TS 3.8
class _Animal{
    #name: string;
    // private name: string;
    constructor(theName: string) {
        this.#name = theName;
    }
}
// Property '#name' is not accessible outside class '_Animal' because it has a private identifier.
// new _Animal("Cat").#name;



// protected 이해하기
class Personal {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Constructor of class 'Personal' is protected and only accessible within the class declaration.
// let johny = new Personal("johny");

// 매개변수 프로퍼티 (Parameter properties)




// 접근자 (Accessors)

const fullNameMaxLength = 10;

class Employee {
    private _fullName: string;

    get fullName(): string{
        return this._fullName;
    }

    set fullName(newName: string){
        if(newName && newName.length> fullNameMaxLength){
            throw new Error("fullName has ... " + fullNameMaxLength);
        }
        this._fullName = newName;
    }
}

let emp = new Employee();
emp.fullName = "Bob Smith";
if(emp.fullName){
    console.log(emp.fullName);
}


// static 변수 접근할 때 this. 로는 접근 안되고 Grid. (클래스 이름) 로 접근해야 한다.
console.log("static Properties");
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        //Property 'origin' does not exist on type 'Grid'. Did you mean to access the static member 'Grid.origin' instead?
        // let xDist = (point.x - this.origin.x);
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));



console.log("Abstract Classes");
abstract class __Animal {
    abstract makeSound(): void;
    move(): void{
        console.log("roaming the earth...");
    }
}

abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // 반드시 파생된 클래스에서 구현되어야 합니다.
}

class AccountingDepartment extends Department {

    constructor() {
        super("Accounting and Auditing"); // 파생된 클래스의 생성자는 반드시 super()를 호출해야 합니다.
    }

    printMeeting(): void {
        console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
        console.log("Generating accounting reports...");
    }
}

let department: Department; // 추상 타입의 레퍼런스를 생성합니다
// department = new Department(); // 오류: 추상 클래스는 인스턴스화 할 수 없습니다
department = new AccountingDepartment(); // 추상이 아닌 하위 클래스를 생성하고 할당합니다
department.printName();
department.printMeeting();
// department.generateReports(); // 오류: 선언된 추상 타입에 메서드가 존재하지 않습니다


// 고급 기법
// 생성자 함수
class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet()); // "Hello, there"

let greeterMaker: typeof Greeter = Greeter; // Greeter 클래스 자체의 타입을 greeterMaker에 제공했다.
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet()); // "Hey there!"

// interface 컴파일 할 때만 존재, abstract는 런타임에도 있음
// interface의 instanceof를 사용못함, abstract는 가능(런타임 타입)

class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
console.log(point3d.x);