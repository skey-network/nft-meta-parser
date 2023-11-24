interface BasePrefix {
  project: string
  type: string
  version: number
}

interface BaseMeta {
  base: BasePrefix
  data: Record<string, any>
}

// s01_<address>_<timestamp>
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

// g01_<cid>
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

// tt1_<issuer>_<globalId>_<metadata>
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

// tp1_<text>\nipfs:<cid>
export interface SkeyTixPoapV1Meta extends BaseMeta {
  base: {
    project: 'skey-tix'
    type: 'poap'
    version: 1
  }
  data: {
    description: string
    cid: string
  }
}

// b01_<json>
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
