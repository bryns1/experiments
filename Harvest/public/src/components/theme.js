export const primary = css`
  green: #53ad53;
  border-radius: 8px;
  blue: blue;
  bg: white;
  text: black;
`

export const secondary = css`
  green: red;
  border-radius: 0px;
  blue: red;
  bg: black;
  text: white;
`

// Create theme object from css string
function css (strings, ...rest) {
  let res = strings.raw[0].split(';')
  res = res.map(str => str.trim())

  return res.filter(Boolean)
    .reduce((acc, item) => {
      const [name, property] = item.replace(/ /g, '').split(':')
      acc[name.trim()] = property.trim()
      return acc
    }, {})
}
