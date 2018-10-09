const valueIsEmail = val => val.length < 5 || (val.includes('@') && val.includes('.'))

export default valueIsEmail