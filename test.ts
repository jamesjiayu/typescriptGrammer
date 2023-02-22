import { type } from '@testing-library/user-event/dist/type'
//千锋教育前端TypeScript入门视频教程（陆神顶配版TS入门教程）
function greet(person: string | string[]): number {
  if (Array.isArray(person)) {
    console.log(person.join('   and   '))
  } else {
    console.log(`HI~ ${person.toUpperCase()}`)
  }
  return 1
}
greet('J')
let arr: number[] = [1, 2, 5, 67]
let arr2: Array<number> = [2, 3, 56, 7]

function printCoord(pt: { x: number | string; y?: string }) {
  /*   if (pt.y !== undefined) {
    console.log(`They are x: ${pt.x} and y: ${pt.y}`)
  } */
  console.log(pt.y?.toUpperCase())
}
printCoord({ x: 3, y: 'nine' })
printCoord({ x: 3 })

type TypeName =
  | string
  | string[]
  | {
      a: string
      b: number
    }
function testTypeNames(a: TypeName) {}
type TypeName1 = {
  name: string
  gender: boolean
}
type TypeName2 = TypeName1 & {
  height: number
}
let t2: TypeName2 = { name: 'ttt', gender: true, height: 111 }
interface Animal {
  name: string
}
interface Animal {
  height: number
}
interface Bear extends Animal {
  claws: number
}
let bear: Bear = {
  name: 'winnie',
  height: 100,
  claws: 4,
}
function textType(s: string, alignment: 'left' | 'right' | 'center') {
  console.log(s, alignment)
}
function textType2(a: number, b: number): 0 | 1 | -1 {
  return a > b ? 1 : a < b ? -1 : 0
}
interface Options {
  width: number
}
function config(x: Options | 'auto') {}
function handleRequest(url: string, method: 'GET' | 'POST' | 'PUT') {}
const ob = {
  url: 'www.google.com',
  method: <'GET'>'GET', //as 'GET',
} //as const
handleRequest(ob.url, ob.method)
enum Dir {
  Up = 1,
  Down,
  Left,
  Right,
}
console.log(Dir.Down)
function stringPrint(strs: string | string[] | null) {
  if (strs && typeof strs === 'object') {
    console.log('null is a object')
  } else if (typeof strs === 'string') {
  } else {
    console.log('adding (strs &&) is the solution')
  }
}
stringPrint(null)
function undefinedNullNumber(num: number | null | undefined) {
  if (num != null) {
    console.log('!= solution of  null and undefined')
  }
}
undefinedNullNumber(null)
undefinedNullNumber(undefined)
undefinedNullNumber(5)

function ifElseType() {
  let x: string | number | boolean
  x = Math.random() < 0.5
  if (Math.random() < 0.5) {
    x = 'string type'
  } else {
    x = 100
  }
  return x
}
let x = ifElseType()
x = 'hello'
x = 1
//x=true // x=Math.random()<0.5 没用了，被覆盖了

type Fish = { name: string; swim: () => void }
type Bird = { name: string; fly: () => void }
function isFish(pet: Fish | Bird): pet is Fish {
  //类型 谓词！？
  return (pet as Fish).swim !== undefined
}
function getPet() {
  let fish: Fish = { name: 'shark', swim: () => {} }
  let bird: Bird = { name: 'Blcak Bird', fly: () => {} }
  return true ? bird : fish //I donot understand
}
let pet = getPet()
if (isFish(pet)) {
  pet.swim()
} else {
  pet.fly
}
const zoo: (Fish | Bird)[] = [getPet(), getPet(), getPet()]
const underwater: Fish[] = zoo.filter(isFish) // as Fish[]
const underwater2: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === 'frog') {
    return false
  }
  return isFish(pet)
})
function fnType(fn: (s: string) => void) {
  fn('function type! callback function ')
}
function callBackFnType(a: string) {
  console.log(a)
}
fnType(callBackFnType)

type descFunction = {
  (argumenT: number): boolean
  descProp: string
}
function typeFn(n: number) {
  console.log(`n in typeFn is ${n}`)
  return true
}
typeFn.descProp = 'description Propoty'
function callTypeFn(fn: descFunction) {
  console.log(fn(3))
  console.log(`descFunction is ${fn} and its prop is fn.descProp `)
}
callTypeFn(typeFn)

class Ctor {
  s: string
  constructor(s: string) {
    this.s = s
  }
}
type SomeConstructor = { new (s: string): Ctor }
function realF(ctor: SomeConstructor) {
  return new Ctor('hello new constructor')
}
const obje = realF(Ctor)
console.log(obje.s)

interface CallOrConstructor {
  (n: number): string
  new (s: string): Date
}
function callOrConstru(date: CallOrConstructor) {
  let a = date(2)
  let b = new date('2023-01-01')
}

