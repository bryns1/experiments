import Subject from '../../utils/reactive/subject'

function Form(obj = {}){

  const subject = new Subject()
  let form = {}

  mergeForm(obj)

  const self = function(){
    return form
  }

  function mergeForm(obj){
    const keys = Object.keys(obj)

    keys.forEach(k => form[k] = obj[k])
  }

  self.setState = obj => {
    mergeForm(obj)
    subject.emit('form', self())
  }

  self.listen = fn => {
    return subject.on('form', fn)
  }

  return self
}

export default Form