const preventDefault = e => {
  e.preventDefault()
}

const FakeLink = props => {
  return (
    <a href="#" onClick={e => {
      preventDefault(e)
      if (props.onClick) {
        props.onClick(e)
      }
    }}><div>{props.children}</div></a>
  )
}


export default FakeLink