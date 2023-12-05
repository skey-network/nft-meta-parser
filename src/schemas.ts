import * as parsers from './parsers'
import * as serializers from './serializers'
import { Metadata } from './types'

export interface SchemaItem<T extends Metadata = Metadata> {
  prefix: string
  parser: parsers.ParserFunc
  serializer: serializers.SerializerFunc<any>
  base: T['base']
}

export const SCHEMAS: Readonly<SchemaItem[]> = Object.freeze([
  {
    prefix: 's01',
    parser: parsers.skeyNetworkDeviceKeyV1Parser,
    serializer: serializers.skeyNetworkDeviceKeyV1Serializer,
    base: {
      project: 'skey-network',
      type: 'device-key',
      version: 1,
    },
  },
  {
    prefix: 'g01',
    parser: parsers.go2nftTokenV1Parser,
    serializer: serializers.go2nftTokenV1Serializer,
    base: {
      project: 'go2nft',
      type: 'token',
      version: 1,
    },
  },
  {
    prefix: 'tt1',
    parser: parsers.skeyTixTicketV1Parser,
    serializer: serializers.skeyTixTicketV1Serializer,
    base: {
      project: 'skey-tix',
      type: 'ticket',
      version: 1,
    },
  },
  {
    prefix: 'tp1',
    parser: parsers.skeyTixPoapV1Parser,
    serializer: serializers.skeyTixPoapV1Serializer,
    base: {
      project: 'skey-tix',
      type: 'poap',
      version: 1,
    },
  },
  {
    prefix: 'b01',
    parser: parsers.skeyBoxCertV1Parser,
    serializer: serializers.skeyBoxCertV1Serializer,
    base: {
      project: 'skey-box',
      type: 'cert',
      version: 1,
    },
  },
  {
    prefix: 'g02',
    parser: parsers.go2nftTokenV2Parser,
    serializer: serializers.go2nftTokenV2Serializer,
    base: {
      project: 'go2nft',
      type: 'token',
      version: 2,
    },
  },
])

export const getSchemaByPrefix = (prefix: string) =>
  SCHEMAS.find((s) => s.prefix === prefix) ?? null

export const getSchemaByBase = (search: Metadata['base']) =>
  SCHEMAS.find(
    ({ base }) =>
      base.project === search.project &&
      base.type === search.type &&
      base.version === search.version,
  ) ?? null
