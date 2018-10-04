export const primary = css`
  primary: #5ae25a;
  border-radius: 8px;
  bg: linear-gradient(70deg, black, rgb(20, 25, 23));
  wrapper-width: 900px;
  /* Font Colours */
  page-title: white;
  page-description: rgb(230, 230, 230);
  card-title: rgba(230, 230, 230);

  body-copy: white;
`

export const secondary = css`
  green: red;
  border-radius: 0px;
  blue: red;
  bg: black;
  body-copy: white;
` 

// Create theme object from css string
function css (strings, ...rest) {
  let res = strings.raw[0]
  // Remove comments
    .replace(/\/\*.*\*\//g, '')
    .split(';')
  res = res.map(str => str.trim())

  return res.filter(Boolean)
    .reduce((acc, item) => {
      const [name, property] = item.replace(/ /g, '').split(':')
      acc[name.trim()] = property.trim()
      return acc
    }, {})
}
