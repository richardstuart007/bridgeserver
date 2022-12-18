//
//  Libraries
//
const express = require('express')
const { format } = require('date-fns')
//
//  Components
//
const myCorsRemote2 = require('../myCors/myCorsRemote2')
const myRouterRemote2 = require('../myRouter/myRouterRemote2')
//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
const moduleName = 'serverRemote2'
//
// Constants
//
const { PORT_REM_REM2 } = require('../constants.js')
//
// Express
//
const app = express()
app.use(express.json())
//
//  Cors Middleware
//
app.options('*', myCorsRemote2)
app.use(myCorsRemote2)
//
//  Router
//
app.use(myRouterRemote2)
//..............................................................................
//.  Start Server
//.............................................................................
const TimeStamp = format(new Date(), 'yyLLddHHmmss')
let logMessage = `Server.. ${logCounter} Time:${TimeStamp} Module(${moduleName}) running on PORT(${PORT_REM_REM2})`
app.listen(PORT_REM_REM2, () => console.log(logMessage))
