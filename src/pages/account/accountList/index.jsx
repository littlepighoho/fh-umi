import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Icon,
  Input,
  List,
  Menu,
  Modal,
  Radio,
  Row,
  Select,
  Tag,
  Result,
} from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import get from 'lodash/get';
import styles from './style.less';
import { DVAKEYS } from '@/constant/dvaKeys';
import { ResourcesRequest } from '@/utils/resources_request';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;
const { confirm } = Modal;

@connect(({ account, loading }) => ({
  account,
  loading: loading.models.account,
}))
class AccountList extends Component {
  static fetchAccountList = nextProps => {
    nextProps.dispatch({
      type: DVAKEYS.ACCOUNT.GET_ACCOUNT_LIST,
      payload: {
        params: {
          key: nextProps.key ? nextProps.key : '',
          role: nextProps.role ? nextProps.role : '',
          limit: nextProps.pageSize,
          page: nextProps.page,
        },
      },
    })
  };

  state = {
    visible: false,
    done: false,
    current: undefined,
    currentRole: 'all',
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
      type: DVAKEYS.ACCOUNT.GET_ACCOUNT_LIST,
      payload: {
        params: {},
      },
    });
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

  handleDone = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      if (current) {
        let sex = 0;
        if (fieldsValue.sex === '男') {
          sex = 1;
        } else if (fieldsValue.sex === '女') {
          sex = 2;
        }
        dispatch({
          type: DVAKEYS.ACCOUNT.EDIT_ACCOUNT,
          payload: {
            accountId: id,
            ...fieldsValue,
            sex,

          },
        }).then(() => {
          AccountList.fetchAccountList({
            dispatch,
            pageSize: 10,
            page: 1,
          })
        });
      } else {

      }
    });
  };

  handleRoleChange = ({ target }) => {
    if (target.value === 'admin') {
      AccountList.fetchAccountList({
        dispatch: this.props.dispatch,
        role: 99,
        page: 1,
        key: this.state.key,
        pageSize: 10,
      })
    } else if (target.value === 'normal') {
      AccountList.fetchAccountList({
        dispatch: this.props.dispatch,
        role: '0',
        key: this.state.key,
        page: 1,
        pageSize: 10,
      })
    } else {
      AccountList.fetchAccountList({
        dispatch: this.props.dispatch,
        page: 1,
        key: this.state.key,
        pageSize: 10,
      })
    }
    this.setState({
      currentRole: target.value,
    })
  };

  handleSearchChange = value => {
    this.setState({
      key: value,
    })
    let role = '';
    if (this.state.currentRole === 'normal') {
      role = 0;
    } else if (this.state.currentRole === 'admin') {
      role = 99;
    }
    AccountList.fetchAccountList({
      dispatch: this.props.dispatch,
      key: value,
      role,
      page: 1,
      pageSize: 10,
    })
  };

  handleDelAccount = item => {
    const { dispatch } = this.props;
    confirm({
      title: '删除账户',
      content: '确定要删除该账户吗？（此操作不可逆）',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: DVAKEYS.ACCOUNT.DELETE_ACCOUNT,
          payload: {
            accountId: item.id,
          },
        })
      },
      onCancel: () => {
      },
    })
  };

  render() {
    const {
      account,
      loading,
    } = this.props;
    const { accountList, accountEntities } = account;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current } = this.state;

    const modalFooter = done
      ? {
          footer: null,
          onCancel: this.handleDone,
        }
      : {
          okText: '保存',
          onOk: this.handleSubmit,
          onCancel: this.handleCancel,
        };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup value={this.state.currentRole} onChange={this.handleRoleChange}>
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="normal">普通账户</RadioButton>
          <RadioButton value="admin">管理员</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={value => this.handleSearchChange(value)} />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: accountList.pagination.limit,
      current: accountList.pagination.page,
      total: accountList.pagination.total,
      onChange: (page, pageSize) => {
        let role = '';
        if (this.state.currentRole === 'normal') {
          role = 0;
        } else if (this.state.currentRole === 'admin') {
          role = 99;
        }
        AccountList.fetchAccountList({
          dispatch: this.props.dispatch,
          page,
          pageSize,
          role,
          key: this.state.key,
        });
      },
      onShowSizeChange: (_, size) => {
        let role = '';
        if (this.state.currentRole === 'normal') {
          role = 0;
        } else if (this.state.currentRole === 'admin') {
          role = 99;
        }
        AccountList.fetchAccountList({
          dispatch: this.props.dispatch,
          page: 1,
          pageSize: size,
          role,
          key: this.state.key,
        });
      },
    };

    /* eslint-disable */
    const ListContent = ({ data: { nickname, create_time, phone, sex, role } }) => (
      <div className={styles.listContent}>
        <div className={`${styles.listContentItem} ${styles.listContentItemNickname}`}>
          <span>昵称</span>
          <p>{nickname}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>创建时间</span>
          <p>{moment(create_time * 1000).format('YYYY-MM-DD HH:mm')}</p>
        </div>
        <div className={`${styles.listContentItem} ${styles.listContentItemPhone}`}>
          <span>电话</span>
          <p>{phone === '' ? '无': phone}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>性别</span>
          <p>{sex === 1  ?
            <span><Icon type="man" style={{ color: '#1890ff'}}/></span> :
            (sex === 2 ? <span><Icon type="woman" style={{ color: '#eb2f96'}} /></span> : <div>未知</div>)}
          </p>
        </div>
        <div className={`${styles.listContentItem} ${styles.listContentItemRole}`}>
          <span>角色</span>
          <p>{role === 99 ? <Tag color="orange">管理员</Tag> : <Tag color="blue">普通账户</Tag>}</p>
        </div>
      </div>
    );
    /* eslint-disable */


    const getModalContent = () => {
      if (done) {
        return (
          <Result
            status="success"
            title="操作成功"
            subTitle=""
            extra={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }

      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="昵称" {...this.formLayout}>
            {getFieldDecorator('nickname', {
              rules: [
                {
                  required: true,
                  message: '请输入昵称',
                },
              ],
              initialValue: get(current, 'nickname', ''),
            })(<Input placeholder="" />)}
          </FormItem>
          <FormItem label="电话" {...this.formLayout}>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: false,
                  message: '请输入电话号码',
                },
              ],
              initialValue: get(current, 'phone', ''),
            })(<Input placeholder="" />)}
          </FormItem>
          <FormItem label="性别" {...this.formLayout}>
            {getFieldDecorator('sex', {
              rules: [
                {
                  required: true,
                  message: '请选择性别',
                },
              ],
              initialValue: get(current, 'sex', null) === 1 ? '男' : (get(current, 'sex', null) === 2 ? '女' : '未知'),
            })(
              <Select placeholder="请选择">
                <SelectOption value="0">未知</SelectOption>
                <SelectOption value="男">男</SelectOption>
                <SelectOption value="女">女</SelectOption>
              </Select>,
            )}
          </FormItem>
          <FormItem {...this.formLayout} label="一句话描述">
            {getFieldDecorator('motto', {
              rules: [
                {
                  message: '一句话描述',
                  required: false,
                },
              ],
              initialValue: get(current, 'motto', ''),
            })(<TextArea rows={2} placeholder="" />)}
          </FormItem>
        </Form>
      );
    };

    return (
      <>
        <PageHeaderWrapper>
          <div className={styles.standardList}>
            <Card bordered={false}>
              <Row>
                <Col sm={8} xs={24}>
                  <Info title="全部账户" value="20个" bordered />
                </Col>
                <Col sm={8} xs={24}>
                  <Info title="普通账户" value="19个" bordered />
                </Col>
                <Col sm={8} xs={24}>
                  <Info title="管理员" value="1个" />
                </Col>
              </Row>
            </Card>

            <Card
              className={styles.listCard}
              bordered={false}
              title="基本列表"
              style={{
                marginTop: 24,
              }}
              bodyStyle={{
                padding: '0 32px 40px 32px',
              }}
              extra={extraContent}
            >
              <Button
                type="dashed"
                style={{
                  width: '100%',
                  marginBottom: 8,
                }}
                icon="plus"
                onClick={this.showModal}
                ref={component => {
                  // eslint-disable-next-line  react/no-find-dom-node
                  this.addBtn = findDOMNode(component);
                }}
              >
                添加
              </Button>
              <List
                size="large"
                rowKey="id"
                loading={loading}
                pagination={paginationProps}
                dataSource={accountEntities}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <a
                        key="edit"
                        onClick={e => {
                          e.preventDefault();
                          this.showEditModal(item);
                        }}
                      >
                        编辑
                      </a>,
                      <a
                        key="delete"
                        onClick={e => {
                          e.preventDefault();
                          this.handleDelAccount(item);
                        }}
                        style={{ color: '#f5222d' }}
                      >
                        删除
                      </a>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={ResourcesRequest(item.avator)} shape="square" size="large" />}
                      title={<a href={item.href}>{item.username}</a>}
                      description={item.motto === '' ? '无个人简介' : item.motto}
                    />
                    <ListContent data={item} />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </PageHeaderWrapper>

        <Modal
          title={done ? null : (`账户${current ? '编辑' : '添加'}`)}
          className={styles.standardListForm}
          width={640}
          bodyStyle={
            done
              ? {
                  padding: '72px 0',
                }
              : {
                  padding: '28px 0 0',
                }
          }
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </>
    );
  }
}

export default Form.create()(AccountList);
