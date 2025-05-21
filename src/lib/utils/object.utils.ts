type CamelizeKey<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Head}${Capitalize<CamelizeKey<Tail>>}`
  : S

type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${SnakeCase<U>}`
  : S

export type CamelizeDeep<T> = T extends readonly (infer U)[]
  ? CamelizeDeep<U>[]
  : T extends object
    ? { [K in keyof T as CamelizeKey<string & K>]: CamelizeDeep<T[K]> }
    : T

export type SnakeCaseDeep<T> = T extends readonly (infer U)[]
  ? SnakeCaseDeep<U>[]
  : T extends object
    ? { [K in keyof T as SnakeCase<string & K>]: SnakeCaseDeep<T[K]> }
    : T

export function keysToCamelCase<T>(obj: T): CamelizeDeep<T> {
  if (Array.isArray(obj)) {
    return obj.map(keysToCamelCase) as unknown as CamelizeDeep<T>
  } else if (obj !== null && typeof obj === 'object') {
    const result: Record<string, unknown> = {}
    for (const [key, val] of Object.entries(obj)) {
      const camelKey = key.replace(/[_-](\w)/g, (_: string, c: string) => c.toUpperCase())
      result[camelKey] = keysToCamelCase(val)
    }
    return result as CamelizeDeep<T>
  }
  return obj as CamelizeDeep<T>
}

export function keysToSnakeCase<T>(obj: T): SnakeCaseDeep<T> {
  if (Array.isArray(obj)) {
    return obj.map(keysToSnakeCase) as unknown as SnakeCaseDeep<T>
  } else if (obj !== null && typeof obj === 'object') {
    const result: Record<string, unknown> = {}
    for (const [key, val] of Object.entries(obj)) {
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
      result[snakeKey] = keysToSnakeCase(val)
    }
    return result as SnakeCaseDeep<T>
  }
  return obj as SnakeCaseDeep<T>
}
