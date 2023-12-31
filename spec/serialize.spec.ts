import { expect } from 'chai'
import { Metadata } from '../src/types'
import { serialize } from '../src/main'

interface TestCase {
  name: string
  input: Metadata
  expected: string | null
}

const cases: TestCase[] = [
  {
    name: 'skey network valid device key',
    input: {
      base: {
        project: 'skey-network',
        type: 'device-key',
        version: 1,
      },
      data: {
        deviceAddress: '3K9nvpwZaPYkSeY1XPegSQZvX4q8QnC6vT1',
        validTo: 1700750378746,
      },
    },
    expected: 's01_3K9nvpwZaPYkSeY1XPegSQZvX4q8QnC6vT1_1700750378746',
  },
  {
    name: 'go2nft token',
    input: {
      base: {
        project: 'go2nft',
        type: 'token',
        version: 1,
      },
      data: {
        cid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
      },
    },
    expected: 'g01_QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
  },
  {
    name: 'skey tix ticket',
    input: {
      base: {
        project: 'skey-tix',
        type: 'ticket',
        version: 1,
      },
      data: {
        issuer: '3EFsvy4XVtr9LbCKz96Bs6kKhhH3Wt4Y1eo',
        globalId: 261,
        meta: 'hello_there',
      },
    },
    expected:
      'tt1_3EFsvy4XVtr9LbCKz96Bs6kKhhH3Wt4Y1eo_000000000000000261_hello_there',
  },
  {
    name: 'skey tix ticket NOMETA',
    input: {
      base: {
        project: 'skey-tix',
        type: 'ticket',
        version: 1,
      },
      data: {
        issuer: '3EFsvy4XVtr9LbCKz96Bs6kKhhH3Wt4Y1eo',
        globalId: 261,
        meta: null,
      },
    },
    expected:
      'tt1_3EFsvy4XVtr9LbCKz96Bs6kKhhH3Wt4Y1eo_000000000000000261_NOMETA',
  },
  {
    name: 'skey tix poap',
    input: {
      base: {
        project: 'skey-tix',
        type: 'poap',
        version: 1,
      },
      data: {
        cid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
      },
    },
    expected: 'tp1_QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
  },
  {
    name: 'undefined',
    input: undefined as any,
    expected: null,
  },
  {
    name: 'empty object',
    input: {} as any,
    expected: null,
  },
  {
    name: 'other type',
    input: 13 as any,
    expected: null,
  },
  {
    name: 'skey box cert',
    input: {
      base: {
        project: 'skey-box',
        type: 'cert',
        version: 1,
      },
      data: {
        uid: '35d2168d-e0e2-41f5-8499-c071c292e44b',
        companyName: 'Moja firma testowa',
      },
    },
    expected:
      'b01_{"uid":"35d2168d-e0e2-41f5-8499-c071c292e44b","companyName":"Moja firma testowa"}',
  },
  {
    name: 'go2nft v2 format',
    input: {
      base: {
        project: 'go2nft',
        type: 'token',
        version: 2,
      },
      data: {
        issuer: '3MLmZi9qNH24qyTLmMAM1BWiBNtHqfpJ8do',
        index: 11,
        cid: 'Qmae81NL7n7GievunBehrtqUpbwJjvouQE3cHYcN3GSaH1',
        tag: 'tag-12_3',
      },
    },
    expected:
      'g02_3MLmZi9qNH24qyTLmMAM1BWiBNtHqfpJ8do_11_Qmae81NL7n7GievunBehrtqUpbwJjvouQE3cHYcN3GSaH1_tag-12_3',
  },
  {
    name: 'go2nft v2 format (no tag)',
    input: {
      base: {
        project: 'go2nft',
        type: 'token',
        version: 2,
      },
      data: {
        issuer: '3M6Nn7fMcCFP7yRRZyvk1VtxrGVepwYrySv',
        index: 0,
        cid: 'Qmae81NL7n7GievunBehrtqUpbwJjvouQE3cHYcN3GSaH2',
        tag: null,
      },
    },
    expected:
      'g02_3M6Nn7fMcCFP7yRRZyvk1VtxrGVepwYrySv_0_Qmae81NL7n7GievunBehrtqUpbwJjvouQE3cHYcN3GSaH2_NOTAG',
  },
]

describe('Serialize', () => {
  for (const test of cases) {
    it(test.name, () => {
      expect(serialize(test.input)).eql(test.expected)
    })
  }
})
