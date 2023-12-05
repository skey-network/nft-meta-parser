import { expect } from 'chai'
import { Metadata } from '../src/types'
import { parse } from '../src/main'

interface TestCase {
  name: string
  input: string
  expected: Metadata | null
}

const cases: TestCase[] = [
  {
    name: 'skey network valid device key',
    input: 's01_3K9nvpwZaPYkSeY1XPegSQZvX4q8QnC6vT1_1700750378746',
    expected: {
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
  },
  {
    name: 'skey network old format valid device key',
    input: '3K79VLyVoUqXeSkm6ELPyNmSN658J3hrE7h_42',
    expected: {
      base: {
        project: 'skey-network',
        type: 'device-key',
        version: 1,
      },
      data: {
        deviceAddress: '3K79VLyVoUqXeSkm6ELPyNmSN658J3hrE7h',
        validTo: 42,
      },
    },
  },
  {
    name: 'go2nft token',
    input: 'g01_QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
    expected: {
      base: {
        project: 'go2nft',
        type: 'token',
        version: 1,
      },
      data: {
        cid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
      },
    },
  },
  {
    name: 'go2nft token old format',
    input: '1_QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n',
    expected: {
      base: {
        project: 'go2nft',
        type: 'token',
        version: 1,
      },
      data: {
        cid: 'QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n',
      },
    },
  },
  {
    name: 'skey tix ticket',
    input:
      'tt1_3EFsvy4XVtr9LbCKz96Bs6kKhhH3Wt4Y1eo_000000000000000261_hello_there',
    expected: {
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
  },
  {
    name: 'skey tix ticket NOMETA',
    input: 'tt1_3EFsvy4XVtr9LbCKz96Bs6kKhhH3Wt4Y1eo_000000000000000261_NOMETA',
    expected: {
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
  },
  {
    name: 'skey tix poap',
    input: 'tp1_QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
    expected: {
      base: {
        project: 'skey-tix',
        type: 'poap',
        version: 1,
      },
      data: {
        cid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR',
      },
    },
  },
  {
    name: 'undefined',
    input: undefined as any,
    expected: null,
  },
  {
    name: 'empty',
    input: '',
    expected: null,
  },
  {
    name: 'other type',
    input: 13 as any,
    expected: null,
  },
  {
    name: 'invalid string',
    input: '7byg0fdsbj&^%89$dfv348jh4tiukjvnfds903',
    expected: null,
  },
  {
    name: 'skey box cert',
    input:
      'b01_{"uid":"35d2168d-e0e2-41f5-8499-c071c292e44b","companyName":"Moja firma testowa"}',
    expected: {
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
  },
  {
    name: 'skey tix ticket old format',
    input: 'v1_3KHCCUAKVMQ5A3DsEK9exmzSkSVh8PEmxku_000000222000000261_{}{}{}{}',
    expected: {
      base: {
        project: 'skey-tix',
        type: 'ticket',
        version: 1,
      },
      data: {
        issuer: '3KHCCUAKVMQ5A3DsEK9exmzSkSVh8PEmxku',
        globalId: 222000000261,
        meta: '{}{}{}{}',
      },
    },
  },
  {
    name: 'skey box old format',
    input:
      '{"uid":"7ed9a4f7-7f7d-44fe-b427-3fab1c4dbc0b","companyName":"elo elo 3 2 0"}',
    expected: {
      base: {
        project: 'skey-box',
        type: 'cert',
        version: 1,
      },
      data: {
        uid: '7ed9a4f7-7f7d-44fe-b427-3fab1c4dbc0b',
        companyName: 'elo elo 3 2 0',
      },
    },
  },
  {
    name: 'skey tix poap old format',
    input:
      'Wszyscy obecni\nipfs:Qmae81NL7n7GievunBehrtqUpbwJjvouQE3cHYcN3GSaH1',
    expected: {
      base: {
        project: 'skey-tix',
        type: 'poap',
        version: 1,
      },
      data: {
        cid: 'Qmae81NL7n7GievunBehrtqUpbwJjvouQE3cHYcN3GSaH1',
      },
    },
  },
  {
    name: 'skey tix poap old format (should not match if has prefix)',
    input:
      'ee2_Wszyscy obecni\nipfs:Qmae81NL7n7GievunBehrtqUpbwJjvouQE3cHYcN3GSaH1',
    expected: null,
  },
  {
    name: 'go2nft v2 format',
    input:
      'g02_3MLmZi9qNH24qyTLmMAM1BWiBNtHqfpJ8do_11_Qmae81NL7n7GievunBehrtqUpbwJjvouQE3cHYcN3GSaH1_tag-12_3',
    expected: {
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
  },
  {
    name: 'go2nft v2 format (no tag)',
    input:
      'g02_3M6Nn7fMcCFP7yRRZyvk1VtxrGVepwYrySv_0_Qmae81NL7n7GievunBehrtqUpbwJjvouQE3cHYcN3GSaH2_NOTAG',
    expected: {
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
  },
]

describe('Parse', () => {
  for (const test of cases) {
    it(test.name, () => {
      expect(parse(test.input)).eql(test.expected)
    })
  }
})
