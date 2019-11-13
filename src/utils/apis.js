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
  getAttendanceList: '/practice/schools/70/courses/5/arrangements/4/attendance/list',
  getAttendance:'/practice/schools/70/courses/5/arrangements/4/attendance/:atid',
  getList:'/practice/schools/70/courses/5/arrangements/4/attendance/_mget',
  deleteAttendance:'/practice/schools/70/courses/5/arrangements/4/attendance/:atid',
  exitAttendance:'/practice/schools/70/courses/5/arrangements/4/attendance/:atid',
};


export default {
  Account,
  Teams,
  Attendance,
}
