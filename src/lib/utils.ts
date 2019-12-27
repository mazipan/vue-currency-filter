const nativeMap = Array.prototype.map
const nativeIsArray = Array.isArray
const toString = Object.prototype.toString

export default {
  __isNull (obj: any): boolean {
    return typeof obj === 'undefined' || obj === null
  },
  __isString (obj: any): boolean {
    return !!(obj === '' || (obj && obj.charCodeAt && obj.substr))
  },
  __isArray (obj: any): boolean {
    return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]'
  },
  __isObject (obj: any): boolean {
    return obj && toString.call(obj) === '[object Object]'
  },
  __defaults (object, defs) {
    var key
    object = object || {}
    defs = defs || {}
    // Iterate over object non-prototype properties:
    for (key in defs) {
      // eslint-disable-next-line no-prototype-builtins
      if (defs.hasOwnProperty(key)) {
        // Replace values with defaults only if undefined (allow empty/zero values):
        if (object[key] == null) object[key] = defs[key]
      }
    }
    return object
  },
  __map (obj, iterator, context?) {
    if (!obj) return []
    // Use native .map method if it exists:
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context)

    const results = []
    let i = 0
    let j = 0
    // Fallback for native .map:
    for (i = 0, j = obj.length; i < j; i++) {
      results[i] = iterator.call(context, obj[i], i, obj)
    }
    return results
  }
}
