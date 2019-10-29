

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
  getStudent:'/practice/schools/10/students/:stid',
  deleteStudent:'/practice/schools/:sid/students/:stid',
  getList:'/practice/schools/10/students/list',
  mgetList:'/practice/schools/10/students/_mget',

}



export default {
  Account,
  School,
  Student,
}