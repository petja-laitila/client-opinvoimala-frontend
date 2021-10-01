/**
 * Credits to:
 * https://matthiashager.com/converting-snake-case-to-camel-case-object-keys-with-javascript
 */

/**
 * Transforms given string to camelCase
 */
export const toCamelCase = (s: string) => {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

/**
 * Tests if a given object is array
 */
export const isArray = function (a: any) {
  return Array.isArray(a);
};

/**
 * Tests if a given object is an actual object and not e.g. array
 */
export const isObject = function (o: any) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

/**
 * Recursively transforms object(s) keys to camelCase
 */
export const keysToCamelCase = function (object: any) {
  if (isObject(object)) {
    const objectCopy: any = {};

    Object.keys(object).forEach(key => {
      objectCopy[toCamelCase(key as string)] = keysToCamelCase(object[key]);
    });

    return objectCopy;
  } else if (isArray(object)) {
    return object.map((item: any) => {
      return keysToCamelCase(item);
    });
  }

  return object;
};
