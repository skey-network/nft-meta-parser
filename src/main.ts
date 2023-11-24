import { PREFIX_PARSER_MAP } from './maps'
import { replacers } from './replacers'
import { getPrefixAndMeta } from './utils'

export const parse = (src: string) => {
  if (!src || typeof src !== 'string') return null

  for (const replacer of replacers) {
    src = replacer(src)
  }

  const [prefix, meta] = getPrefixAndMeta(src)
  if (!prefix) return null

  const parser = PREFIX_PARSER_MAP[prefix]
  if (!parser) return null

  return parser(meta)
}
