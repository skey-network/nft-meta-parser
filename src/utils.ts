export const getPrefixAndMeta = (
  src: string,
): [string, string] | [null, null] => {
  if (!src || typeof src !== 'string' || src.length < 5) return [null, null]

  const prefix = src.slice(0, 3)
  const meta = src.slice(4)

  return [prefix, meta]
}

export const tryParseJSON = (str: string) => {
  try {
    return JSON.parse(str)
  } catch {
    return null
  }
}

export const replaceText = (
  text: string,
  replacers: ((text: string) => string)[],
) => {
  for (const func of replacers) {
    text = func(text)
  }

  return text
}
