//
//  Libraries
//
const express = require('express')
const { format } = require('date-fns')
//
//  Components
//
const myCorsLocRem1 = require('../myCors/myCorsLocRem1')
const myRouterLocRem1 = require('../myRouter/myRouterLocRem1')
//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
const moduleName = 'serverLocRem1'
//
// Constants
//
const { PORT_LOC_REM1 } = require('../constants.js')
//
// Express
//
const app = express()
app.use(express.json())
//
//  Cors Middleware
//
app.options('*', myCorsLocRem1)
app.use(myCorsLocRem1)
//
//  Router
//
app.use(myRouterLocRem1)
//..............................................................................
//.  Start Server
//.............................................................................
const TimeStamp = format(new Date(), 'yyLLddHHmmss')
let logMessage = `Server.. ${logCounter} Time:${TimeStamp} Module(${moduleName}) running on PORT(${PORT_LOC_REM1})`
app.listen(PORT_LOC_REM1, () => console.log(logMessage))
