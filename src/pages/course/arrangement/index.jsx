import {
  Badge,
  Button,
  Card,
  Statistic,
  Descriptions,
  Dropdown,
  Icon,
  Menu,
  Table,
  Tag,
  message,
  Modal,
} from 'antd';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import React, { Component, Fragment } from 'react';

import { connect } from 'dva';
import get from 'lodash/get';
import moment from 'moment';
import router from 'umi/router';
import styles from './style.less';
import { DVAKEYS } from '@/constant/dvaKeys';
import { importAttendanceExcel, importExcel } from '@/utils/xlsx_importer';

const { confirm } = Modal;

const mobileMenu = (
  <Menu>
    <Menu.Item key="1">操作一</Menu.Item>
    <Menu.Item key="2">操作二</Menu.Item>
    <Menu.Item key="3">选项一</Menu.Item>
    <Menu.Item key="4">选项二</Menu.Item>
    <Menu.Item key="">选项三</Menu.Item>
  </Menu>
);


@connect(({ attendance, arrangement, course, loading, student }) => ({
  course,
  arrangement,
  attendance,
  student,
  studentLoading: loading.models.student,
  arrangementLoading: loading.models.arrangement,
  attendanceLoading: loading.models.attendance,
}))

class Arrangement extends Component {
  state = {
    mode: '',
  };

  inputRef = null;
  inputStudentRef = null;
  studentColumns = [
    {
      title: '学号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '姓名',
      dataIndex: 'realname',
      key: 'realname',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => (
        <div>
          <span>
            <Icon type="delete" style={{ color: 'red', cursor: 'pointer' }} onClick={() => this.handleStudentDelClick(item)}/>
          </span>
        </div>
      ),
    },
  ];

  columns = [
    {
      title: '学号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '迟到',
      dataIndex: 'late',
      key: 'late',
    },
    {
      title: '缺勤',
      dataIndex: 'absent',
      key: 'absent',
    },
    {
      title: '请假',
      dataIndex: 'leaver',
      key: 'leaver',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => (
        <div>
          <Tag color="gold" onClick={() => this.handleAttendanceClick('late', item)}>迟到</Tag>
          <Tag color="red" onClick={() => this.handleAttendanceClick('absent', item)}>缺勤</Tag>
          <Tag color="cyan" onClick={() => this.handleAttendanceClick('leaver', item)}>请假</Tag>
          <span>
            <Icon type="delete" style={{ color: 'red', cursor: 'pointer' }} onClick={() => this.handleAttendanceDelClick(item)}/>
          </span>
        </div>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: DVAKEYS.COURSE.GET_COURSE_ENTITY,
      payload: {
        schoolId: match.params.sid,
        courseId: match.params.cid,
      },
    });
    dispatch({
      type: DVAKEYS.ATTENDANCE.GET_ATTENDANCE_LIST,
      payload: {
        schoolId: match.params.sid,
        courseId: match.params.cid,
        arrangementId: match.params.aid,
        params: {
          limit: 9999,
          page: 1,
        },
      },
    });
    dispatch({
      type: DVAKEYS.ARRANGEMENT.GET_ARRANGEMENT_STUDENT_LIST,
      payload: {
        schoolId: match.params.sid,
        courseId: match.params.cid,
        arrangementId: match.params.aid,
      },
    });
    dispatch({
      type: DVAKEYS.ARRANGEMENT.GET_ARRANGEMENT_ENTITY,
      payload: {
        schoolId: match.params.sid,
        courseId: match.params.cid,
        arrangementId: match.params.aid,
      },
    });
  }

  handleStudentDelClick = item => {
    const { dispatch, match } = this.props;
    dispatch({
      type: DVAKEYS.ARRANGEMENT.DELETE_ARRANGEMENT_STUDENT,
      payload: {
        schoolId: match.params.sid,
        courseId: match.params.cid,
        arrangementId: match.params.aid,
        ids: [item.id],
      },
    }).then(() => {
      dispatch({
        type: DVAKEYS.ARRANGEMENT.GET_ARRANGEMENT_STUDENT_LIST,
        payload: {
          schoolId: match.params.sid,
          courseId: match.params.cid,
          arrangementId: match.params.aid,
        },
      })
    })
  };

