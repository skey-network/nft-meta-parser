import { ADDRESS_REGEX, CID_REGEX, UUID_REGEX } from './constants'
import type { Metadata } from './types'
import { tryParseJSON } from './utils'

export type ParserFunc = (src: string) => Metadata['data'] | null

export const skeyNetworkDeviceKeyV1Parser: ParserFunc = (src) => {
  const regex = new RegExp(`^${ADDRESS_REGEX}_\\d{1,16}$`)
  if (!regex.test(src)) return null

  const [deviceAddress, validTo] = src.split('_')

  return { deviceAddress, validTo: Number(validTo) }
}

export const go2nftTokenV1Parser: ParserFunc = (src) => {
  const regex = new RegExp(`^${CID_REGEX}$`)
  if (!regex.test(src)) return null

  return { cid: src }
}

export const skeyTixTicketV1Parser: ParserFunc = (src) => {
  const regex = new RegExp(`^${ADDRESS_REGEX}_\\d{18}_.`)
  if (!regex.test(src)) return null

  const [issuer, globalId, ...rest] = src.split('_')

  const additional =
    rest.length === 1 && rest[0] === 'NOMETA' ? null : rest.join('_')

  return {
    issuer,
    globalId: Number(globalId),
    meta: additional,
  }
}

export const skeyTixPoapV1Parser: ParserFunc = (src) => {
  const regex = new RegExp(`^${CID_REGEX}$`)
  if (!regex.test(src)) return null

  return { cid: src }
}

export const skeyBoxCertV1Parser: ParserFunc = (src) => {
  const obj: { uid: string; companyName: string } = tryParseJSON(src)
  if (!obj) return null

  if (!new RegExp(`^${UUID_REGEX}$`).test(obj.uid)) return null
  if (!obj.companyName || typeof obj.companyName !== 'string') return null

  return {
    uid: obj.uid,
    companyName: obj.companyName,
  }
}

export const go2nftTokenV2Parser: ParserFunc = (src) => {
  const regex = new RegExp(`^${ADDRESS_REGEX}_\\d*_${CID_REGEX}_*`)
  if (!regex.test(src)) return null

  const [issuer, index, cid, ...rest] = src.split('_')
  const tag = rest.join('_')

  return {
    issuer,
    index: Number(index),
    cid,
    tag: tag === 'NOTAG' ? null : tag,
  }
}
