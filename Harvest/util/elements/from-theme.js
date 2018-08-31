export default function fromTheme (prop) {
  return props => {
    return props.theme[prop]
  }
}
