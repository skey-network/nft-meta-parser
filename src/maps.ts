import {
  ParserFunc,
  go2nftTokenV1Parser,
  skeyBoxCertV1Parser,
  skeyNetworkDeviceKeyV1Parser,
  skeyTixPoapV1Parser,
  skeyTixTicketV1Parser,
} from './parsers'

export const PREFIX_PARSER_MAP: Record<string, ParserFunc> = Object.freeze({
  g01: go2nftTokenV1Parser,
  s01: skeyNetworkDeviceKeyV1Parser,
  tt1: skeyTixTicketV1Parser,
  tp1: skeyTixPoapV1Parser,
  b01: skeyBoxCertV1Parser,
})
