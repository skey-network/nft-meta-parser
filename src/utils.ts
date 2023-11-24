export const getPrefixAndMeta = (
  src: string,
): [string, string] | [null, null] => {
  if (!src || typeof src !== 'string' || src.length < 5) return [null, null]

  const prefix = src.slice(0, 3)
  const meta = src.slice(4)

  return [prefix, meta]
}

export const tryParseJSON = (obj: any) => {
  try {
    return JSON.parse(obj)
  } catch {
    return null
  }
}
