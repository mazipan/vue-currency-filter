const nativeMap = Array.prototype.map,
  nativeIsArray = Array.isArray,
  toString = Object.prototype.toString

export default {
  __isNull(obj) {
    return typeof obj === 'undefined' || obj === null
  },
  __isString(obj) {
    return !!(obj === '' || (obj && obj.charCodeAt && obj.substr))
  },
  __isArray(obj) {
    return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]'
  },
  __isObject(obj) {
    return obj && toString.call(obj) === '[object Object]'
  },
  __defaults(object, defs) {
    var key
    object = object || {}
    defs = defs || {}
    // Iterate over object non-prototype properties:
    for (key in defs) {
      if (defs.hasOwnProperty(key)) {
        // Replace values with defaults only if undefined (allow empty/zero values):
        if (object[key] == null) object[key] = defs[key]
      }
    }
    return object
  },
  __map(obj, iterator, context) {
    var results = [],
      i, j

    if (!obj) return results

    // Use native .map method if it exists:
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context)

    // Fallback for native .map:
    for (i = 0, j = obj.length; i < j; i++) {
      results[i] = iterator.call(context, obj[i], i, obj)
    }
    return results
  }
}