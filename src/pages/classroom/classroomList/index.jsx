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

class ClassroomList extends Component {
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

  handleAddClassroom = () => {

  };

  render() {
    const {
      school,
      classroom,
      classroomLoading,
      form,
    } = this.props;
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
          <p>未安排</p>
        </div>
      </div>
    );

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
                onClick={this.handleAddClassroom}
              >
                <div className={styles.cardItemContent}>
                    创建教室
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
                  <Tooltip key="edit" title="编辑">
                    <Icon type="edit" />
                  </Tooltip>,
                  <Tooltip key="share" title="指派" >
                    <Icon type="share-alt" />
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
export default connect(({ school, classroom, loading }) => ({
  school,
  classroom,
  classroomLoading: loading.models.classroom,
}))(WarpForm);
