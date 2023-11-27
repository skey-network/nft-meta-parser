import { ADDRESS_REGEX, CID_REGEX } from './constants'

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

export const replacers: ReplacerFunc[] = [
  skeyNetworkDeviceKeyReplacer,
  go2NFTTokenReplacer,
  skeyTixTicketReplacer,
]
