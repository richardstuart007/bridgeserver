//
//  Libraries
//
const express = require('express')
const { format } = require('date-fns')
//
//  Components
//
const myCorsLocLoc7 = require('../myCors/myCorsLocLoc7')
const myRouterLocLoc7 = require('../myRouter/myRouterLocLoc7')
//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
const moduleName = 'serverLocLoc7'
//
// Constants
//
const { PORT_LOC_LOC7 } = require('../constants.js')
//
// Express
//
const app = express()
app.use(express.json())
//
//  Cors Middleware
//
app.options('*', myCorsLocLoc7)
app.use(myCorsLocLoc7)
//
//  Router
//
app.use(myRouterLocLoc7)
//..............................................................................
//.  Start Server
//.............................................................................
const TimeStamp = format(new Date(), 'yyLLddHHmmss')
let logMessage = `Server.. ${logCounter} Time:${TimeStamp} Module(${moduleName}) running on PORT(${PORT_LOC_LOC7})`
app.listen(PORT_LOC_LOC7, () => console.log(logMessage))
