interface LabeledValue {
    label: string;
}

function printLabel(labeledObj: LabeledValue){
    console.log(labeledObj.label);
}

let myObj = {size:10, label: "Size 10 Object"};
printLabel(myObj);

export interface x {
    a: number;
    b: string;
}
export interface IHash {
    [details: string] : string;
} 
let myhash: IHash = {};

myhash["somethin"] = "value";


interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig) : {color: string; area: number}{
    let newSquare = {color: "white", area: 100};
    //

    //
    return newSquare;
}

let mySquare = createSquare({color: "black"});

interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result>-1;
}


// indexable types

interface StringArray{
    [index: number]: string;
}
let myArray: StringArray;
myArray = ["a","b"];

let mystr: string = myArray[0];

// diff between the static and instance sides of classes

interface ClockConstructor {
    new (hour: number, min: number);
}

interface ClockInterface {
    tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface{
    return new ctor(hour, minute);
}

class Clock implements ClockConstructor{
    currentTime: Date;
    constructor(h:number, m:number){ }
}