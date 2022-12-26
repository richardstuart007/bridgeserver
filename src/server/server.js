//
//  Libraries
//
const express = require('express')
const myRouter = express.Router()
const knex = require('knex')
const { format } = require('date-fns')
const process = require('node:process')
const myCors = require('cors')
//
//  Components
//
const serverRaw = require('../controllers/serverRaw')
const serverRegister = require('../controllers/serverRegister')
const serverSignin = require('../controllers/serverSignin')
//.............................................................................
//.  Initialisation
//.............................................................................
const debugLog = true
//
//  Arguments
//
const Nodemodule = process.argv[0]
const script_path = process.argv[1]
const server_database = process.argv[2]
if (debugLog) console.log('Nodemodule ', Nodemodule)
if (debugLog) console.log('script_path ', script_path)
if (debugLog) console.log('server_database ', server_database)
//
//  Counter
//
let logCounter = 0
const moduleName = 'server'
// --------------------
// Express
// --------------------
const app = express()
app.use(express.json())
// --------------------
//  Cors Middleware
// --------------------
let CORS_WHITELIST
getWhiteList()
if (debugLog) console.log('CORS_WHITELIST ', CORS_WHITELIST)
const corsOptions = {
  origin: CORS_WHITELIST,
  optionsSuccessStatus: 200,
  methods: ['POST', 'DELETE', 'OPTIONS']
}
app.options('*', myCors(corsOptions))
app.use(myCors(corsOptions))
// --------------------
//  Router
// --------------------
app.use(myRouter)
// --------------------
// Knex
// --------------------
let KNEX_CLIENT
let KNEX_HOST
let KNEX_USER
let KNEX_PWD
let KNEX_DATABASE
let KNEX_PORT
getknexparams()
const db = knex({
  client: KNEX_CLIENT,
  connection: {
    host: KNEX_HOST,
    user: KNEX_USER,
    password: KNEX_PWD,
    database: KNEX_DATABASE,
    port: KNEX_PORT
  }
})
//
//  Log setup
//
console.log(
  `${moduleName} Database Connection==> Client(${KNEX_CLIENT}) host(${KNEX_HOST}) user(${KNEX_USER}) database(${KNEX_DATABASE})`
)
//.............................................................................
// Routes
//.............................................................................
const { URL_SIGNIN, URL_TABLES, URL_REGISTER } = require('../constants.js')
// --------------------
//.  Routes - Tables
// --------------------
myRouter.post(URL_TABLES, (req, res) => {
  logRawTables(req, 'POST', 'RAW', 'serverRaw')
  serverRaw.serverRaw(req, res, db, logCounter)
})
myRouter.delete(URL_TABLES, (req, res) => {
  logRawTables(req, 'DELETE', 'RAW', 'serverRaw')
  serverRaw.serverRaw(req, res, db, logCounter)
})
// --------------------
//.  Routes - SignIn
// --------------------
myRouter.post(URL_SIGNIN, (req, res) => {
  logRawSignIn(req, 'POST Signin')
  serverSignin.serverSignin(req, res, db, logCounter)
})
// --------------------
//.  Routes - Register
// --------------------
myRouter.post(URL_REGISTER, (req, res) => {
  logRawSignIn(req, 'POST Register')
  serverRegister.serverRegister(req, res, db, logCounter)
})
//.............................................................................
//.  Start Server
//.............................................................................
let SERVERPORT
getServerPort()
const TimeStamp = format(new Date(), 'yyLLddHHmmss')
let logMessage = `Server.. ${logCounter} Time:${TimeStamp} Module(${moduleName}) running on PORT(${SERVERPORT})`
app.listen(SERVERPORT, () => console.log(logMessage))
//.............................................................................
//.  get the WhiteList
//.............................................................................
function getWhiteList() {
  const {
    CORS_WHITELIST_SRVREM_DB1,
    CORS_WHITELIST_SRVREM_DB2,
    CORS_WHITELIST_SRVLOC_DB1,
    CORS_WHITELIST_SRVLOC_DB2,
    CORS_WHITELIST_SRVLOC_DB6,
    CORS_WHITELIST_SRVLOC_DB7
  } = require('../constants.js')
  //
  //  Determimne the correct whitelist
  //
  switch (server_database) {
    case '01':
      CORS_WHITELIST = CORS_WHITELIST_SRVREM_DB1
      break
    case '02':
      CORS_WHITELIST = CORS_WHITELIST_SRVREM_DB2
      break
    case '11':
      CORS_WHITELIST = CORS_WHITELIST_SRVLOC_DB1
      break
    case '12':
      CORS_WHITELIST = CORS_WHITELIST_SRVLOC_DB2
      break
    case '16':
      CORS_WHITELIST = CORS_WHITELIST_SRVLOC_DB6
      break
    case '17':
      CORS_WHITELIST = CORS_WHITELIST_SRVLOC_DB7
      break
    default:
  }
}
//.............................................................................
//.  get the KNEX parameters
//.............................................................................
function getknexparams() {
  //
  // Database 1
  //
  const {
    KNEX_PORT1,
    KNEX_CLIENT1,
    KNEX_HOST1,
    KNEX_USER1,
    KNEX_PWD1,
    KNEX_DATABASE1
  } = require('../constants.js')
  //
  // Database 2
  //
  const {
    KNEX_PORT2,
    KNEX_CLIENT2,
    KNEX_HOST2,
    KNEX_USER2,
    KNEX_PWD2,
    KNEX_DATABASE2
  } = require('../constants.js')
  //
  // Database 6
  //
  const {
    KNEX_PORT6,
    KNEX_CLIENT6,
    KNEX_HOST6,
    KNEX_USER6,
    KNEX_PWD6,
    KNEX_DATABASE6
  } = require('../constants.js')
  //
  // Database 7
  //
  const {
    KNEX_PORT7,
    KNEX_CLIENT7,
    KNEX_HOST7,
    KNEX_USER7,
    KNEX_PWD7,
    KNEX_DATABASE7
  } = require('../constants.js')
  switch (server_database) {
    case '01':
      KNEX_CLIENT = KNEX_CLIENT1
      KNEX_HOST = KNEX_HOST1
      KNEX_USER = KNEX_USER1
      KNEX_PWD = KNEX_PWD1
      KNEX_DATABASE = KNEX_DATABASE1
      KNEX_PORT = KNEX_PORT1
      break
    case '02':
      KNEX_CLIENT = KNEX_CLIENT1
      KNEX_HOST = KNEX_HOST1
      KNEX_USER = KNEX_USER1
      KNEX_PWD = KNEX_PWD1
      KNEX_DATABASE = KNEX_DATABASE1
      KNEX_PORT = KNEX_PORT1
      break
    case '11':
      KNEX_CLIENT = KNEX_CLIENT1
      KNEX_HOST = KNEX_HOST1
      KNEX_USER = KNEX_USER1
      KNEX_PWD = KNEX_PWD1
      KNEX_DATABASE = KNEX_DATABASE1
      KNEX_PORT = KNEX_PORT1
      break
    case '12':
      KNEX_CLIENT = KNEX_CLIENT2
      KNEX_HOST = KNEX_HOST2
      KNEX_USER = KNEX_USER2
      KNEX_PWD = KNEX_PWD2
      KNEX_DATABASE = KNEX_DATABASE2
      KNEX_PORT = KNEX_PORT2
      break
    case '16':
      KNEX_CLIENT = KNEX_CLIENT6
      KNEX_HOST = KNEX_HOST6
      KNEX_USER = KNEX_USER6
      KNEX_PWD = KNEX_PWD6
      KNEX_DATABASE = KNEX_DATABASE6
      KNEX_PORT = KNEX_PORT6
      break
    case '17':
      KNEX_CLIENT = KNEX_CLIENT7
      KNEX_HOST = KNEX_HOST7
      KNEX_USER = KNEX_USER7
      KNEX_PWD = KNEX_PWD7
      KNEX_DATABASE = KNEX_DATABASE7
      KNEX_PORT = KNEX_PORT7
      break
    default:
  }
}
//.............................................................................
//.  get the SERVER Port
//.............................................................................
function getServerPort() {
  //
  // Server Ports
  //
  const {
    SERVERPORT_SRVREM_DB1,
    SERVERPORT_SRVLOC_DB1,
    SERVERPORT_SRVREM_DB2,
    SERVERPORT_SRVLOC_DB2,
    SERVERPORT_SRVLOC_DB6,
    SERVERPORT_SRVLOC_DB7
  } = require('../constants.js')
  //
  //  server_database connection
  //
  switch (server_database) {
    case '01':
      SERVERPORT = SERVERPORT_SRVREM_DB1
      break
    case '02':
      SERVERPORT = SERVERPORT_SRVREM_DB2
      break
    case '11':
      SERVERPORT = SERVERPORT_SRVLOC_DB1
      break
    case '12':
      SERVERPORT = SERVERPORT_SRVLOC_DB2
      break
    case '16':
      SERVERPORT = SERVERPORT_SRVLOC_DB6
      break
    case '17':
      SERVERPORT = SERVERPORT_SRVLOC_DB7
      break
    default:
  }
}
//.............................................................................
//.  Log the Body to the console
//.............................................................................
function logRawTables(req, fetchAction, fetchRoute, handler) {
  //
  //  Destructure Parameters
  //
  const { sqlClient, sqlAction, sqlString, sqlTable, sqlWhere, sqlOrderByRaw, sqlRow, sqlKeyName } =
    req.body
  //
  //  Timestamp and Counter
  //
  const TimeStamp = format(new Date(), 'yyLLddHHmmss')
  logCounter++
  //
  //  Format Message & Log
  //
  let logMessage = `Server.. ${logCounter} Time:${TimeStamp} Module(${moduleName})`
  if (sqlTable) logMessage = logMessage + ` Table(${sqlTable})`
  logMessage =
    logMessage +
    ` Handler(${handler}) Client(${sqlClient}) Action(${fetchAction}) Route(${fetchRoute}) Sql(${sqlAction})`

  if (sqlString) logMessage = logMessage + ` String(${sqlString})`
  if (sqlWhere) logMessage = logMessage + ` Where(${sqlWhere})`
  if (sqlOrderByRaw) logMessage = logMessage + ` OrderByRaw(${sqlOrderByRaw})`
  if (sqlRow) logMessage = logMessage + ` Row(Data)`
  if (sqlKeyName) logMessage = logMessage + ` KeyName(${sqlKeyName})`

  console.log(logMessage)
}
//.............................................................................
//.  Log the Body to the console
//.............................................................................
function logRawSignIn(req, fetchAction) {
  //
  //  Destructure Parameters
  //
  const { user, name, sqlClient } = req.body
  const { id } = req.params
  //
  //  Counter
  //
  const TimeStamp = format(new Date(), 'yyLLddHHmmss')
  logCounter = logCounter + 2
  //
  // Format message & Log
  //
  let logMessage = `Server.. ${logCounter} Time:${TimeStamp} Module(${moduleName}) sqlClient(${sqlClient}) fetchAction(${fetchAction}) User(${user})`
  if (name) logMessage.concat(` Name(${name})`)
  if (id) logMessage.concat(` ID(${id})`)
  console.log(logMessage)
}
