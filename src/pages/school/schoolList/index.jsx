import { Button, Card, Icon, List, Typography, Modal, Form, Input  } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import router from 'umi/router';
import { DVAKEYS } from '@/constant/dvaKeys';
import get from 'lodash/get';
import { findDOMNode } from 'react-dom';

const { Paragraph } = Typography;
const FormItem = Form.Item;
const { TextArea } = Input;
const { confirm } = Modal;

@connect(({ school, loading }) => ({
  school,
  loading: loading.models.school,
}))
class SchoolList extends Component {
  static fetchSchoolList = (nextProps) => {
    nextProps.dispatch({
      type: DVAKEYS.SCHOOL.GET_SCHOOL_LIST,
      payload: {
        params: {
          limit: 99999,
          page: 1,
        },
      },
    })
  };

  state = {
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

  addBtn = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: DVAKEYS.SCHOOL.GET_SCHOOL_LIST,
      payload: {
        params: {
          limit: 99999,
          page: 1,
        },
      },
    });
  }

  handleSchoolClick = (id) => {
    router.push(`/school/${id}`)
  };

  handleAddClick = () => {
    this.setState({
      visible: true,
    })
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      dispatch({
        type: DVAKEYS.SCHOOL.ADD_SCHOOL,
        payload: {
          ...fieldsValue,
        },
      }).then(() => {
        this.setState({
          visible: false,
        })
        SchoolList.fetchSchoolList({
          dispatch,
        })
      });
    });
  };

  handleDelClick = (item) => {
    const { dispatch } = this.props;
    confirm({
      title: '删除学校',
      content: `您确认要删除该学校：${item.name} 吗？`,
      onOk() {
        dispatch({
          type: DVAKEYS.SCHOOL.DELETE_SCHOOL,
          payload: {
            schoolId: item.id,
          },
        }).then(() => {
          SchoolList.fetchSchoolList({
            dispatch,
          })
        })
      },
    });
  };

  render() {
    const {
      school,
      loading,
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { schoolEntities } = school;
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          写最少的代码
        </p>
        <div className={styles.contentLink}>
        </div>
      </div>
    );
    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );
    const nullData = {};

    const renderModalContent = () => (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="学校名称" {...this.formLayout}>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入学校名称',
                },
              ],
              initialValue: '',
            })(<Input placeholder="" />)}
          </FormItem>
          <FormItem {...this.formLayout} label="简介">
            {getFieldDecorator('description', {
              rules: [
                {
                  message: '请输入简介',
                  required: true,
                },
              ],
              initialValue: '',
            })(<TextArea rows={2} placeholder="" />)}
          </FormItem>
        </Form>
      );
    return (
      <PageHeaderWrapper content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List
            rowKey="id"
            loading={loading}
            grid={{
              gutter: 24,
              lg: 3,
              md: 2,
              sm: 1,
              xs: 1,
            }}
            dataSource={[nullData, ...schoolEntities]}
            renderItem={item => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[<a key="option1">xx人</a>, <a onClick={() => this.handleDelClick(item)}>删除</a>]}
                    >
                      <Card.Meta
                        onClick={() => this.handleSchoolClick(item.id)}
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={<a>{item.name}</a>}
                        description={
                          <Paragraph
                            className={styles.item}
                            ellipsis={{
                              rows: 3,
                            }}
                          >
                            {item.description}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button
                    type="dashed"
                    className={styles.newButton}
                    ref={component => {
                      // eslint-disable-next-line  react/no-find-dom-node
                      this.addBtn = findDOMNode(component);
                    }}
                    onClick={this.handleAddClick}
                  >
                    <Icon type="plus" /> 新增学校
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>
        <Modal
          title="创建学校"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          okText="确认"
          cancelText="取消"
          destroyOnClose
          onCancel={this.handleCancel}
        >
          {renderModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(SchoolList);
