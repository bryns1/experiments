
// !! Try not to use in render loops or on events
// If you have to make sure you debounce it
// Or async it?

function isVisible(element, padding = 0){
  const el = element.jquery ? element[0] : element
  const offset = el.getBoundingClientRect()

  return offset.top + offset.height > 0 
  && offset.top < window.innerHeight 
  && offset.left + offset.width > 0
  && offset.left < window.innerWidth
}

// If you use a number it will return a new function that you can use in an iterator
export default function (element){
  if(typeof element === 'number'){
    return (el) => isVisible(el, element)
  }

  return isVisible(element)
}