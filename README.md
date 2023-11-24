## nft-meta-parser

### Compatible NFTs

- SkeyNetwork device key
- Go2NFT token
- SkeyBox certificate TODO
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

### Known schemes

- `s01` - SkeyNetwork device key (version 1)
- `g01` - Go2NFT token (version 1)
- `b01` - SkeyBox certificate (version 1)
- `tt1` - SkeyTix ticket (version 1)
- `tp1` - SkeyTix occasional NFT (version 1)

### Special cases

- `<address>_<timestamp>` - is treated as `s01`
- `1_<cid>` - is treated as `g01`
