## nft-meta-parser

### Usage

```sh
yarn add nft-meta-parser
```

```typescript
import { parse, serialize } from 'nft-meta-parser'

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
<!-- TODO -->
<!-- INTERFACES_END -->
