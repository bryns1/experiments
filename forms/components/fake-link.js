const preventDefault = e => {
  e.preventDefault()
}

const FakeLink = props => {
  return (
    <a href="#" onClick={preventDefault}><div>{props.children}</div></a>
  )
}


export default FakeLink