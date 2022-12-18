//
//  Libraries
//
const express = require('express')
const { format } = require('date-fns')
//
//  Components
//
const myCorsRemote1 = require('../myCors/myCorsRemote1')
const myRouterRemote1 = require('../myRouter/myRouterRemote1')
//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
const moduleName = 'serverRemote1'
//
// Constants
//
const { PORT_REM_REM1 } = require('../constants.js')
//
// Express
//
const app = express()
app.use(express.json())
//
//  Cors Middleware
//
app.options('*', myCorsRemote1)
app.use(myCorsRemote1)
//
//  Router
//
app.use(myRouterRemote1)
//..............................................................................
//.  Start Server
//.............................................................................
const TimeStamp = format(new Date(), 'yyLLddHHmmss')
let logMessage = `Server.. ${logCounter} Time:${TimeStamp} Module(${moduleName}) running on PORT(${PORT_REM_REM1})`
app.listen(PORT_REM_REM1, () => console.log(logMessage))
