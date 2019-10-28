

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
  setStudent:'/practice/schools/9/students',
  editStudent:'/practice/schools/9/students/:stid',
  getStudent:'/practice/schools/9/students/:stid',
  deleteStudent:'/practice/schools/9/students/:stid',
  getList:'/practice/schools/9/students/list',
  mgetList:'/practice/schools/9/students/_mget',

}



export default {
  Account,
  School,
  Student,
}
