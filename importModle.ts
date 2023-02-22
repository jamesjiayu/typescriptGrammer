import fnExp from './test'
import { expValue as aliasOfExpv, type Flatten } from './test'
fnExp()
console.log(aliasOfExpv)

const importCommonJS = require('./test') //sth wrong
console.log(importCommonJS.pi)
