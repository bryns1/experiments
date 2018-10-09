import React from 'react'

class FormListener extends React.Component{
  constructor(props){
    super(props)
    this.name = props.name
    this.state = {
      form: this.props.transform(this.props.form())
    }
  }

  componentDidMount(){
    const {name, defaultValue, form} = this.props

    if (name && form) {
      this.listener = form.listen(formState => {
        this.setState({
          form: formState
        })
      })

      if (defaultValue && typeof this.state.form[name]){
        this.set(name, defaultValue)
      }
    }
  }

  componentWillUnmount(){
    // Unmount listener
    this.listener()
  }

  update = e => {
    form.setState({
      [this.name + e.target.name]: e.target.value
    })
  }

  set = (name, value) => {
    form.setState({
      [this.name + name]: value
    })
  }

  val = (name, def) => typeof this.state.form[this.name + name] !== 'undefined' 
    ? this.state.form[this.name + name]
    : def

  extVal = (name, def) => typeof this.state.form[name] !== 'undefined'
    ? this.state.form[name]
    : def

  render(){
    return (
      React.cloneElement(
        React.Children.only(),
        {
          ...this.props,
          set: this.set,
          val: this.val,
          extVal: this.extVal,
          update: this.update
        }
      )
    )
  }
}

const connect = (form, transformer) => Component => props => {
  return (
    <FormListener {...props} form={form} transform={transformer}>
      <Component/>
    </FormListener>
  )
}

export default connect