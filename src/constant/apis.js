const ACCOUNT = {
  LOGIN: '/server/api/accounts/login',
  LOGOUT: '/server/api/accounts/logout',
  REGISTER: '/server/api/accounts/register',
  CURRENT: '/server/api/accounts',
  MGET: '/server/api/accounts/_mget',
  LIST: '/server/api/accounts/list',
  CURD: '/server/api/accounts/:aid',
};

const SCHOOL = {
  LIST: '/server/api/practice/schools/list',
  MGET: '/server/api/practice/schools/_mget',
  CURD: '/server/api/practice/schools/:sid',
  ADD: '/server/api/practice/schools',
};

const STUDENT = {
  LIST: '/server/api/practice/schools/:sid/students/list',
  MGET: '/server/api/practice/schools/:sid/students/_mget',
  CURD: '/server/api/practice/schools/:sid/students/:stid',
  ADD: '/server/api/practice/schools/:sid/students',
};

const COURSE = {
  LIST: '/server/api/practice/schools/:sid/courses/list',
  MGET: '/server/api/practice/schools/:sid/courses/_mget',
  CURD: '/server/api/practice/schools/:sid/courses/:cid',
  ADD: '/server/api/practice/schools/:sid/courses',
};

const ARRANGEMENT = {
  LIST: '/server/api/practice/schools/:sid/courses/:cid/arrangements/list',
  MGET: '/server/api/practice/schools/:sid/courses/:cid/arrangements/_mget',
  CURD: '/server/api/practice/schools/:sid/courses/:cid/arrangements/:aid',
  ADD: '/server/api/practice/schools/:sid/courses/:cid/arrangements',
  STUDENT: '/server/api/practice/schools/:sid/courses/:cid/arrangements/:aid/students',
};

const ATTENDANCE = {
  LIST: '/server/api/practice/schools/:sid/courses/:cid/arrangements/:aid/attendance/list',
  MGET: '/server/api/practice/schools/:sid/courses/:cid/arrangements/:aid/attendance/_mget',
  CURD: '/server/api/practice/schools/:sid/courses/:cid/arrangements/:aid/attendance/:atid',
  ADD: '/server/api/practice/schools/:sid/courses/:cid/arrangements/:aid/attendance',
};


export const API = {
  ACCOUNT,
  SCHOOL,
  STUDENT,
  COURSE,
  ARRANGEMENT,
  ATTENDANCE,
};
