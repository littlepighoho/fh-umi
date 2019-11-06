const Account = {
  register: '/accounts/register',
  login: '/accounts/login',
  logout: '/accounts/logout',
  me: '/accounts'
};


const Teams = {
  create:'/teams',
};

const Attendance = {
  getAttendanceList: '/practice/schools/10/courses/3/arrangements/3/attendance/list',
  getAttendance:'/practice/schools/10/courses/3/arrangements/3/attendance/:atid',
  getList:'/practice/schools/10/courses/3/arrangements/3/attendance/_mget',
  deleteAttendance:'/practice/schools/10/courses/3/arrangements/3/attendance/:atid',
  exitAttendance:'/practice/schools/10/courses/3/arrangements/3/attendance/:atid',
};


export default {
  Account,
  Teams,
  Attendance,
}
