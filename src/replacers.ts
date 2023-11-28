import { ADDRESS_REGEX, CID_REGEX, PREFIX_REGEX } from './constants'
import { tryParseJSON } from './utils'

export type ReplacerFunc = (src: string) => string

export const skeyNetworkDeviceKeyReplacer: ReplacerFunc = (src) => {
  const regex = new RegExp(`^${ADDRESS_REGEX}_\\d{1,16}$`)
  if (!regex.test(src)) return src

  return `s01_${src}`
}

export const go2NFTTokenReplacer: ReplacerFunc = (src) => {
  const regex = new RegExp(`^1_${CID_REGEX}$`)
  if (!regex.test(src)) return src

  const [_, cid] = src.split('_')

  return `g01_${cid}`
}

export const skeyTixTicketReplacer: ReplacerFunc = (src) => {
  const regex = new RegExp(`^v1_${ADDRESS_REGEX}_\\d{18}_.`)
  if (!regex.test(src)) return src

  return src.replace('v1_', 'tt1_')
}

export const skeyBoxCertReplacer: ReplacerFunc = (src) => {
  const parsed = tryParseJSON(src)
  if (!parsed) return src

  if (
    typeof parsed.companyName !== 'string' ||
    typeof parsed.uid !== 'string'
  ) {
    return src
  }

  return `b01_${src}`
}

export const skeyTixPoapReplacer: ReplacerFunc = (src) => {
  const prefixRegex = new RegExp(`^${PREFIX_REGEX}.`)
  const cidRegex = new RegExp(`\\nipfs:${CID_REGEX}$`, 'gm')

  if (prefixRegex.test(src) || !cidRegex.test(src)) return src

  const matches = src.match(cidRegex)
  if (!matches || matches.length !== 1) return src

  const cid = matches[0].replace('\nipfs:', '')

  return `tp1_${cid}`
}

export const replacers: ReplacerFunc[] = [
  skeyNetworkDeviceKeyReplacer,
  go2NFTTokenReplacer,
  skeyTixTicketReplacer,
  skeyBoxCertReplacer,
  skeyTixPoapReplacer,
]
