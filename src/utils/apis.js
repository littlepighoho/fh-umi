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
  getAttendanceList: '/practice/schools/26/courses/2/arrangements/2/attendance/list',
  getAttendance:'/practice/schools/26/courses/2/arrangements/2/attendance/:atid',
  getList:'/practice/schools/26/courses/2/arrangements/2/attendance/_mget',
};


export default {
  Account,
  Teams,
  Attendance,
}
