import * as fs from 'node:fs'

const readme = fs.readFileSync('README.md', 'utf8')
const content = fs.readFileSync('src/types.ts')

const prefix = '<!-- INTERFACES_START -->'
const suffix = '<!-- INTERFACES_END -->'

const regex = new RegExp(`${prefix}(\\s|.)*${suffix}`, 'gm')
const templated = `${prefix}\n\`\`\`typescript\n${content}\n\`\`\`\n${suffix}`

fs.writeFileSync('README.md', readme.replace(regex, templated))
