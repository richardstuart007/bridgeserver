//
//  Libraries
//
const express = require('express')
const { format } = require('date-fns')
//
//  Components
//
const myCorsLocRem2 = require('../myCors/myCorsLocRem2')
const myRouterLocRem2 = require('../myRouter/myRouterLocRem2')
//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
const moduleName = 'serverLocRem2'
//
// Constants
//
const { PORT_LOC_REM2 } = require('../constants.js')
//
// Express
//
const app = express()
app.use(express.json())
//
//  Cors Middleware
//
app.options('*', myCorsLocRem2)
app.use(myCorsLocRem2)
//
//  Router
//
app.use(myRouterLocRem2)
//..............................................................................
//.  Start Server
//.............................................................................
const TimeStamp = format(new Date(), 'yyLLddHHmmss')
let logMessage = `Server.. ${logCounter} Time:${TimeStamp} Module(${moduleName}) running on PORT(${PORT_LOC_REM2})`
app.listen(PORT_LOC_REM2, () => console.log(logMessage))
