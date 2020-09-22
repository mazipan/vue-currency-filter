const nativeMap = Array.prototype.map
const nativeIsArray = Array.isArray
const toString = Object.prototype.toString

export function __isNull(obj: any): boolean {
  return typeof obj === 'undefined' || obj === null
};

export function __isString(obj: any): boolean {
  return !!(obj === '' || (obj && obj.charCodeAt && obj.substr))
};

export function __isArray(obj: any): boolean {
  return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]'
};

export function __isObject(obj: any): boolean {
  return obj && toString.call(obj) === '[object Object]'
};

export function __defaults(object, defs) {
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
};

export function __map(obj, iterator, context?) {
  if (!obj) return []
  // Use native .map method if it exists:
  if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context)

  const results = []
  let i = 0
  let j = 0
  // Fallback for native .map:
  for (i = 0, j = obj.length; i < j; i++) {
    // @ts-ignore
    results[i] = iterator.call(context, obj[i], i, obj)
  }
  return results
}
