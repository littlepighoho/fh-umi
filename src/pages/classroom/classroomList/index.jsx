import {
  Avatar,
  Card,
  Col,
  Dropdown,
  Empty,
  Form,
  Icon,
  List,
  Menu,
  Row,
  Select,
  Tooltip
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import numeral from 'numeral';
import { DVAKEYS } from '@/constant/dvaKeys';

import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const { Option } = Select;
const FormItem = Form.Item;
export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';
  let result = val;

  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }

  return result;
}

class ClassroomList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'classroomAndclassroomList/fetch',
      payload: {
        count: 8,
      },
    });
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

  render() {
    const {
      classroomAndclassroomList: { list },
      loading,
      school,
      classroom,
      form,
    } = this.props;
    const { getFieldDecorator } = form;
    const { schoolEntities } = school;
    const { chooseSchool, classroomEntities } = classroom;
    const CardInfo = ({ activeUser  }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>座位数</p>
          <p>{activeUser}</p>
        </div>
      </div>
    );

    // const formItemLayout = {
    //   wrapperCol: {
    //     xs: {
    //       span: 24,
    //     },
    //     sm: {
    //       span: 16,
    //     },
    //   },
    // };
    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
            3d menu item
          </a>
        </Menu.Item>
      </Menu>
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
        loading={loading}
        locale={{ emptyText: chooseSchool ? <Empty description="暂无课室"/> : <Empty description="请选择学校"/> }}
        dataSource={classroomEntities}
        renderItem={item => (
          <List.Item key={item.id}>
            <Card
              hoverable
              bodyStyle={{
                paddingBottom: 20,
              }}
              actions={[
                <Tooltip key="download" title="下载">
                  <Icon type="download" />
                </Tooltip>,
                <Tooltip key="edit" title="编辑">
                  <Icon type="edit" />
                </Tooltip>,
                <Tooltip title="分享" key="share">
                  <Icon type="share-alt" />
                </Tooltip>,
                <Dropdown key="ellipsis" overlay={itemMenu}>
                  <Icon type="ellipsis" />
                </Dropdown>,
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
        )}
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
      </PageHeaderWrapper>
    );
  }
}

const WarpForm = Form.create({
  onValuesChange({ dispatch }, value) {
    // 表单项变化时请求数据
    // 模拟查询表单生效
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
  },
})(ClassroomList);
export default connect(({ classroomAndclassroomList, school, classroom, loading }) => ({
  classroomAndclassroomList,
  school,
  classroom,
  loading: loading.models.classroomAndclassroomList,
}))(WarpForm);