  handleAttendanceDelClick = item => {
    const { dispatch, match } = this.props;
    dispatch({
      type: DVAKEYS.ATTENDANCE.DELETE_ATTENDANCE,
      payload: {
        schoolId: item.school.id,
        courseId: item.course.id,
        arrangementId: item.arrangement.id,
        attendanceId: item.id,
      },
    }).then(() => {
      dispatch({
        type: DVAKEYS.ATTENDANCE.GET_ATTENDANCE_LIST,
        payload: {
          schoolId: match.params.sid,
          courseId: match.params.cid,
          arrangementId: match.params.aid,
          params: {
            limit: 9999,
            page: 1,
          },
        },
      });
    })
  };

  handleXlsxUpload = () => {
    this.inputRef.click();
    this.setState({
      mode: 'attendance',
    })
  };
  handleStudentXlsxUpload = () => {
    this.inputStudentRef.click();
    this.setState({
      mode: 'student',
    })
  }

  handleXlsxChange = e => {
    const getResult = data => {
      const { dispatch, match } = this.props;
      if (this.state.mode === 'student') {
          dispatch({
            type: DVAKEYS.ARRANGEMENT.ADD_ARRANGEMENT_STUDENT,
            payload: {
              schoolId: match.params.sid,
              courseId: match.params.cid,
              arrangementId: match.params.aid,
              data,
            },
          }).then(() => {
            dispatch({
              type: DVAKEYS.ARRANGEMENT.GET_ARRANGEMENT_STUDENT_LIST,
              payload: {
                schoolId: match.params.sid,
                courseId: match.params.cid,
                arrangementId: match.params.aid,
              },
            })
          })
      } else {
        dispatch({
          type: DVAKEYS.ATTENDANCE.ADD_ATTENDANCE,
          payload: {
            schoolId: match.params.sid,
            courseId: match.params.cid,
            arrangementId: match.params.aid,
            data,
          },
        }).then(() => {
          dispatch({
            type: DVAKEYS.ATTENDANCE.GET_ATTENDANCE_LIST,
            payload: {
              schoolId: match.params.sid,
              courseId: match.params.cid,
              arrangementId: match.params.aid,
              params: {
                limit: 9999,
                page: 1,
              },
            },
          });
        })
      }
    };

    if (e.target.files.length > 0) {
      if (this.state.mode === 'attendance') {
        importAttendanceExcel(e.target.files)
          .then(data => getResult(data))
          .catch(ex => {
            message.error('解析Excel文件失败');
          });
      } else {
        importExcel(e.target.files)
          .then(data => getResult(data))
          .catch(ex => {
            message.error('解析Excel文件失败');
          });
      }
    }
  };

  handleAttendanceClick = (key, item) => {
    const { dispatch, match } = this.props;
    dispatch({
      type: DVAKEYS.ATTENDANCE.EDIT_ATTENDANCE,
      payload: {
        ...item,
        schoolId: item.school.id,
        courseId: item.course.id,
        arrangementId: item.arrangement.id,
        attendanceId: item.id,
        [key]: item[key] + 1,
      },
    }).then(() => {
      dispatch({
        type: DVAKEYS.ATTENDANCE.GET_ATTENDANCE_LIST,
        payload: {
          schoolId: match.params.sid,
          courseId: match.params.cid,
          arrangementId: match.params.aid,
          params: {
            limit: 9999,
            page: 1,
          },
        },
      });
    })
  };