function genericFunc<GGeneric>(arr: GGeneric[]): GGeneric {
  return arr[0]
}
console.log(genericFunc([1, 2, 3]))
function mapMy<Input, Output>(
  arr: Input[],
  fn: (a: Input) => Output
): Output[] {
  return arr.map(fn)
}
console.log(mapMy(['1', '2', '4'], (n) => parseInt(n))) // not easy

/* function typeExtends<T extends { length: number }>(obj: T, num: number): T {
  if (arr.length >= num) return obj
  return { length: num } //return value is a object, but is not the T type object
} */
// ???????????below
interface User {
  admin: boolean
}
interface DB {
  filterUsers(filter: (this: User) => boolean): User[]
}
const db: DB = {
  filterUsers: (filter: (this: User) => boolean) => {
    let u1 = { admin: true }
    let u2 = { admin: false }
    return [u1, u2]
  },
}
const admins = db.filterUsers(function (this: User) {
  return this.admin
})
console.log(admins)
//The Math.atan2() static method returns the angle in the plane (in radians) between the positive x-axis and the ray from (0, 0) to the point (x, y), for Math.atan2(y, x).
const args = [9, 7] as const //没 as const之前，args  is number[],但是可能为 [],或 不是2个值
const angle = Math.atan2(...args)
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c)
}
sum({ a: 1, b: 4, c: 99 })

