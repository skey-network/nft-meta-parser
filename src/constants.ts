export const ADDRESS_REGEX = '[1-9A-HJ-NP-Za-km-z]{35}'

export const UUID_REGEX =
  '[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}'

export const CID_REGEX =
  'Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,}'

export const PREFIX_REGEX = '[a-z][a-z0-9]{2}_'
