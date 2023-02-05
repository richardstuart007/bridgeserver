//------------------------------------------------------------------------
//  Database (Remote 1)
//------------------------------------------------------------------------
exports.KNEX_CLIENT1 = 'pg'
exports.KNEX_PORT1 = 5432
exports.KNEX_HOST1 = 'rosie.db.elephantsql.com'
exports.KNEX_USER1 = 'wdscnzxj'
exports.KNEX_PWD1 = 'O-7H6IKT6Hhi_xGU7J_rHSBjvbNO218s'
exports.KNEX_DATABASE1 = 'wdscnzxj'
//------------------------------------------------------------------------
//  Database (Remote 2)
//------------------------------------------------------------------------
exports.KNEX_CLIENT2 = 'pg'
exports.KNEX_PORT2 = 5975
exports.KNEX_HOST2 = 'containers-us-west-176.railway.app'
exports.KNEX_USER2 = 'postgres'
exports.KNEX_PWD2 = 'MpshoqIm2WsiSFOTH2j8'
exports.KNEX_DATABASE2 = 'railway'
//------------------------------------------------------------------------
//  Database (Local 6)
//------------------------------------------------------------------------
exports.KNEX_CLIENT6 = 'pg'
exports.KNEX_HOST6 = '127.0.0.1'
exports.KNEX_USER6 = 'richa'
exports.KNEX_PWD6 = 'london'
exports.KNEX_DATABASE6 = 'bridge6'
//------------------------------------------------------------------------
//  Database (Local 7)
//------------------------------------------------------------------------
exports.KNEX_CLIENT7 = 'pg'
exports.KNEX_HOST7 = '127.0.0.1'
exports.KNEX_USER7 = 'richa'
exports.KNEX_PWD7 = 'london'
exports.KNEX_DATABASE7 = 'bridge7'
//------------------------------------------------------------------------
//  PORTS
//------------------------------------------------------------------------
exports.SERVERPORT_SRVREM_DB1 = 3901
exports.SERVERPORT_SRVREM_DB2 = 3902
exports.SERVERPORT_SRVLOC_DB1 = 3911
exports.SERVERPORT_SRVLOC_DB2 = 3912
exports.SERVERPORT_SRVLOC_DB6 = 3916
exports.SERVERPORT_SRVLOC_DB7 = 3917
//---------------------------------------------------------------------
//  corsWhitelist
//---------------------------------------------------------------------
exports.CORS_WHITELIST_SRVREM_DB1 = [
  'https://bridgeclient01.onrender.com',
  'https://bridgedataentry01.onrender.com',
  'http://localhost:3801',
  'http://localhost:3701'
]
exports.CORS_WHITELIST_SRVREM_DB2 = [
  'https://bridgeclient02.onrender.com',
  'https://bridgedataentry02.onrender.com',
  'http://localhost:3802',
  'http://localhost:3702'
]
exports.CORS_WHITELIST_SRVLOC_DB1 = ['http://localhost:3811', 'http://localhost:3711']
exports.CORS_WHITELIST_SRVLOC_DB2 = ['http://localhost:3812', 'http://localhost:3712']
exports.CORS_WHITELIST_SRVLOC_DB6 = ['http://localhost:3816', 'http://localhost:3716']
exports.CORS_WHITELIST_SRVLOC_DB7 = ['http://localhost:3817', 'http://localhost:3717']
//------------------------------------------------------------------------
//  URL
//------------------------------------------------------------------------
exports.URL_TABLES = '/QuizTables'
exports.URL_REGISTER = '/QuizRegister'
exports.URL_SIGNIN = '/QuizSignin'
