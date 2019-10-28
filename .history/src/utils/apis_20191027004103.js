

const Account = {
  register: '/accounts/register',
  login: '/accounts/login',
  logout: '/accounts/logout',
  me: '/accounts'

}

const School = {
  setSchool:'/practice/schools',
  editSchool:'/practice/schools/:sid',
  getSchool:'/practice/schools/:sid',
  deleteSchool:'/practice/schools/:sid',
  getList:'/practice/schools/list',
  mgetList:'/practice/schools/_mget'
}

const Student = {
  setStudent:'/practice/schools/:sid/students',
  editStudent:'/practice/schools/:sid/students/:stid',
  getStudent:'/practice/schools/:sid/students/:stid',
  deleteStudent:'/practice/schools/:sid/students/:stid',
  getList:'/practice/schools/:sid/students/list',
  mgetList:'/practice/schools/:sid/students/_mget',

}



export default {
  Account,
  School,
  studentusers,
}
