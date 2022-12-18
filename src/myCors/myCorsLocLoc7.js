const myCorsLocLoc7 = require('cors')
const debugLog = false
//
// Whitelist of valid hosts
//
const { CORS_WHITELIST_SRVLOC_DBLOC7 } = require('../constants.js')
//
//  Cors options
//
const corsOptions = {
  origin: CORS_WHITELIST_SRVLOC_DBLOC7,
  optionsSuccessStatus: 200,
  methods: ['POST', 'DELETE', 'OPTIONS']
}
if (debugLog) console.log('corsOptions ', corsOptions)

module.exports = myCorsLocLoc7(corsOptions)
