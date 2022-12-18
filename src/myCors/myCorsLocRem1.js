const myCorsLocRem1 = require('cors')
const debugLog = true
//
// Whitelist of valid hosts
//
const { CORS_WHITELIST_SRVLOC_DBREM1 } = require('../constants.js')
//
//  Cors options
//
const corsOptions = {
  origin: CORS_WHITELIST_SRVLOC_DBREM1,
  optionsSuccessStatus: 200,
  methods: ['POST', 'DELETE', 'OPTIONS']
}
if (debugLog) console.log('corsOptions ', corsOptions)

module.exports = myCorsLocRem1(corsOptions)
