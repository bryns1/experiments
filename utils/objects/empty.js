export default function empty (obj = {}) {
  if (Array.isArray(obj)) {
    return obj.length === 0
  }

  if (typeof obj === 'object' && obj !== null) {
    const keys = Object.keys(obj)
    return keys.length === 0
  }
}