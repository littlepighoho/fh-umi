const ACCOUNT = {
  ROOT: 'account',
  LOGIN: 'account/login',
  LOGOUT: 'account/logout',
  CHECKSTATUS: 'account/checkStatus',
  REGISTER: 'account/register',
  GET_CURRENT_ACCOUNT: 'account/getCurrentAccount',
  GET_ACCOUNT_LIST: 'account/getAccountList',
  FETCH_ACCOUNT_LIST: 'account/fetchAccountList',
  DELETE_ACCOUNT: 'account/deleteAccount',
  EDIT_ACCOUNT: 'account/editAccount',
};

const SCHOOL = {
  ROOT: 'school',
  GET_SCHOOL_LIST: 'school/getSchoolList',
  FETCH_SCHOOL_LIST: 'school/fetchSchoolList',
  ADD_SCHOOL: 'school/addSchool',
  DELETE_SCHOOL: 'school/deleteSchool',
  GET_SCHOOL_ENTITY: 'school/getSchoolEntity',
};

const STUDENT = {
  ROOT: 'student',
  GET_STUDENT_LIST: 'student/getStudentList',
  FETCH_SCHOOL_LIST: 'student/fetchStudentList',
  GET_STUDENT_ENTITY: 'student/getStudentEntity',
  ADD_STUDENT: 'student/addStudent',
  DEL_STUDENT: 'student/delStudent',
  EDIT_STUDENT: 'student/editStudent',
};

const COURSE = {
  ROOT: 'course',
  GET_COURSE_LIST: 'course/getCourseList',
  FETCH_COURSE_LIST: 'course/fetchCourseList',
  ADD_COURSE: 'course/addCourse',
  DELETE_COURSE: 'course/deleteCourse',
  EDIT_COURSE: 'course/editCourse',
  GET_COURSE_ENTITY: 'course/getCourseEntity',
  INIT_COURSE_LIST: 'course/initCourseList',
};

const ARRANGEMENT = {
  ROOT: 'arrangement',
  GET_ARRANGEMENT_LIST: 'arrangement/getArrangementList',
  FETCH_ARRANGEMENT_LIST: 'arrangement/fetchArrangementList',
  ADD_ARRANGEMENT: 'arrangement/addArrangement',
  DELETE_ARRANGEMENT: 'arrangement/deleteArrangement',
  EDIT_ARRANGEMENT: 'arrangement/editArrangement',
  GET_ARRANGEMENT_ENTITY: 'arrangement/getArrangementEntity',
  GET_ARRANGEMENT_STUDENT_LIST: 'arrangement/getArrangementStudentList',
  DELETE_ARRANGEMENT_STUDENT: 'arrangement/deleteArrangementStudent',
  ADD_ARRANGEMENT_STUDENT: 'arrangement/addArrangementStudent',

};

const ATTENDANCE = {
  ROOT: 'attendance',
  GET_ATTENDANCE_LIST: 'attendance/getAttendanceList',
  FETCH_ATTENDANCE_LIST: 'attendance/fetchAttendanceList',
  ADD_ATTENDANCE: 'attendance/addAttendance',
  DELETE_ATTENDANCE: 'attendance/deleteAttendance',
  EDIT_ATTENDANCE: 'attendance/editAttendance',
  GET_ATTENDANCE_ENTITY: 'attendance/getAttendanceEntity',
};

const CLASSROOM = {
  ROOT: 'classroom',
  GET_CLASSROOM_LIST: 'classroom/getClassroomList',
  FETCH_CLASSROOM_LIST: 'classroom/fetchClassroomList',
  ADD_CLASSROOM: 'classroom/addClassroom',
  DELETE_CLASSROOM: 'classroom/deleteClassroom',
  EDIT_CLASSROOM: 'classroom/editClassroom',
  GET_CLASSROOM_ENTITY: 'classroom/getClassroomEntity',
  GET_CLASSROOM_USER_ENTITY: 'classroom/getClassroomUserEntity',
  ADD_CLASSROOM_USER: 'classroom/addClassroomUser',
  DELETE_CLASSROOM_USER: 'classroom/deleteClassroomUser',
  INIT_CLASSROOM_LIST: 'classroom/initClassroomList',
};

const EVALUATE = {
  ROOT: 'evaluate',
  GET_EVALUATE_STUDENT_LIST: 'evaluate/getEvaluateStudentList',
  FETCH_EVALUATE_STUDENT_LIST: 'evaluate/fetchEvaluateStudentList',
  GET_EVALUATE_STUDENT_ENTITY: 'evaluate/getEvaluateStudentEntity',
  DELETE_EVALUATE_STUDENT: 'evaluate/deleteEvaluateStudent',
  ADD_EVALUATE_STUDENT: 'evaluate/addEvaluateStudent',
  GET_EVALUATE_COURSE_LIST: 'evaluate/getEvaluateCourseList',
  FETCH_EVALUATE_COURSE_LIST: 'evaluate/fetchEvaluateCourseList',
  GET_EVALUATE_COURSE_ENTITY: 'evaluate/getEvaluateCourseEntity',
  DELETE_EVALUATE_COURSE: 'evaluate/deleteEvaluateCourse',
  ADD_EVALUATE_COURSE: 'evaluate/addEvaluateCourse',
  GET_EVALUATE_TEACHER_LIST: 'evaluate/getEvaluateTeacherList',
  FETCH_EVALUATE_TEACHER_LIST: 'evaluate/fetchEvaluateTeacherList',
  GET_EVALUATE_TEACHER_ENTITY: 'evaluate/getEvaluateTeacherEntity',
  DELETE_EVALUATE_TEACHER: 'evaluate/deleteEvaluateTeacher',
  ADD_EVALUATE_TEACHER: 'evaluate/addEvaluateTeacher',
};


export const DVAKEYS = {
  ACCOUNT,
  SCHOOL,
  STUDENT,
  COURSE,
  ARRANGEMENT,
  ATTENDANCE,
  CLASSROOM,
  EVALUATE,
};
