//
//  Libraries
//
const express = require('express')
const { format } = require('date-fns')
//
//  Components
//
const myCorsLocLoc6 = require('../myCors/myCorsLocLoc6')
const myRouterLocLoc6 = require('../myRouter/myRouterLocLoc6')
//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
const moduleName = 'serverLocLoc6'
//
// Constants
//
const { PORT_LOC_LOC6 } = require('../constants.js')
//
// Express
//
const app = express()
app.use(express.json())
//
//  Cors Middleware
//
app.options('*', myCorsLocLoc6)
app.use(myCorsLocLoc6)
//
//  Router
//
app.use(myRouterLocLoc6)
//..............................................................................
//.  Start Server
//.............................................................................
const TimeStamp = format(new Date(), 'yyLLddHHmmss')
let logMessage = `Server.. ${logCounter} Time:${TimeStamp} Module(${moduleName}) running on PORT(${PORT_LOC_LOC6})`
app.listen(PORT_LOC_LOC6, () => console.log(logMessage))