type Shape = {} //类型 定义，但是里面暂时没东西
interface PaintOptions {
  shape: Shape
  xPos?: number
  yPos?: number
}
/* function optionProps(pO: PaintOptions) {
  console.log(pO.xPos)
  console.log(pO.yPos)
  console.log(pO.shape)
} */
/* function optionProps(pO: PaintOptions) {
  console.log(pO.xPos === undefined ? 0 : pO.xPos)
  console.log(pO.yPos === undefined ? 0 : pO.yPos)
  console.log(pO.shape)
} */
function optionProps({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log(xPos)
  console.log(yPos)
  console.log({ shape, xPos, yPos })
}
/* const object = { number: 10 }
const { number: otherNumber } = object
console.log(otherNumber) //10  对象结构时，使用别名 
function optionProps({ shape：Shape, xPos:number = 0, yPos: number = 0 }: PaintOptions) {*/
const shape: Shape = {} // 空对象，不是类型定义
optionProps({ shape }) //属性名跟变量名一样 {{ shape:shape }}
optionProps({ shape, yPos: 20 })

interface Home {
  house: string
  readonly resident: { name: string; readonly age: number }
}
function readonlyF(home: Home) {
  home.resident.name = 'James'
  // home.resident = { name: 'Jim', age: 18 }
}
interface Person {
  name: string
  age: number
}
interface ReadOnlyPerson {
  readonly name: string
  readonly age: number
}
let person: Person = { name: 'James', age: 99 }
let readonlyPerson: ReadOnlyPerson = person
console.log(readonlyPerson)
person.age++
console.log(readonlyPerson)
//6-4索引签名
interface ArrString {
  [index: number]: string
}
let arrS: ArrString = ['a', 'z', 'b']
console.log(arrS[1])
interface PropString {
  [prop: string]: number
}
let propStr: PropString = {
  a: 1,
  b: 4,
  x: 9,
}
interface PropString2 {
  [prop: string]: number | string
  length: number
  name: string
}
let pStr2: PropString2 = {
  length: 100,
  a: 'b',
  name: 'Jim',
}

interface Box<Type> {
  prop: Type
  name: string
}
let box: Box<number> = {
  prop: 111,
  name: 'J',
}
interface Apple {} //... just a interface, no worries about what's inside
/* interface AppleBox{
  box:Box<Type>
  apple: Apple
} */
let ap: Apple = {}
type AppleBox = Box<Apple>
let aB: AppleBox = {
  name: 'JJ',
  prop: ap,
}
type OrNull<Type> = null | Type
type oneOrMany<Type> = Type | Type[]
type oneOrManyOrNull<Type> = OrNull<oneOrMany<Type>> //nice
type oneOrManyOrNullStr = oneOrManyOrNull<string>

function id<Type>(arg: Type): Type {
  return arg
}
let myID: <Type1>(arg: Type1) => Type1 = id
let myID2: { <Type>(arg: Type): Type } = id // {key : Value} Function
interface idFn {
  <Type>(arg: Type): Type
}
interface idFn2<Type> {
  (arg: Type): Type
}
let myID3: idFn = id
let myID4: idFn2<string> = id

function constri<Type, Key extends keyof Type>(obj: Type, key: Key) {}
let obj1 = { a: 1, b: 3, C: 4 }
constri(obj1, 'a') // key a,b,C, not others

class Beekeeper {
  hasMask: boolean = true
}
class Zookeeper {
  nameTag: string = 'Mike'
}
class Animals {
  numLegs: number = 4
}
class Bee extends Animals {
  keeper: Beekeeper = new Beekeeper()
}
class Lion extends Animals {
  keeper: Zookeeper = new Zookeeper()
}
function classType<A extends Animals>(class1: new () => A): A {
  // 类类型 not esay
  return new class1()
}
classType(Lion).keeper.nameTag
classType(Bee).keeper.hasMask
//classType(Zookeeper)// Error

type Point = {
  x: number
  y: string
  z: boolean
}
type P = keyof Point
let p: P = 'x' //p could be x , y or z
type PP = Point[keyof Point]
let pp: PP = true // pp could be number string , boolean
type PPP = Point['x' | 'z']
let ppp: PPP = 1 // ppp could be number, boolean
type ArrNum = { [index: number]: string }
type Numb = keyof ArrNum
let n1: Numb = 4
type ArrMap = { [index: string]: boolean } //including number and string
type MMap = keyof ArrMap
let mmap: MMap = 4
let mmap2: MMap = 'adf'

type FFF = (x: unknown) => void
type FFF1 = ReturnType<FFF>
function ffn() {
  return { x: 1, y: 2 }
}
type FFF2 = ReturnType<typeof ffn> //function's name, not return Value

const arrayP = [
  { name: 'Jim', age: 19 },
  { name: 'King', age: 3 },
  { name: 'wang', age: 99 },
]
type ArrP = typeof arrayP[number]
let arrP: ArrP = { name: 'JimX', age: 119 }
type ArrPP = typeof arrayP[number]['name']
let arrPP: ArrPP = 'Jimmy'
//条件类型
interface IdLabel {
  id: number
}
interface NameLabel {
  name: string
}
type IdOrNameLabel<T extends number | string> = T extends Number
  ? IdLabel
  : NameLabel
/* function createLabel<T extends number | string>(idOrName: T): IdOrNameLabel<T> {
  throw ''
}
let createL = createLabel('hello') //createL type is NameLabel
let createL2 = createLabel(Math.random() > 0.5 ? 'hhello' : 3434) //createL2 type is Idlabel or NameLabel
 */
//type MessageOf<T>=T['message']
//type MessageOf<T extends {message:unknown}>= T['message']
type MessageOf<T> = T extends { message: unknown } ? T['message'] : never
interface Email {
  message: string
}
type EmailMessageContent = MessageOf<Email>
let emc: EmailMessageContent = 'hi there,how are you?...'
type Dog = { bark: () => void }
type DogMessageContent = MessageOf<Dog>
let dmc: DogMessageContent = 'barkkkk' as never

export type Flatten<T> = T extends any[] ? T[number] : T // 若是数组，返回元素
type SS = Flatten<string[]> // ss 是string 类型
type SS2 = Flatten<boolean> // ss2 type is boolean
let ss2: SS2 = true
//7-14 infer ??
type FF<T> = T extends Array<infer Item> ? Item : T
type getReturnType<T> = T extends (...args: never[]) => infer Return
  ? Return
  : never
type Num = getReturnType<() => number> //
let num: Num = 1111
type Str = getReturnType<(s: string) => string>
type bools = getReturnType<(a: boolean, b: boolean) => boolean[]>
type Never = getReturnType<number>
let nev: Never = 'asdf' as never

class getSet {
  _x = 10
  get x() {
    return this._x
  }
  set x(val: string | number | boolean) {
    let num = Number(val)
    if (!Number.isFinite(num)) {
      this._x = 0
      return
    }
    this._x = num
  }
}
let gS = new getSet()
gS.x = 'aaa'
console.log(gS.x)

class Signature {
  [s: string]: boolean | ((s: string) => boolean)
  x = true
  check(s: string) {
    return this[s] as boolean
  }
}

class PrivteInstance {
  private x = 10
  test(other: PrivteInstance) {
    other.x === this.x // other is another instance of class privteInstance
  }
}

class StaticMember {
  protected static x = 11
  static hhh() {
    return StaticMember.x
  }
}
StaticMember.hhh()
class Derived extends StaticMember {
  y = Derived.hhh()
  z = Derived.x
}
class StaticMemberPrivate {
  static #x = 11 //static and private
  static {
    StaticMemberPrivate.#x *= 24
  }
}
// StaticMemberPrivate.#x
class genericClass<Ty> {
  x: Ty
  constructor(val: Ty) {
    this.x = val
  }
}
let gC = new genericClass('heloooooo')
//gC.x=2
class ParasProps {
  constructor(public x: number, protected readonly y: string) {} //No this.x=x
}
let paraP = new ParasProps(100, 'adsf')
//TISH 8-21-  22
abstract class Base {
  abstract abstFn(): string
  normalFn() {
    console.log('asdf')
  }
}
class DerivedAbst extends Base {
  abstFn() {
    return 'asddddf'
  }
}
//base类型结构化的签名
function abstractTest(ctor: new () => Base) {
  new ctor().abstFn()
}
//abstractTest(Base)
abstractTest(DerivedAbst)

export default function fnExport() {
  console.log('test Export moudles fnExport')
}
export const expValue = 'test another export value String'

module.exports = {
  pi: 3.14,
  nameMy: 'James',
  abstractTest,
}
exports.paraP = paraP
