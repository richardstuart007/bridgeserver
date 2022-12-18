const myCorsLocRem2 = require('cors')
const debugLog = false
//
// Whitelist of valid hosts
//
const { CORS_WHITELIST_SRVLOC_DBREM2 } = require('../constants.js')
//
//  Cors options
//
const corsOptions = {
  origin: CORS_WHITELIST_SRVLOC_DBREM2,
  optionsSuccessStatus: 200,
  methods: ['POST', 'DELETE', 'OPTIONS']
}
if (debugLog) console.log('corsOptions ', corsOptions)

module.exports = myCorsLocRem2(corsOptions)
