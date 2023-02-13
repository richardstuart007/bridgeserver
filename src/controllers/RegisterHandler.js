//!==================================================================================
//! Run Register SQL
//!==================================================================================
const bcrypt = require('bcrypt')
//
// Constants
//
const debugLog = true
const moduleName = 'RegisterHandler'
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
async function RegisterHandler(db, bodyParms) {
  try {
    //
    //  Destructure Parameters
    //
    const {
      user,
      email,
      name,
      password,
      fedid,
      fedcountry,
      dftmaxquestions,
      dftowner,
      showprogress,
      showscore,
      sortquestions,
      skipcorrect,
      admin
    } = bodyParms

    if (debugLog) console.log(`bodyParms `, bodyParms)
    if (debugLog) console.log(`module(${moduleName}) 1 User(${user}) Email(${email}) name(${name})`)
    //
    // Get Database record (ASYNC)
    //
    await sqlDatabase(
      db,
      user,
      email,
      name,
      password,
      fedid,
      fedcountry,
      dftmaxquestions,
      dftowner,
      showprogress,
      showscore,
      sortquestions,
      skipcorrect,
      admin
    )
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
async function sqlDatabase(
  db,
  user,
  email,
  name,
  password,
  fedid,
  fedcountry,
  dftmaxquestions,
  dftowner,
  showprogress,
  showscore,
  sortquestions,
  skipcorrect,
  admin
) {
  let data_users
  try {
    if (debugLog) console.log(`module(${moduleName}) 5 Start db transaction`)
    //-------------------------------------------------------------
    //  Hash the password
    //-------------------------------------------------------------
    const saltRounds = 10
    const hash = bcrypt.hashSync(password, saltRounds)
    //-------------------------------------------------------------
    //  Userspwd Insert
    //-------------------------------------------------------------
    const data_userspwd = await db
      .insert({
        uphash: hash,
        upuser: user
      })
      .into('userspwd')
      .returning('*')
    //-------------------------------------------------------------
    //  Users Insert
    //-------------------------------------------------------------
    const u_id = data_userspwd[0].upid
    if (debugLog) console.log(`module(${moduleName})u_id `, u_id)
    data_users = await db
      .insert({
        u_id: u_id,
        u_name: name,
        u_user: user,
        u_email: email,
        u_admin: admin,
        u_fedid: fedid,
        u_fedcountry: fedcountry,
        u_showprogress: showprogress,
        u_showscore: showscore,
        u_sortquestions: sortquestions,
        u_skipcorrect: skipcorrect,
        u_dftmaxquestions: dftmaxquestions,
        u_joined: new Date()
      })
      .into('users')
      .returning('*')
    //-------------------------------------------------------------
    //  Usersowner Insert
    //-------------------------------------------------------------
    const uoid = data_userspwd[0].upid
    data_users = await db
      .insert({
        uoid: uoid,
        uouser: user,
        uoowner: dftowner
      })
      .into('usersowner')
      .returning('*')
    //-------------------------------------------------------------
    //  Registration failed
    //------------------------------------------------------------
    if (!data_users || !data_users[0]) {
      rtnObj.rtnMessage = `Register User: FAILED`
      if (debugLog) console.log(`module(${moduleName}) rtnMessage `, rtnObj.rtnMessage)
      return
    }
    //-------------------------------------------------------------
    //  Registration SUCCESS
    //-------------------------------------------------------------
    if (debugLog) console.log(`module(${moduleName}) data_users `, data_users)
    rtnObj.rtnValue = true
    rtnObj.rtnMessage = `Register User: SUCCESS`
    rtnObj.rtnRows = data_users
    return
    //-------------------------------------------------------------
    // Errors
    //-------------------------------------------------------------
  } catch (err) {
    //
    //  Constraint (duplicate) error
    //
    const message = err.message
    if (message.includes('duplicate') && message.includes('userspwd_user')) {
      rtnObj.rtnMessage = 'Registration User already exists'
      if (debugLog) console.log(`module(${moduleName}) rtnMessage `, rtnObj.rtnMessage)
      return
    }
    //
    //  Other errors
    //
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
  RegisterHandler
}
