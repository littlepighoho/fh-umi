import {
  Avatar,
  Card,
  Empty,
  Form,
  Icon, Input,
  List, Modal,
  Tooltip,
  InputNumber,
  Drawer,
  Table,
  Button, Select,
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import get from 'lodash/get';
import { DVAKEYS } from '@/constant/dvaKeys';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';

const FormItem = Form.Item;
const { confirm } = Modal;

class ClassroomList extends Component {
  static fetchClassroomList = nextProps => {
    nextProps.dispatch({
      type: DVAKEYS.CLASSROOM.GET_CLASSROOM_LIST,
      payload: {
        schoolId: nextProps.schoolId,
        params: {
          page: 1,
          limit: 9999,
        },
      },
    })
  };

  state = {
    current: undefined,
    visible: false,
    childrenDrawer: false,
    currentDrawer: undefined,
  };

  formLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 13,
    },
  };

  columns = [{
    key: 'name',
    title: '排课名称',
    dataIndex: 'name',
    render: (_, text) => <div>{text.arrangement.name}</div>
  }, {
    key: 'action',
    title: '操作',
    dataIndex: 'time',
    render: (_, item) => <Icon onClick={() => this.handleDelUser(item)} type="delete" style={{ color: 'red', cursor: 'pointer'}}></Icon>
  }];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: DVAKEYS.SCHOOL.GET_SCHOOL_LIST,
      payload: {
        params: {
          page: 1,
          limit: 9999,
        },
      },
    });
    dispatch({
      type: DVAKEYS.CLASSROOM.INIT_CLASSROOM_LIST,
    })
  }

  handleDelUser = (item) => {
    const { dispatch } = this.props;
    dispatch({
      type: DVAKEYS.CLASSROOM.DELETE_CLASSROOM_USER,
      payload: {
        schoolId: this.state.currentDrawer.school.id,
        classroomId: item.classroom.id,
        userId: item.id,
      },
    }).then(() => {
      dispatch({
        type: DVAKEYS.CLASSROOM.GET_CLASSROOM_USER_ENTITY,
        payload: {
          schoolId: this.state.currentDrawer.school.id,
          classroomId: this.state.currentDrawer.id,
        },
      })
    })
  };

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (current) {
        dispatch({
          type: DVAKEYS.CLASSROOM.EDIT_CLASSROOM,
          payload: {
            schoolId: fieldsValue.school[0],
            classroomId: id,
            name: fieldsValue.name,
            size: fieldsValue.size,
          },
        }).then(() => {
          this.setState({
            visible: false,
          });
          ClassroomList.fetchClassroomList({
            dispatch,
            schoolId: fieldsValue.school[0],
          })
        })
      } else {
        const data = (new Array(fieldsValue.number)).fill({ name: fieldsValue.name, size: fieldsValue.size });
        dispatch({
          type: DVAKEYS.CLASSROOM.ADD_CLASSROOM,
          payload: {
            schoolId: fieldsValue.school[0],
            data,
          },
        }).then(() => {
          this.setState({
            visible: false,
          });
          ClassroomList.fetchClassroomList({
            dispatch,
            schoolId: fieldsValue.school[0],
          })
        })
      }
    })
  };

  handleClassroomDel = item => {
    const { dispatch } = this.props;
    confirm({
      title: '删除课室',
      content: `您确认要删除该课室：${item.name} 吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: DVAKEYS.CLASSROOM.DELETE_CLASSROOM,
          payload: {
            schoolId: item.school.id,
            classroomId: item.id,
          },
        }).then(() => {
          ClassroomList.fetchClassroomList({
            dispatch,
            schoolId: item.school.id,
          })
        })
      },
    });
  };

  showDrawer = item => {
    this.props.dispatch({
      type: DVAKEYS.CLASSROOM.GET_CLASSROOM_USER_ENTITY,
      payload: {
        classroomId: item.id,
        schoolId: item.school.id,
      },
    }).then(() => {
      this.setState({
        drawerVisible: true,
        currentDrawer: item,
      })
    })
  };

  handleDrawerClose = () => {
    this.setState({
      drawerVisible: false,
      currentDrawer: undefined,
    })
  }

  showChildrenDrawer = () => {
    this.props.dispatch({
      type: DVAKEYS.COURSE.GET_COURSE_LIST,
      payload: {
        schoolId: this.state.currentDrawer.school.id,
        params: {
          limit: 9999,
          page: 1,
        },
      },
    }).then(() => {
      this.setState({
        childrenDrawer: true,
      })
    })
  };

  closeChildrenDrawer = () => {
    this.setState({
      childrenDrawer: false,
    })
  };

  handleUserSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      dispatch({
        type: DVAKEYS.CLASSROOM.ADD_CLASSROOM_USER,
        payload: {
          schoolId: fieldsValue.course.school.id,
          classroomId: this.state.currentDrawer.id,
          arrangement: fieldsValue.arrangement.id,
        },
      }).then(() => {
        this.setState({
          childrenDrawer: false,
        })
        dispatch({
          type: DVAKEYS.CLASSROOM.GET_CLASSROOM_USER_ENTITY,
          payload: {
            schoolId: fieldsValue.course.school.id,
            classroomId: this.state.currentDrawer.id,
          },
        })
      })
    })
  };

  render() {
    const {
      school,
      classroom,
      classroomLoading,
      form,
      course,
      arrangement,
    } = this.props;
    const { current, visible, drawerVisible } = this.state;
    const { getFieldDecorator, getFieldsValue} = form;
    const { schoolEntities } = school;
    const { courseEntities } = course;
    const { chooseSchool, classroomEntities, classroomUser } = classroom;
    const { arrangementEntities } = arrangement;
    const CardInfo = ({ activeUser }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>座位数</p>
          <p>{activeUser}</p>
        </div>
        <div>
          <p>使用情况</p>
          <p>未使用</p>
        </div>
      </div>
    );

    const cardList = classroomEntities && (
      <List
        rowKey="id"
        grid={{
          gutter: 24,
          xl: 4,
          lg: 3,
          md: 3,
          sm: 2,
          xs: 1,
        }}
        loading={classroomLoading}
        locale={{ emptyText: chooseSchool ? <Empty description="暂无课室"/> : <Empty description="请选择学校"/> }}
        dataSource={chooseSchool ? [{ name: 'add' }, ...classroomEntities] : []}
        renderItem={item => {
          if (item.name === 'add') {
            return <List.Item key={item.id} >
              <Card
                hoverable
                bodyStyle={{
                  paddingBottom: 20,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                }}
                style={{ height: '182px' }}
                onClick={this.showModal}
              >
                <div className={styles.cardItemContent}>
                    增加课室
                </div>
              </Card>
            </List.Item>
          }
          return <List.Item key={item.id}>
              <Card
                hoverable
                bodyStyle={{
                  paddingBottom: 20,
                }}
                actions={[
                  <Tooltip key="edit" title="编辑" onClick={() => this.showEditModal(item)}>
                    <Icon type="edit" />
                  </Tooltip>,
                  <Tooltip key="share" title="指派详情" onClick={() => this.showDrawer(item)}>
                    <Icon type="share-alt" />
                  </Tooltip>,
                  <Tooltip key="delete" title="删除" onClick={() => this.handleClassroomDel(item)} >
                    <Icon type="delete" />
                  </Tooltip>,
                ]}
              >
                <Card.Meta title={item.name} />
                <div className={styles.cardItemContent}>
                  <CardInfo
                    activeUser={item.size}
                  />
                </div>
              </Card>
            </List.Item>
        }}
      />
    );
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          享受最好的体验
        </p>
        <div className={styles.contentLink}>
        </div>
      </div>
    );

    const getModalContent = () => {
      if (!this.state.visible) return null;
      if (this.state.visible) { return <Form onSubmit={this.handleSubmit}>
        <FormItem label="课室名字" {...this.formLayout}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入课室名字',
              },
            ],
            initialValue: get(current, 'name', ''),
          })(<Input placeholder="" />)}
        </FormItem>
        <FormItem label="座位个数" {...this.formLayout}>
          {getFieldDecorator('size', {
            rules: [
              {
                required: true,
                message: '请选择座位个数',
              },
            ],
            initialValue: get(current, 'size', 1),
          })(<InputNumber min={1} />)}
        </FormItem>
        {!get(current, 'id', null) && <FormItem label="课室数量" {...this.formLayout}>
          {getFieldDecorator('number', {
            rules: [
              {
                required: true,
                message: '请选择课室数量',
              },
            ],
            initialValue: 1,
          })(<InputNumber min={1} />)}
        </FormItem>}
      </Form>;}
    }

    return (
      <PageHeaderWrapper content={content} >
        <div className={styles.filterCardList}>
          <Card bordered={false}>
            <Form layout="inline">
              <StandardFormRow
                title="所属学校"
                block
                style={{
                  paddingBottom: 11,
                }}
              >
                <FormItem>
                  {getFieldDecorator('school')(
                    <TagSelect
                      expandable
                      hideCheckAll
                    >
                      {schoolEntities.map(item => (
                        <TagSelect.Option value={item.id}>{item.name}</TagSelect.Option>
                      ))}
                    </TagSelect>,
                  )}
                </FormItem>
              </StandardFormRow>
            </Form>
          </Card>
          <br />
          {cardList}
        </div>
        <Modal
          title={`课室${current ? '编辑' : '创建'}`}
          destroyOnClose
          visible={visible}
          okText="确认"
          cancelText="取消"
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          {getModalContent()}
        </Modal>
        <Drawer
          title="课室指派情况"
          destroyOnClose
          placement="right"
          closable={false}
          width={500}
          onClose={this.handleDrawerClose}
          visible={drawerVisible}
        >
          <Form.Item>
            <Button type="primary" onClick={this.showChildrenDrawer}>
              添加指派
            </Button>
          </Form.Item>
          <Table
            columns={this.columns}
            dataSource={classroomUser}
            pagination={false}
          />
          <Drawer
            title="添加指派"
            width={320}
            closable={false}
            destroyOnClose
            onClose={this.closeChildrenDrawer}
            visible={this.state.childrenDrawer}
          >
            <Form onSubmit={this.handleUserSubmit}>
              <FormItem label="课程" {...this.formLayout}>
                {getFieldDecorator('course', {
                  rules: [
                    {
                      required: true,
                      message: '请选择课程',
                    },
                  ],
                })(
                  <Select placeholder="请选择">
                    {courseEntities.map(item => (
                        <Select.Option value={item}>{item.name}</Select.Option>
                      ))}
                  </Select>,
                )}
              </FormItem>
              <FormItem label="排课" {...this.formLayout}>
                {getFieldDecorator('arrangement', {
                  rules: [
                    {
                      required: true,
                      message: '请选择排课',
                    },
                  ],
                })(
                  <Select disabled={getFieldsValue(['course']).course === undefined} placeholder="请选择">
                    {arrangementEntities.map(item => (
                      <Select.Option value={item}>{item.name}</Select.Option>
                    ))}
                  </Select>,
                )}
              </FormItem>
            </Form>
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e8e8e8',
                padding: '10px 16px',
                textAlign: 'right',
                left: 0,
                background: '#fff',
                borderRadius: '0 0 4px 4px',
              }}
            >
              <Button
                style={{
                  marginRight: 8,
                }}
                onClick={this.closeChildrenDrawer}
              >
                取消
              </Button>
              <Button onClick={this.handleUserSubmit} type="primary">
                确认
              </Button>
            </div>
          </Drawer>
        </Drawer>
      </PageHeaderWrapper>
    );
  }
}

const WarpForm = Form.create({
  onValuesChange({ dispatch }, value) {
    if (get(value, 'school', null)) {
      const { school } = value;
      const schoolId = school[0];
      if (schoolId) {
        dispatch({
          type: DVAKEYS.CLASSROOM.GET_CLASSROOM_LIST,
          payload: {
            schoolId,
            params: {
              page: 1,
              limit: 9999,
            },
          },
        });
      } else {
        dispatch({
          type: DVAKEYS.CLASSROOM.INIT_CLASSROOM_LIST,
        })
      }
    }
    if (get(value, 'course', null)) {
      const { course } = value;
      const item = course;
      if (item) {
        dispatch({
          type: DVAKEYS.ARRANGEMENT.GET_ARRANGEMENT_LIST,
          payload: {
            schoolId: item.school.id,
            courseId: item.id,
            params: {
              limit: 9999,
              page: 1,
            },
          },
        })
      }
    }
    // 表单项变化时请求数据
    // 模拟查询表单生效
  },
})(ClassroomList);
export default connect(({ school, classroom, course, arrangement, loading }) => ({
  school,
  course,
  arrangement,
  classroom,
  classroomLoading: loading.models.classroom,
}))(WarpForm);