  handleArrangementDelClick = () => {
    confirm({
      title: '删除排课',
      content: '您确认要删除本排课吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        const { dispatch, match } = this.props;
        dispatch({
          type: DVAKEYS.ARRANGEMENT.DELETE_ARRANGEMENT,
          payload: {
            schoolId: match.params.sid,
            courseId: match.params.cid,
            arrangementId: match.params.aid,
          },
        }).then(() => {
          router.push(`/course/${match.params.sid}/${match.params.cid}`);
        })
      },
    })
  };

  render() {
    const { studentLoading, arrangementLoading, attendanceLoading, course, attendance, arrangement, student } = this.props;
    const { arrangementEntity } = arrangement;
    const { courseEntity } = course;
    const { studentEntities } = student;
    const { attendanceEntities } = attendance;
    const arrangementStudentEntities = arrangement.studentEntities;
    let leaverNumber = 0;
    let absentNumber = 0;
    const data = attendanceEntities.map(item => {
      const stu = studentEntities.filter(it => it.id === item.student.id)[0];
      if (get(item, 'leaver', null)) {
        leaverNumber += 1;
      }
      if (get(item, 'absent', null)) {
        absentNumber += 1;
      }
      return {
        ...item,
        code: get(stu, 'code', 0),
        name: get(stu, 'realname', ''),
      }
    });
    const extra = (
      <div className={styles.moreInfo}>
        <Statistic title="学生数量" value={200}/>
        <Statistic title="缺勤 / 请假" value={`${absentNumber} / ${leaverNumber}`}/>
      </div>
    );
    const action = (
      <RouteContext.Consumer>
        {({ isMobile }) => {
          if (isMobile) {
            return (
              <Dropdown.Button
                type="primary"
                icon={<Icon type="down" />}
                overlay={mobileMenu}
                placement="bottomRight"
              >
                主操作
              </Dropdown.Button>
            );
          }

          return (
            <Fragment>
              <Button size="small" >修改</Button>
              <Button size="small" type="danger" onClick={this.handleArrangementDelClick}>删除</Button>
            </Fragment>
          );
        }}
      </RouteContext.Consumer>
    );
    const description = (
      <RouteContext.Consumer>
        {({ isMobile }) => (
          <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
            <Descriptions.Item label="负责人">{get(courseEntity, 'author.nickname', '')}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{moment(arrangementEntity.create_time * 1000).format('YYYY-MM-DD HH:mm')}</Descriptions.Item>
            <Descriptions.Item label="排课时间">{`${arrangementEntity.start_week} 至 ${arrangementEntity.end_week} ${(arrangementEntity.odd_even === 0) ? '周' : (arrangementEntity.odd_even === 1 ? '单周' : '双周')} 周 ${arrangementEntity.day_of_week} ${arrangementEntity.start_section} - ${arrangementEntity.end_section} 节 ${moment(arrangementEntity.start_time * 1000).format('HH:mm')} ~ ${moment(arrangementEntity.end_time * 1000).format('HH:mm')}`}</Descriptions.Item>
          </Descriptions>
        )}
      </RouteContext.Consumer>
    );
    return (
      <PageHeaderWrapper
        title={arrangementEntity.name}
        content={description}
        extra={action}
        extraContent={extra}
        className={styles.pageHeader}

      >
        <div className={styles.main}>
          <GridContent>
            <Card
              className={styles.tabsCard}
              bordered={false}
              title="学生"
              extra={<Button onClick={this.handleStudentXlsxUpload} >导入</Button>}
            >
              <input
                type="file"
                name="excel-file"
                onChange={this.handleXlsxChange}
                style={{ display: 'none' }}
                ref={node => {
                  this.inputStudentRef = node;
                }}
              />
              <Table
                pagination={false}
                loading={arrangementLoading}
                dataSource={arrangementStudentEntities}
                columns={this.studentColumns}
              />
            </Card>
            <Card
              className={styles.tabsCard}
              bordered={false}
              title="考勤"
              extra={<Button onClick={this.handleXlsxUpload}>导入</Button>}
            >
              <input
                type="file"
                name="excel-file"
                onChange={this.handleXlsxChange}
                style={{ display: 'none' }}
                ref={node => {
                  this.inputRef = node;
                }}
              />
              <Table
                pagination={false}
                loading={attendanceLoading && studentLoading}
                dataSource={data}
                columns={this.columns}
              />
            </Card>
          </GridContent>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Arrangement;
