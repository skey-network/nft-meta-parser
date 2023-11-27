import type {
  Go2NFTTokenV1Meta,
  Metadata,
  SkeyBoxCertV1Meta,
  SkeyNetworkDeviceKeyV1Meta,
  SkeyTixPoapV1Meta,
  SkeyTixTicketV1Meta,
} from './types'

export type SerializerFunc<T extends Metadata> = (data: T['data']) => string

export const skeyNetworkDeviceKeyV1Serializer: SerializerFunc<
  SkeyNetworkDeviceKeyV1Meta
> = (meta) => {
  return `s01_${meta.deviceAddress}_${meta.validTo}`
}

export const go2nftTokenV1Serializer: SerializerFunc<Go2NFTTokenV1Meta> = (
  data,
) => {
  return `g01_${data.cid}`
}

export const skeyTixTicketV1Serializer: SerializerFunc<SkeyTixTicketV1Meta> = (
  data,
) => {
  const globalId = data.globalId.toString().padStart(18, '0')

  return `tt1_${data.issuer}_${globalId}_${data.meta || 'NOMETA'}`
}

export const skeyTixPoapV1Serializer: SerializerFunc<SkeyTixPoapV1Meta> = (
  data,
) => {
  return `tp1_${data.cid}`
}

export const skeyBoxCertV1Serializer: SerializerFunc<SkeyBoxCertV1Meta> = (
  data,
) => {
  return `b01_${JSON.stringify(data)}`
}
