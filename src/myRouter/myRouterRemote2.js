//
//  Libraries
//
const express = require('express')
const myRouterRemote2 = express.Router()
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
const moduleName = 'myRouterRemote2'
//
// Constants
//
const {
  REMOTE_KNEX_CLIENT2,
  REMOTE_KNEX_HOST2,
  REMOTE_KNEX_USER2,
  REMOTE_KNEX_PWD2,
  REMOTE_KNEX_DATABASE2,
  URL_SIGNIN,
  URL_TABLES,
  URL_REGISTER
} = require('../constants.js')
//
// Knex (LOCAL)
//
const db = knex({
  client: REMOTE_KNEX_CLIENT2,
  connection: {
    host: REMOTE_KNEX_HOST2,
    user: REMOTE_KNEX_USER2,
    password: REMOTE_KNEX_PWD2,
    database: REMOTE_KNEX_DATABASE2
  }
})
//
//  Log setup
//
console.log(
  `${moduleName} Database Connection==> Client(${REMOTE_KNEX_CLIENT2}) host(${REMOTE_KNEX_HOST2}) user(${REMOTE_KNEX_USER2}) database(${REMOTE_KNEX_DATABASE2})`
)
//.............................................................................
//.  Routes - Tables
//.............................................................................
myRouterRemote2.post(URL_TABLES, (req, res) => {
  logRawTables(req, 'POST', 'RAW', 'serverRaw')
  serverRaw.serverRaw(req, res, db, logCounter)
})

myRouterRemote2.delete(URL_TABLES, (req, res) => {
  logRawTables(req, 'DELETE', 'RAW', 'serverRaw')
  serverRaw.serverRaw(req, res, db, logCounter)
})
//.............................................................................
//.  Routes - Register/SignIn
//.............................................................................
myRouterRemote2.post(URL_SIGNIN, (req, res) => {
  logRawSignIn(req, 'POST Signin')
  serverSignin.serverSignin(req, res, db, logCounter)
})

myRouterRemote2.post(URL_REGISTER, (req, res) => {
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
module.exports = myRouterRemote2
