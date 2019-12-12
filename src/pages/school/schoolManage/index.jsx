import { Badge, Card, Descriptions, Divider, DatePicker, Table, Modal, Form, Input, Button } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { withRouter } from 'umi';
import get from 'lodash/get';
import moment from 'moment';
import router from 'umi/router';
import styles from './style.less';
import { DVAKEYS } from '@/constant/dvaKeys';

const { confirm } = Modal;
const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

@withRouter
@connect(({ school, student, loading, course }) => ({
  school,
  student,
  course,
  studentLoading: loading.models.student,
  courseLoading: loading.models.course,
}))
class SchoolManage extends Component {
  // 刷新列表
  static fetchStudentList = nextProps => {
    nextProps.dispatch({
      type: DVAKEYS.STUDENT.GET_STUDENT_LIST,
      payload: {
        schoolId: nextProps.schoolId,
        params: {
          limit: nextProps.pageSize,
          page: nextProps.page,
        },
      },
    })
  };

  static fetchCourseList = nextProps => {
    nextProps.dispatch({
      type: DVAKEYS.COURSE.GET_COURSE_LIST,
      payload: {
        schoolId: nextProps.schoolId,
        params: {
          limit: nextProps.pageSize,
          page: nextProps.page,
        },
      },
    })
  };

  state = {
    visible: false,
    current: undefined,
    type: undefined,
  };

  formLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 13,
    },
  };


  courseColumns = [
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, item) => <a onClick={() => router.push(`/course/${item.school.id}/${item.id}`)}>{text}</a>
    },
    {
      title: '创建人',
      dataIndex: 'author',
      key: 'author',
      render: item => item.nickname,
    },
    {
      title: '课程时间',
      dataIndex: 'courseTime',
      key: 'courseTime',
      render: (_, item) => <div>{moment(item.start_time).format('YYYY-MM-DD HH:mm:ss')} ~ {moment(item.end_time).format('YYYY-MM-DD HH:mm:ss')}</div>
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => (
        <div>
          <a style={{ marginRight: '8px' }} onClick={() => this.showEditModal('course', item)}>编辑</a>
          <a style={{ color: 'red' }} onClick={() => this.handleCourseDel(item)}>删除</a>
        </div>
      ),
    },
  ];

  studentColumns = [
    {
      title: '学号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '真实姓名',
      dataIndex: 'realname',
      key: 'realname',
    },
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
      render: text => (text === '' ? text : '无'),
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => (
          <div>
            <a style={{ marginRight: '8px' }} onClick={() => this.showEditModal('student', item)}>编辑</a>
            <a style={{ color: 'red' }} onClick={() => this.handleStudentDel(item)}>删除</a>
          </div>
        ),
    },

  ];

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch({
      type: DVAKEYS.SCHOOL.GET_SCHOOL_ENTITY,
      payload: {
        schoolId: match.params.sid,
      },
    });
    dispatch({
      type: DVAKEYS.STUDENT.GET_STUDENT_LIST,
      payload: {
        schoolId: match.params.sid,
        params: {},
      },
    });
    dispatch({
      type: DVAKEYS.COURSE.GET_COURSE_LIST,
      payload: {
        schoolId: match.params.sid,
        params: {},
      },
    });
  }

  handleStudentDel = item => {
    const { dispatch } = this.props;
    confirm({
      title: '删除学生',
      content: `您确认要删除该学生：${item.code} ${item.realname} 吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: DVAKEYS.STUDENT.DEL_STUDENT,
          payload: {
            schoolId: item.school.id,
            studentId: item.id,
          },
        }).then(() => {
          SchoolManage.fetchStudentList({
            dispatch,
            schoolId: item.school.id,
          })
        })
      },
    });
  };

  handleCourseDel = item => {
    const { dispatch } = this.props;
    confirm({
      title: '删除课程',
      content: `您确认要删除该课程：${item.name} 吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: DVAKEYS.COURSE.DELETE_COURSE,
          payload: {
            schoolId: item.school.id,
            courseId: item.id,
          },
        }).then(() => {
          SchoolManage.fetchCourseList({
            dispatch,
            schoolId: item.school.id,
          })
        })
      },
    });
  };

  showModal = key => {
    this.setState({
      visible: true,
      current: undefined,
      type: key,
    });
  };

  showEditModal = (key, item) => {
    this.setState({
      visible: true,
      current: item,
      type: key,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleCourseSubmit = e => {
    e.preventDefault();
    const { dispatch, form, match } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';
    form.validateFields((err, fieldsValue) => {
      const rangeTimeValue = fieldsValue['range-time-picker'];
      const startTime = moment(rangeTimeValue[0]).valueOf();
      const endTime = moment(rangeTimeValue[1]).valueOf();
      if (err) return;
      if (current) {
        dispatch({
          type: DVAKEYS.COURSE.EDIT_COURSE,
          payload: {
            schoolId: match.params.sid,
            courseId: id,
            ...fieldsValue,
            start_time: startTime,
            end_time: endTime,
          },
        }).then(() => {
          this.setState({
            visible: false,
          });
          SchoolManage.fetchCourseList({
            dispatch: this.props.dispatch,
            schoolId: match.params.sid,
          })
        })
      } else {
        dispatch({
          type: DVAKEYS.COURSE.ADD_COURSE,
          payload: {
            schoolId: match.params.sid,
            ...fieldsValue,
            start_time: startTime,
            end_time: endTime,
          },
        }).then(() => {
          this.setState({
            visible: false,
          });
          SchoolManage.fetchCourseList({
            dispatch: this.props.dispatch,
            schoolId: match.params.sid,
          })
        })
      }
    })
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form, match } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (current) {
        dispatch({
          type: DVAKEYS.STUDENT.EDIT_STUDENT,
          payload: {
            schoolId: match.params.sid,
            studentId: id,
            ...fieldsValue,
          },
        }).then(() => {
          this.setState({
            visible: false,
          });
          SchoolManage.fetchStudentList({
            dispatch: this.props.dispatch,
            schoolId: match.params.sid,
          })
        })
      } else {
        dispatch({
          type: DVAKEYS.STUDENT.ADD_STUDENT,
          payload: {
            schoolId: match.params.sid,
            ...fieldsValue,
          },
        }).then(() => {
          this.setState({
            visible: false,
          });
          SchoolManage.fetchStudentList({
            dispatch: this.props.dispatch,
            schoolId: match.params.sid,
          })
        })
      }
    })
  };


  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { current, visible } = this.state;
    const { school, courseLoading, studentLoading, student, course } = this.props;
    const { studentList, studentEntities } = student;
    const { courseList, courseEntities } = course;
    const { schoolEntity } = school;
    const studentPaginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: studentList.pagination.limit,
      current: studentList.pagination.page,
      total: studentList.pagination.total,
      onChange: (page, pageSize) => {
        SchoolManage.fetchStudentList({
          dispatch: this.props.dispatch,
          schoolId: schoolEntity.id,
          page,
          pageSize,
        })
      },
      onShowSizeChange: (_, size) => {
        SchoolManage.fetchStudentList({
          dispatch: this.props.dispatch,
          schoolId: schoolEntity.id,
          page: 1,
          pageSize: size,
        })
      },
    };
    const coursePaginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: courseList.pagination.limit,
      current: courseList.pagination.page,
      total: courseList.pagination.total,
      onChange: (page, pageSize) => {
        SchoolManage.fetchCourseList({
          dispatch: this.props.dispatch,
          schoolId: schoolEntity.id,
          page,
          pageSize,
        })
      },
      onShowSizeChange: (_, size) => {
        SchoolManage.fetchCourseList({
          dispatch: this.props.dispatch,
          schoolId: schoolEntity.id,
          page: 1,
          pageSize: size,
        })
      },
    };
    const getModalContent = () => {
      if (this.state.type === 'student') {
        return <Form onSubmit={this.handleSubmit}>
          <FormItem label="真实姓名" {...this.formLayout}>
            {getFieldDecorator('realname', {
              rules: [
                {
                  required: true,
                  message: '请输入真实姓名',
                },
              ],
              initialValue: get(current, 'realname', ''),
            })(<Input placeholder="" />)}
          </FormItem>
          <FormItem label="学号" {...this.formLayout}>
            {getFieldDecorator('code', {
              rules: [
                {
                  required: true,
                  message: '请输入学号',
                },
              ],
              initialValue: get(current, 'code', ''),
            })(<Input placeholder="" />)}
          </FormItem>
          <FormItem label="电话" {...this.formLayout}>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: '请输入电话',
                },
              ],
              initialValue: get(current, 'phone', ''),
            })(<Input placeholder="" />)}
          </FormItem>
        </Form>
      }
      const rangeConfig = {
        rules: [{ type: 'array', required: true, message: '请选择课程时间！' }],
      };
      return <Form { ...this.formLayout } onSubmit={this.handleCourseSubmit}>
          <Form.Item label="课程名称" >
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入课程名称',
                },
              ],
              initialValue: get(current, 'name', ''),
            })(<Input placeholder="" />)}
          </Form.Item>
          <Form.Item label="课程时间">
            {getFieldDecorator('range-time-picker', {
              ...rangeConfig,
              initialValue: current ? [moment(get(current, 'start_time', null)), moment(get(current, 'end_time', null))] : [],
            })(<RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
          </Form.Item>
          <Form.Item label="课程简介" >
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message: '请输入课程简介',
                },
              ],
              initialValue: get(current, 'description', ''),
            })(<TextArea rows={2} placeholder="" />)}
          </Form.Item>
        </Form>
    }
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Descriptions
            title="学校信息"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="学校名称">{schoolEntity.name}</Descriptions.Item>
            <Descriptions.Item label="负责人">{get(schoolEntity, 'author', '无')}</Descriptions.Item>
            <Descriptions.Item label="地址">{get(schoolEntity, 'address', '无')}</Descriptions.Item>
            <Descriptions.Item label="描述">{get(schoolEntity, 'description', '无')}</Descriptions.Item>
          </Descriptions>
          <Divider
            style={{
              marginBottom: 32,
            }}
          />
          <div className={styles['add-btn-bar']}>
            <span className={styles.title}>课程列表</span>
            <span className={styles['add-btn']}>
              <Button type="primary" size="small" onClick={() => this.showModal('course')}>创建</Button>
            </span>
          </div>
          <Table
            style={{
              marginBottom: 16,
            }}
            pagination={coursePaginationProps}
            loading={courseLoading}
            dataSource={courseEntities}
            columns={this.courseColumns}
          />
          <Divider
            style={{
              marginBottom: 32,
            }}
          />
          <div className={styles['add-btn-bar']}>
            <span className={styles.title}>学生列表</span>
            <span className={styles['add-btn']}>
              <Button type="primary" size="small" onClick={() => this.showModal('student')}>创建</Button>
            </span>
          </div>
          <Table
            style={{
              marginBottom: 16,
            }}
            pagination={studentPaginationProps}
            loading={studentLoading}
            dataSource={studentEntities}
            columns={this.studentColumns}
          />
        </Card>
        <Modal
          title={`${this.state.type === 'student' ? '学生' : '课程'}${current ? '编辑' : '创建'}`}
          destroyOnClose
          visible={visible}
          width={this.state.type === 'course' ? 600 : 500}
          okText="确认"
          cancelText="取消"
          onOk={this.state.type === 'student' ? this.handleSubmit : this.handleCourseSubmit}
          onCancel={this.handleCancel}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(SchoolManage);
