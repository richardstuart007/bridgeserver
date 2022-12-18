//
//  Libraries
//
const express = require('express')
const myRouterRemote1 = express.Router()
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
const moduleName = 'myRouterRemote1'
//
// Constants
//
const {
  REMOTE_KNEX_CLIENT1,
  REMOTE_KNEX_HOST1,
  REMOTE_KNEX_USER1,
  REMOTE_KNEX_PWD1,
  REMOTE_KNEX_DATABASE1,
  URL_SIGNIN,
  URL_TABLES,
  URL_REGISTER
} = require('../constants.js')
//
// Knex (LOCAL)
//
const db = knex({
  client: REMOTE_KNEX_CLIENT1,
  connection: {
    host: REMOTE_KNEX_HOST1,
    user: REMOTE_KNEX_USER1,
    password: REMOTE_KNEX_PWD1,
    database: REMOTE_KNEX_DATABASE1
  }
})
//
//  Log setup
//
console.log(
  `${moduleName} Database Connection==> Client(${REMOTE_KNEX_CLIENT1}) host(${REMOTE_KNEX_HOST1}) user(${REMOTE_KNEX_USER1}) database(${REMOTE_KNEX_DATABASE1})`
)
//.............................................................................
//.  Routes - Tables
//.............................................................................
myRouterRemote1.post(URL_TABLES, (req, res) => {
  logRawTables(req, 'POST', 'RAW', 'serverRaw')
  serverRaw.serverRaw(req, res, db, logCounter)
})

myRouterRemote1.delete(URL_TABLES, (req, res) => {
  logRawTables(req, 'DELETE', 'RAW', 'serverRaw')
  serverRaw.serverRaw(req, res, db, logCounter)
})
//.............................................................................
//.  Routes - Register/SignIn
//.............................................................................
myRouterRemote1.post(URL_SIGNIN, (req, res) => {
  logRawSignIn(req, 'POST Signin')
  serverSignin.serverSignin(req, res, db, logCounter)
})

myRouterRemote1.post(URL_REGISTER, (req, res) => {
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
  logCounter = logCounter + 1
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
  logCounter = logCounter + 1
  //
  // Format message & Log
  //
  let logMessage = `Server.. ${logCounter} Time:${TimeStamp} Module(${moduleName}) sqlClient(${sqlClient}) fetchAction(${fetchAction}) User(${user})`
  if (name) logMessage.concat(` Name(${name})`)
  if (id) logMessage.concat(` ID(${id})`)
  console.log(logMessage)
}
//.............................................................................
module.exports = myRouterRemote1
