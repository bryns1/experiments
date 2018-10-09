export const not = fn => {
  return x => !fn(x)
}

export const and = (...fns) => {
  return x => {
    for (const fn of fns) {
      if (!fn(x)) {
        return false
      }
    }

    return true
  }
}

export const or = (...fns) => {
  return x => {
    for (const fn of fns) {
      if (fn(x)) {
        return true
      }
    }

    return false
  }
}