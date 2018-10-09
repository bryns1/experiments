export default function valueIsNot(value){
  return function check (x) {
    return value !== x
  }
}