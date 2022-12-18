//!==================================================================================
//! Run Signin SQL
//!==================================================================================
const bcrypt = require('bcrypt')
//
// Constants
//
const debugLog = false
const moduleName = 'serverSigninHandler'
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
async function serverSigninHandler(db, bodyParms) {
  try {
    //
    //  Destructure Parameters
    //
    const { user, password } = bodyParms
    if (debugLog) console.log(`module(${moduleName}) 1 Signin(${user})`)
    //
    // Get Database record (ASYNC)
    //
    await sqlDatabase(db, user, password)
    return rtnObj
    //
    // Errors
    //
  } catch (err) {
    console.log(`module(${moduleName}) 3 `, err.message)
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
  let data_users = false
  let data_userspwd = false
  //
  //  Try/Catch
  //
  try {
    if (debugLog) console.log(`module(${moduleName}) 4 Start db transaction`)
    if (debugLog) console.log(`module(${moduleName}) 5 user `, user)
    //-------------------------------------------------------------
    //  Userspwd GET
    //-------------------------------------------------------------
    data_userspwd = await db.select('*').from('userspwd').where('upuser', '=', user)
    //
    //  Userspwd not found
    //
    if (!data_userspwd || !data_userspwd[0]) {
      rtnObj.rtnMessage = `Invalid User, please Register`
      if (debugLog) console.log(`module(${moduleName}) 6 rtnMessage `, rtnObj.rtnMessage)
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
      if (debugLog) console.log(`module(${moduleName}) 7 rtnMessage `, rtnObj.rtnMessage)
      return
    }
    //-------------------------------------------------------------
    //  Users GET
    //-------------------------------------------------------------
    const upid = userspwd.upid
    data_users = await db.select('*').from('users').where('u_id', '=', upid)
    //
    //  Users not found
    //
    if (!data_users || !data_users[0]) {
      rtnObj.rtnMessage = `Database error (Users) not found for user($user) id($upid)`
      if (debugLog) console.log(`module(${moduleName}) 8 rtnMessage `, rtnObj.rtnMessage)
      return
    }
    //-------------------------------------------------------------
    //  Return user found
    //-------------------------------------------------------------
    if (debugLog) console.log(`module(${moduleName}) 9 data_users `, data_users)
    //
    // Update Return Values
    //
    rtnObj.rtnValue = true
    rtnObj.rtnMessage = `Signin User: SUCCESS`
    rtnObj.rtnRows = data_users
    return
    //-------------------------------------------------------------
    // Errors
    //-------------------------------------------------------------
  } catch (err) {
    console.log(`module(${moduleName}) 10 catch error `, err.message)
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
  serverSigninHandler
}
