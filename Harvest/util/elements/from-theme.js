export default function fromTheme (prop) {
  return props => {
    if (!props.theme[prop]) throw new Error(`Styled theme does not contain ${prop}`)
    return props.theme[prop]
  }
}
