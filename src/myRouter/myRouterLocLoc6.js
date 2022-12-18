//
//  Libraries
//
const express = require('express')
const myRouterLocLoc6 = express.Router()
const knex = require('knex')
const { format } = require('date-fns')
//
//  Sub components
//
const serverRaw = require('../controllers/serverRaw')
const serverRegister = require('../controllers/serverRegister')
const serverSignin = require('../controllers/serverSignin')
//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
const moduleName = 'myRouterLocLoc6'
//
// Constants
//
const {
  LOCAL_KNEX_CLIENT6,
  LOCAL_KNEX_HOST6,
  LOCAL_KNEX_USER6,
  LOCAL_KNEX_PWD6,
  LOCAL_KNEX_DATABASE6,
  URL_SIGNIN,
  URL_TABLES,
  URL_REGISTER
} = require('../constants.js')
//
// Knex (LOCAL)
//
const db = knex({
  client: LOCAL_KNEX_CLIENT6,
  connection: {
    host: LOCAL_KNEX_HOST6,
    user: LOCAL_KNEX_USER6,
    password: LOCAL_KNEX_PWD6,
    database: LOCAL_KNEX_DATABASE6
  }
})
//
//  Log setup
//
console.log(
  `module(${moduleName}) Database Connection==> Client(${LOCAL_KNEX_CLIENT6}) host(${LOCAL_KNEX_HOST6}) user(${LOCAL_KNEX_USER6}) database(${LOCAL_KNEX_DATABASE6})`
)
//.............................................................................
//.  Routes - Tables
//.............................................................................
myRouterLocLoc6.post(URL_TABLES, (req, res) => {
  logRawTables(req, 'POST', 'RAW', 'serverRaw')
  serverRaw.serverRaw(req, res, db, logCounter)
})

myRouterLocLoc6.delete(URL_TABLES, (req, res) => {
  logRawTables(req, 'DELETE', 'RAW', 'serverRaw')
  serverRaw.serverRaw(req, res, db, logCounter)
})
//.............................................................................
//.  Routes - Register/SignIn
//.............................................................................
myRouterLocLoc6.post(URL_SIGNIN, (req, res) => {
  logRawSignIn(req, 'POST Signin')
  serverSignin.serverSignin(req, res, db, logCounter)
})

myRouterLocLoc6.post(URL_REGISTER, (req, res) => {
  logRawSignIn(req, 'POST Register')
  serverRegister.serverRegister(req, res, db, logCounter)
})
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
  logCounter++
  //
  // Format message & Log
  //
  let logMessage = `Server.. ${logCounter} Time:${TimeStamp} Module(${moduleName}) sqlClient(${sqlClient}) fetchAction(${fetchAction}) User(${user})`
  if (name) logMessage.concat(` Name(${name})`)
  if (id) logMessage.concat(` ID(${id})`)
  console.log(logMessage)
}
//.............................................................................
module.exports = myRouterLocLoc6
