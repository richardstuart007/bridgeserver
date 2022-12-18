//==================================================================================
//= Process a Signin fetch request from server route
//==================================================================================
const { format } = require('date-fns')
const serverSigninHandler = require('./serverSigninHandler')
//
// Constants
//
const debugLog = false
const moduleName = 'serverSignin'
//
//  Global Variable - Define return object
//
const CatchFunction = 'serverSignin'
let rtnObj = {
  rtnValue: '',
  rtnMessage: '',
  rtnSqlFunction: moduleName,
  rtnCatchFunction: '',
  rtnCatch: false,
  rtnCatchMsg: '',
  rtnRows: []
}
//==================================================================================
//= Signin a User
//==================================================================================
async function serverSignin(req, res, db, logCounter) {
  //
  //  Time Stamp
  //
  const TimeStamp = format(new Date(), 'yyLLddHHmmss')
  let logMessage = `Handler. ${logCounter} Time:${TimeStamp} Module(${moduleName})`

  try {
    //..................................................................................
    //. Check values sent in Body
    //..................................................................................
    const bodyParms = req.body
    const { user, password } = bodyParms
    //
    //  Check required parameters
    //
    if (!user || !password) {
      rtnObj.rtnMessage = `User or Password empty`
      rtnObj.rtnCatchFunction = CatchFunction
      return res.status(400).json(rtnObj)
    }
    //
    // Process Request Promises(ALL)
    //
    const returnData = await Promise.all([serverSigninHandler.serverSigninHandler(db, bodyParms)])
    if (debugLog) console.log(`module(${moduleName}) returnData `, returnData)
    //
    // Parse Results
    //
    const returnDataObject = returnData[0]
    rtnObj = Object.assign({}, returnDataObject)
    //
    //  Error
    //
    const rtnValue = rtnObj.rtnValue
    if (!rtnValue) {
      if (debugLog) console.log(`module(${moduleName}) rtnObj `, rtnObj)
      return res.status(220).send(rtnObj)
    }
    //
    //  Log return values
    //
    const records = Object.keys(rtnObj.rtnRows).length
    logMessage = logMessage + ` records(${records})`
    console.log(logMessage)
    if (debugLog) console.log(`module(${moduleName}) rtnObj `, rtnObj)
    return res.status(200).json(rtnObj)
    //
    // Errors
    //
  } catch (err) {
    logMessage = logMessage + ` Error(${err.message})`
    console.log(logMessage)
    rtnObj.rtnCatch = true
    rtnObj.rtnCatchMsg = err.message
    rtnObj.rtnCatchFunction = CatchFunction
    if (debugLog) console.log(`module(${moduleName}) rtnObj `, rtnObj)
    return res.status(400).send(rtnObj)
  }
}
//!==================================================================================
//! Exports
//!==================================================================================
module.exports = {
  serverSignin
}
