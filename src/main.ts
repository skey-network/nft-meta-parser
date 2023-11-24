import { replacers } from './replacers'
import { getSchemaByBase, getSchemaByPrefix } from './schemas'
import { Metadata } from './types'
import { getPrefixAndMeta, replaceText } from './utils'

export const parse = (input: string): Metadata | null => {
  if (!input || typeof input !== 'string') return null

  input = replaceText(input, replacers)

  const [prefix, meta] = getPrefixAndMeta(input)
  if (!prefix) return null

  const schema = getSchemaByPrefix(prefix)
  if (!schema) return null

  const data = schema.parser(meta)
  if (!data) return null

  return { base: schema.base, data } as any
}

export const serialize = <T extends Metadata>(input: T): string | null => {
  if (typeof input !== 'object') return null
  if (!input.base || !input.data) return null

  const schema = getSchemaByBase(input.base)
  if (!schema) return null

  return schema.serializer(input.data)
}

export const parseOrThrow = (input: string): Metadata => {
  const result = parse(input)

  if (!result) throw new Error(`Failed to parse ${input}`)

  return result
}

export const serializeOrThrow = <T extends Metadata>(input: T): string => {
  const result = serialize(input)

  if (!result) throw new Error('Failed to serialize object')

  return result
}
