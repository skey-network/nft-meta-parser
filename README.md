## @skeynetwork/nft-meta-parser

### Usage

```sh
yarn add @skeynetwork/nft-meta-parser
```

```typescript
import {
  parse,
  serialize,
  parseOrThrow,
  serializeOrThrow,
} from '@skeynetwork/nft-meta-parser'

console.log(parse('s01_3K9nvpwZaPYkSeY1XPegSQZvX4q8QnC6vT1_1700750378746'))

// {
//   base: {
//     project: 'skey-network',
//     type: 'device-key',
//     version: 1,
//   },
//   data: {
//     deviceAddress: '3K9nvpwZaPYkSeY1XPegSQZvX4q8QnC6vT1',
//     validTo: 1700750378746,
//   },
// }

console.log(
  serialize({
    base: {
      project: 'go2nft',
      type: 'token',
      version: 1,
    },
    data: {
      cid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
    },
  }),
)

// g01_QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
```

### Compatible NFTs

- SkeyNetwork device key
- Go2NFT token
- SkeyBox certificate
- SkeyTix ticket
- SkeyTix occasional NFT

### Base format description

`xyz_*`

- `x` - Project identifier (lowercase ascii letter)
- `y` - Nft type identifier (digit or lowercase ascii letter). Specific to project.
- `z` - Content schema version. Specific to nft type.
- `_` - Constant character
- `*` - Rest of metadata (any characters, any length)

##### Example

`v23_myNFTName_42` - Project v, nft type 2, schema version 3, metadata `myNFTName_42`

### Known schemas

- `s01` - SkeyNetwork device key (version 1)
- `g01` - Go2NFT token (version 1)
- `b01` - SkeyBox certificate (version 1)
- `tt1` - SkeyTix ticket (version 1)
- `tp1` - SkeyTix occasional NFT (version 1)

### Special cases

- `<address>_<timestamp>` - is treated as `s01`
- `1_<cid>` - is treated as `g01`

### Interfaces

<!-- INTERFACES_START -->
```typescript
export interface BaseMeta {
  base: {
    project: string
    type: string
    version: number
  }
  data: Record<string, any>
}

// s01_<address>_<timestamp> OR <address>_<timestamp>
export interface SkeyNetworkDeviceKeyV1Meta extends BaseMeta {
  base: {
    project: 'skey-network'
    type: 'device-key'
    version: 1
  }
  data: {
    deviceAddress: string
    validTo: number
  }
}

// g01_<cid> OR 1_<cid>
export interface Go2NFTTokenV1Meta extends BaseMeta {
  base: {
    project: 'go2nft'
    type: 'token'
    version: 1
  }
  data: {
    cid: string
  }
}

// tt1_<issuer>_<globalId>_<metadata | NOMETA>
export interface SkeyTixTicketV1Meta extends BaseMeta {
  base: {
    project: 'skey-tix'
    type: 'ticket'
    version: 1
  }
  data: {
    issuer: string
    globalId: number
    meta: string | null
  }
}

// tp1_<cid>
export interface SkeyTixPoapV1Meta extends BaseMeta {
  base: {
    project: 'skey-tix'
    type: 'poap'
    version: 1
  }
  data: {
    cid: string
  }
}

// b01_<json(uid,companyName)>
export interface SkeyBoxCertV1Meta extends BaseMeta {
  base: {
    project: 'skey-box'
    type: 'cert'
    version: 1
  }
  data: {
    uid: string
    companyName: string
  }
}

export type Metadata =
  | SkeyNetworkDeviceKeyV1Meta
  | Go2NFTTokenV1Meta
  | SkeyTixTicketV1Meta
  | SkeyTixPoapV1Meta
  | SkeyBoxCertV1Meta

```
<!-- INTERFACES_END -->
