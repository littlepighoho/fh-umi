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
  };

  formLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 13,
    },
  };

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
    })
    this.setState({
      drawerVisible: true,
    })
  };

  handleDrawerClose = () => {
    this.setState({
      drawerVisible: false,
    })
  }

  render() {
    const {
      school,
      classroom,
      classroomLoading,
      form,
    } = this.props;
    const { current, visible, drawerVisible } = this.state;
    const { getFieldDecorator } = form;
    const { schoolEntities } = school;
    const { chooseSchool, classroomEntities } = classroom;
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

    const getModalContent = () => <Form onSubmit={this.handleSubmit}>
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
      </Form>;

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
                      {schoolEntities.map((item) => (
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
          placement="right"
          closable={false}
          onClose={this.handleDrawerClose}
          visible={drawerVisible}
        >

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
    // 表单项变化时请求数据
    // 模拟查询表单生效
  },
})(ClassroomList);
export default connect(({ school, classroom, loading }) => ({
  school,
  classroom,
  classroomLoading: loading.models.classroom,
}))(WarpForm);
