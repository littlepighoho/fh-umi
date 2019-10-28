

const Account = {
  register: '/accounts/register',
  login: '/accounts/login',
  logout: '/accounts/logout',
  me: '/accounts'

}

const School = {
  registerSchool:'/practice/schools',
  editSchool:'/practice/schools/:sid',
  getSchool:'/practice/schools/:sid',
  deleteSchool:'/practice/schools/:sid',
  getList:'/practice/schools/list',
  mgetList:'/practice/schools/_mget'
}





export default {
  Account,
  School,
}
