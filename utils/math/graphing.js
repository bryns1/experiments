export class Coord {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

export function coordFromEvent (e) {
  return new Coord(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY)
}

export function lineObject (m, b, co1, co2) {
  const lineFn = function ({x, y}) {
    if (typeof x === 'number') {   
      if (self.isVertical) return null
      return m * x + b
    } 
    if (typeof y === 'number') {
      if (self.isVertical) return co1.x
      return (y - b) / m
    }
  }

  // Use var so `self` gets hoisted
  var self = {
    m,
    gradient: m,
    b,
    yIntercept: b,
    coords: [
      co1,
      co2
    ],
    isVertical: isInfinite(m),
    isHorizontal: m === 0,
    perpendicularGradient: -1 / m,
    inverseGradient: -1 / m,
    string: `y = ${toDP(m, 2)}x + ${toDP(b, 2)}`,
    toString () {
      return self.string
    },
    toJSON () {
      return self.toString()
    },
    closestPoint (co) {
      if (self.isHorizontal) return new Coord(co.x, b)
      if (self.isVertical) return new Coord(lineFn({y: co.y}), co.y)

      const m1 = lineFn.perpendicularGradient
      const b1 = co.y - m1 * co.x
      const x = (b - b1) / (m1 - m)
      const y = m * x + b

      return new Coord(x, y)
    },
    snap (degrees, co = co1) {
      /*
        `co` can be passed in to define where the line is snapping from.
        Otherwise it is assumed to be first point passed into the line
        */

      // `m` is a letter often used for gradient/slope in mathematics
      let newM

      const original = transform(
        self.m,
        gradientToRadians, // Gets passed self.m
        radiansToDegrees // Gets passed result of gradientToRadians
      )
      
      /* 
        Tries to shift `original` to the nearest multiple of `degrees`
      */
      const normalized = nearestMultiple(original, degrees)

      /* 
        +-90 degrees equals an Infinite gradient (or slope)
      */
      if (normalized === 90 || normalized === -90) {
        /* 
          Normalized / 90 equals +-1 (Which direction the infinity goes in)
          Although negative or positive shouldn't really make a difference because they are
          both the same line
          */
        newM = normalized / 90 * Infinity
      } else {
        // Convert normalized from degrees to a gradient/slope value
        newM = transform(
          normalized,
          degreesToRadians,
          radiansToGradient
        )
      }
      
      return lineFromPointGradient(
        co,
        newM
      )
    },
    distanceFromPoint (co) {
      return distanceFromPoints(self.closestPoint(co), co)
    }
  }

  /* 
    Add the second coordinate to self if we are given it
    (No point losing information)
  */
  if (co2) self.coords[1] = co2

  Object.assign(lineFn, self)

  return lineFn
}

function isInfinite (num) {
  return !isFinite(num)
}

export function nearestMultiple (num, multiple) {
  return Math.round(num / multiple) * multiple
}

export function degreesToRadians (degrees) {
  return degrees * (Math.PI / 180)
}

export function line (co1, co2) {
  const m = gradientFromPoints(co1, co2)
  const b = co1.y - m * co1.x

  return lineObject(m, b, co1, co2)
}

export function lineFromPointGradient (co1, m, co2) {
  const b = co1.y - m * co1.x

  return lineObject(m, b, co1, co2)
}

export function toDP (num, dp) {
  return Math.round(num * (10 ** dp)) / (10 ** dp)
}

export function transform (value, ...fns) {
  return fns.reduce((acc, fn) => fn(acc), value)
}

export function coordsMatch (coord1, coord2) {
  return coord1.x === coord2.x && coord1.y === coord2.y
}

export function angleFromPoints (coord1, coord2) {
  return Math.atan2(coord2.x - coord1.x, coord2.y - coord1.y)
}

export function gradientFromPoints (co1, co2) {
  return (co2.y - co1.y) / (co2.x - co1.x)
}

export function distanceFromPoints (co1, co2) {
  return Math.sqrt((co2.x - co1.x) ** 2 + (co2.y - co1.y) ** 2)
}

export function lineLimit (line, from, to) {
  let start = {
    x: from.x,
    y: line({x: from.x})
  }

  if (start.y < from.y || !onlyContains(start, 'number')) {
    start = {
      y: from.y,
      x: line({y: from.y})
    }
  }

  let end = {
    x: to.x,
    y: line({x: to.x})
  }

  if (end.y > to.y || !onlyContains(end, 'number')) {
    end = {
      y: to.y,
      x: line({y: to.y})
    }
  }
  
  return {
    start, 
    end
  }
}

export function radiansToDegrees (rads) {
  return rads * (180 / Math.PI)
}

export function onlyContains (obj, types) {
  const values = Object.values(obj)

  for (const value of values) {
    if (typeof value !== types) return false
  }

  return true
}

export function gradientToRadians (gradient) {
  return Math.atan2(1 * gradient, 1)
}

export function radiansToGradient (radians) {
  return Math.tan(radians)
}

export function mapCoord (co, startProportions, endProportions) {
  return new Coord(
    (co.x / startProportions.width) * endProportions.width,
    (co.y / startProportions.height) * endProportions.height
  )
}

export function setOrigin (co, origin) {
  return new Coord(
    co.x - origin.x,
    co.y - origin.y
  )
}

export function midPoint (co1, co2) {
  return new Coord(
    co1.x + (co2.x - co1.x) / 2,
    co1.y + (co2.y - co1.y) / 2
  )
}

export function applyScrollToCoord (co) {
  return new Coord(
    co.x + window.pageXOffset,
    co.y + window.pageYOffset
  )
}

export function pageCoordFromEvent (e) {
  return new Coord(
    e.pageX,
    e.pageY
  )
}

export function translateCoord (coord, translate) {
  return new Coord(
    coord.x + (translate.x || 0),
    coord.y + (translate.y || 0)
  )
}

export function numIsNan (num) {
  return num != num
}

export function directionFromPoints (p1, p2) {
  const dP = p2 - p1
  return dP === 0 ? 0 : dP > 0 ? 1 : -1
}

class RGB {
  constructor (r, g, b, a) {
    this.r = r
    this.g = g
    this.b = b
    this.a = typeof a === 'number' ? a : 1
  }
  toString () {
    return this.a === 1 
      ? `rgb(${this.r},${this.g},${this.b})` 
      : `rgba(${this.r},${this.g},${this.b}, ${this.a})`
  }
}

export function rgb (...args) {
  // Combine an alpha with an instance
  if (args[0] instanceof RGB) {
    const [Rgb, alpha] = args
    if (typeof alpha === 'number') {
      return new RGB(Rgb.r, Rgb.g, Rgb.b, Rgb.a * alpha)
    } else {
      return Rgb
    }
  }
  // Will try to turn fricking anything into an rgb
  if (args.length <= 2 && typeof args[0] === 'string') {
    if (args[0].includes('#')) {
      // This must be a hex code string
      const [hex, alpha] = args
      const {r, g, b} = hexToRgb(hex)

      // This is the only one we know we don't have to try and combine alphas
      return new RGB(r, g, b, alpha)
    } else if (Array.isArray(args[0])) {
      const [rgba, alpha] = args
      let [r, g, b, a] = rgba
      if (a && alpha) {
        // There is an alpha in the array and in the arg. We have to combine
        a *= alpha
      }
      return new RGB(r, g, b, a)
    } else if (typeof args[0] === 'object' && args[0] !== null) {
      const [rgba, alpha] = args
      let {r, g, b, a} = rgba
      if (a && alpha) {
        // There is an alpha in the array and in the arg. We have to combine
        a *= alpha
      }
      return new RGB(r, g, b, a)
    } else {
      // This must be a rgb string
      const [rgba, alpha] = args
      let [r, g, b, a] = rgba.replace(/[^\d,]/g, '').split(',')
      if (a && alpha) {
        a *= alpha
      }
      return new RGB(r, g, b, a)
    }
  }

  if (args.length > 2) {
    return new RGB(...args)
  }
}

export function hexToRgb (hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : {r: 0, g: 0, b: 0}
}
