//!==================================================================================
//! Run Signin SQL
//!==================================================================================
const bcrypt = require('bcrypt')
//
// Constants
//
const debugLog = true
const moduleName = 'SigninHandler'
//.................................
//  Object returned by this module
//.................................
const rtnObj = {
  rtnValue: false,
  rtnMessage: '',
  rtnSqlFunction: moduleName,
  rtnCatchFunction: '',
  rtnCatch: false,
  rtnCatchMsg: '',
  rtnRows: []
}
//==================================================================================
//= Main ASYNC Function
//==================================================================================
async function SigninHandler(db, bodyParms) {
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
    //. Parameter Validation
    //..................................................................................
    //
    //  Destructure Parameters
    //
    const { user, password } = bodyParms
    if (debugLog) console.log(`module(${moduleName}) Signin(${user})`)
    //
    // Get Database record (ASYNC)
    //
    await sqlDatabase(db, user, password)
    if (debugLog) console.log(`rtnObj `, rtnObj)
    return rtnObj
    //
    // Errors
    //
  } catch (err) {
    console.log(`module(${moduleName}) `, err.message)
    rtnObj.rtnCatch = true
    rtnObj.rtnCatchMsg = err.message
    rtnObj.rtnCatchFunction = moduleName
    return rtnObj
  }
}
//!==================================================================================
//! Main function - Await
//!==================================================================================
async function sqlDatabase(db, user, password) {
  //
  // Define Return Variable
  //
  let data_userspwd = false
  let data_users = false
  let data_usersowner = false
  //
  //  Try/Catch
  //
  try {
    if (debugLog) console.log(`module(${moduleName}) user `, user)
    //-------------------------------------------------------------
    //  Userspwd GET
    //-------------------------------------------------------------
    data_userspwd = await db.select('*').from('userspwd').where('upuser', '=', user)
    //
    //  Userspwd not found
    //
    if (!data_userspwd || !data_userspwd[0]) {
      rtnObj.rtnMessage = `Invalid User, please Register`
      if (debugLog) console.log(`module(${moduleName}) `, rtnObj.rtnMessage)
      return
    }
    //-------------------------------------------------------------
    //  Validate password
    //-------------------------------------------------------------
    const userspwd = data_userspwd[0]
    const uphash = userspwd.uphash
    const valid = bcrypt.compareSync(password, uphash)
    if (!valid) {
      rtnObj.rtnMessage = `Invalid Password`
      if (debugLog) console.log(`module(${moduleName}) `, rtnObj.rtnMessage)
      return
    }
    //
    //  User ID
    //
    const upid = userspwd.upid
    //-------------------------------------------------------------
    //  GET Users
    //-------------------------------------------------------------
    data_users = await db.select('*').from('users').where('u_id', '=', upid)
    //
    //  Not found
    //
    if (!data_users || !data_users[0]) {
      rtnObj.rtnMessage = `Database error (Users) not found for user($user) id($upid)`
      if (debugLog) console.log(`module(${moduleName}) `, rtnObj.rtnMessage)
      return
    }
    //-------------------------------------------------------------
    //  GET Usersowner
    //-------------------------------------------------------------
    data_usersowner = await db.select('*').from('usersowner').where('uoid', '=', upid)
    //
    //  Not found
    //
    if (!data_usersowner) {
      rtnObj.rtnMessage = `Database error (Usersowner) not found for user($user) id($upid)`
      if (debugLog) console.log(`module(${moduleName}) `, rtnObj.rtnMessage)
      return
    }
    //-------------------------------------------------------------
    //  Return user found
    //-------------------------------------------------------------
    if (debugLog) console.log(`module(${moduleName}) `, data_users)
    if (debugLog) console.log(`module(${moduleName}) `, data_usersowner)
    //
    // Update Return Values
    //
    rtnObj.rtnValue = true
    rtnObj.rtnMessage = `Signin User: SUCCESS`
    rtnObj.rtnRows[0] = data_users[0]
    rtnObj.rtnRows[1] = data_usersowner
    return
    //-------------------------------------------------------------
    // Errors
    //-------------------------------------------------------------
  } catch (err) {
    console.log(`module(${moduleName}) `, err.message)
    rtnObj.rtnCatch = true
    rtnObj.rtnCatchMsg = err.message
    rtnObj.rtnCatchFunction = moduleName
    return
  }
}
//!==================================================================================
//! Exports
//!==================================================================================
module.exports = {
  SigninHandler
}
