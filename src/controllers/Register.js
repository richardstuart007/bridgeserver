//==================================================================================
//= Process a REGISTER fetch request from server route
//==================================================================================
const { format } = require('date-fns')
const RegisterHandler = require('./RegisterHandler')
//
// Constants
//
const debugLog = false
const moduleName = 'Register'
//
//  Global Variable - Define return object
//
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
//= Register a User
//==================================================================================
async function Register(req, res, db, logCounter) {
  //
  //  Time Stamp
  //
  const TimeStamp = format(new Date(), 'yyLLddHHmmss')
  let logMessage = `Handler. ${logCounter} Time:${TimeStamp} Module(${moduleName})`
  try {
    //
    //  Initialise Values
    //
    rtnObj.rtnValue = false
    rtnObj.rtnMessage = ''
    rtnObj.rtnSqlFunction = moduleName
    rtnObj.rtnCatchFunction = ''
    rtnObj.rtnCatch = false
    rtnObj.rtnCatchMsg = ''
    rtnObj.rtnRows = []
    //..................................................................................
    //. Check values sent in Body
    //..................................................................................
    const bodyParms = req.body
    const { user, email, name, password } = bodyParms
    //
    //  Check required parameters
    //
    if (!user || !email || !name || !password) {
      rtnObj.rtnMessage = `User or Email or Name or Password empty`
      return res.status(400).json(rtnObj)
    }
    //
    // Process Request Promises(ALL)
    //
    const returnData = await Promise.all([RegisterHandler.RegisterHandler(db, bodyParms)])
    if (debugLog) console.log(`module(${moduleName}) returnData `, returnData)
    //
    // Parse Results
    //
    const returnDataObject = returnData[0]
    rtnObj = Object.assign({}, returnDataObject)
    //
    //  Return values
    //
    if (debugLog) {
      console.log(`Handler. ${logCounter} Time:${TimeStamp} Module(${moduleName}) ${rtnObj}`)
    }
    const rtnValue = rtnObj.rtnValue
    //
    //  Not found
    //
    if (!rtnValue) {
      if (debugLog) {
        let message
        rtnObj.rtnCatch ? (message = rtnObj.rtnCatchMsg) : (message = rtnObj.rtnMessage)
        console.log(
          `Handler. ${logCounter} Time:${TimeStamp} Module(${moduleName}) message(${message})`
        )
      }
      return res.status(220).json(rtnObj)
    }
    //
    //  Log return values
    //
    const records = Object.keys(rtnObj.rtnRows).length
    logMessage = logMessage + ` records(${records})`
    console.log(logMessage)
    if (debugLog)
      console.log(
        `Handler. ${logCounter} Time:${TimeStamp} Module(${moduleName}) records(${records})`
      )
    return res.status(200).json(rtnObj)
    //
    // Errors
    //
  } catch (err) {
    logMessage = logMessage + ` Error(${err.message})`
    console.log(logMessage)
    rtnObj.rtnCatch = true
    rtnObj.rtnCatchMsg = err.message
    rtnObj.rtnCatchFunction = moduleName
    return res.status(400).json(rtnObj)
  }
}
//!==================================================================================
//! Exports
//!==================================================================================
module.exports = {
  Register
}
