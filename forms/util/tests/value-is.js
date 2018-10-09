export default function valueIs (value) {
  return function check (x) {
    return value === x
  }
}