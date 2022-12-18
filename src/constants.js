//------------------------------------------------------------------------
//  Database (Remote 1)
//------------------------------------------------------------------------
exports.REMOTE_KNEX_CLIENT1 = 'pg'
exports.REMOTE_KNEX_PORT1 = 5432
exports.REMOTE_KNEX_HOST1 = 'rosie.db.elephantsql.com'
exports.REMOTE_KNEX_USER1 = 'wdscnzxj'
exports.REMOTE_KNEX_PWD1 = 'O-7H6IKT6Hhi_xGU7J_rHSBjvbNO218s'
exports.REMOTE_KNEX_DATABASE1 = 'wdscnzxj'
//------------------------------------------------------------------------
//  Database (Remote 2) postgresql://postgres:MpshoqIm2WsiSFOTH2j8@containers-us-west-176.railway.app:5975/railway
//------------------------------------------------------------------------
exports.REMOTE_KNEX_CLIENT2 = 'pg'
exports.REMOTE_KNEX_PORT2 = 5975
exports.REMOTE_KNEX_HOST2 = 'containers-us-west-176.railway.app'
exports.REMOTE_KNEX_USER2 = 'postgres'
exports.REMOTE_KNEX_PWD2 = 'MpshoqIm2WsiSFOTH2j8'
exports.REMOTE_KNEX_DATABASE2 = 'railway'
//------------------------------------------------------------------------
//  Database (Local 6)
//------------------------------------------------------------------------
exports.LOCAL_KNEX_CLIENT6 = 'pg'
exports.LOCAL_KNEX_HOST6 = '127.0.0.1'
exports.LOCAL_KNEX_USER6 = 'richa'
exports.LOCAL_KNEX_PWD6 = 'london'
exports.LOCAL_KNEX_DATABASE6 = 'Bridge6'
//------------------------------------------------------------------------
//  Database (Local 7)
//------------------------------------------------------------------------
exports.LOCAL_KNEX_CLIENT7 = 'pg'
exports.LOCAL_KNEX_HOST7 = '127.0.0.1'
exports.LOCAL_KNEX_USER7 = 'richa'
exports.LOCAL_KNEX_PWD7 = 'london'
exports.LOCAL_KNEX_DATABASE7 = 'Bridge7'
//------------------------------------------------------------------------
//  PORTS
//------------------------------------------------------------------------
exports.PORT_REM_REM1 = 11011
exports.PORT_REM_REM2 = 11022
exports.PORT_LOC_REM1 = 11101
exports.PORT_LOC_REM2 = 11202
exports.PORT_LOC_LOC6 = 11606
exports.PORT_LOC_LOC7 = 11707
//---------------------------------------------------------------------
//  corsWhitelist
//---------------------------------------------------------------------
exports.CORS_WHITELIST_SRVREM_DBREM1 = [
  'https://quizclient021render.onrender.com',
  'https://quizdataentry021render.onrender.com',
  'http://localhost:13011',
  'http://localhost:12011'
]
exports.CORS_WHITELIST_SRVREM_DBREM2 = [
  'https://bridgeclient.onrender.com',
  'https://bridgedataentry.onrender.com',
  'http://localhost:13022',
  'http://localhost:12022'
]
exports.CORS_WHITELIST_SRVLOC_DBREM1 = ['http://localhost:13101', 'http://localhost:12101']
exports.CORS_WHITELIST_SRVLOC_DBREM2 = ['http://localhost:13202', 'http://localhost:12202']
exports.CORS_WHITELIST_SRVLOC_DBLOC6 = ['http://localhost:13606', 'http://localhost:12606']
exports.CORS_WHITELIST_SRVLOC_DBLOC7 = ['http://localhost:13707', 'http://localhost:12707']
//------------------------------------------------------------------------
//  URL
//------------------------------------------------------------------------
exports.URL_TABLES = '/QuizTables'
exports.URL_REGISTER = '/QuizRegister'
exports.URL_SIGNIN = '/QuizSignin'
