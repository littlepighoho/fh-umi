import {
  Avatar,
  Card,
  Col,
  Icon,
  List,
  Row,
  Skeleton,
  Statistic,
  Form,
  Modal,
  Input,
  InputNumber,
  Select,
  TimePicker,
} from 'antd';
import React, { Component } from 'react';
import Link from 'umi/link';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import Radar from './components/Radar';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import { DVAKEYS } from '@/constant/dvaKeys';
import get from 'lodash/get';

const { Option } = Select;
const FormItem = Form.Item;

const PageHeaderContent = ({ courseEntity }) => {
  const loading = courseEntity && Object.keys(courseEntity).length;

  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          {courseEntity.name}
        </div>
        <div>
          {courseEntity.description}
        </div>
      </div>
    </div>
  );
};

const ExtraContent = ({ arrangementEntities }) => {
  if (!arrangementEntities) {
    return (
      <Skeleton
        paragraph={{
          rows: 1,
        }}
        active
      />
    )
  }
  return (
    <div className={styles.extraContent}>
      <div className={styles.statItem}>
        <Statistic title="排课数" value={arrangementEntities.length} />
      </div>
      <div className={styles.statItem}>
        <Statistic title="学生数" value={8} suffix="人" />
      </div>
      <div className={styles.statItem}>
        <Statistic title="报名" value={223} suffix="人/次"/>
      </div>
    </div>
  )
};

@connect(
  ({ arrangement, course, loading, student }) => ({
    arrangement,
    course,
    student,
    arrangementLoading: loading.models.arrangement,
    activitiesLoading: loading.effects['courseAndcourseManage/fetchActivitiesList'],
  }),
)
class CourseManage extends Component {

  static fetchArrangementList = nextProps => {
    nextProps.dispatch({
      type: DVAKEYS.ARRANGEMENT.GET_ARRANGEMENT_LIST,
      payload: {
        schoolId: nextProps.schoolId,
        courseId: nextProps.courseId,
        params: {
          limit: 9999,
          page: 1,
        },
      },
    })
  };

  state = {
    arrangementMode: 'hide',
    studentMode: 'hide',
    visible: false,
    current: undefined,
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
    const { dispatch, match } = this.props;
    dispatch({
      type: DVAKEYS.COURSE.GET_COURSE_ENTITY,
      payload: {
        courseId: match.params.cid,
        schoolId: match.params.sid,
      },
    });
    dispatch({
      type: DVAKEYS.STUDENT.GET_STUDENT_LIST,
      payload: {
        schoolId: match.params.sid,
        params: {
          page: 1,
          limit: 9999999,
        },
      },
    });
    dispatch({
      type: DVAKEYS.ARRANGEMENT.GET_ARRANGEMENT_LIST,
      payload: {
        params: {
          limit: 99999,
          page: 1,
        },
        courseId: match.params.cid,
        schoolId: match.params.sid,
      },
    });
  }

  renderActivities = item => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }

      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  handleAllClick = key => {
    this.setState({
      arrangementMode: key,
    });
  };

  handleStudentAllClick = key => {
    this.setState({
      studentMode: key,
    });
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
    const { dispatch, form, match } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (current) {
        const start_time = fieldsValue.start_time.format('X');
        const end_time = fieldsValue.end_time.format('X');
        dispatch({
          type: DVAKEYS.ARRANGEMENT.EDIT_ARRANGEMENT,
          payload: {
            schoolId: match.params.sid,
            courseId: match.params.cid,
            arrangementId: id,
            ...fieldsValue,
            start_time,
            end_time,
          },
        }).then(() => {
          this.setState({
            visible: false,
          });
          CourseManage.fetchArrangementList({
            dispatch,
            schoolId: match.params.sid,
            courseId: match.params.cid,
          })
        })
      } else {
        console.log(fieldsValue.start_time)
        const start_time = fieldsValue.start_time.format('X');
        const end_time = fieldsValue.end_time.format('X');
        dispatch({
          type: DVAKEYS.ARRANGEMENT.ADD_ARRANGEMENT,
          payload: {
            schoolId: match.params.sid,
            courseId: match.params.cid,
            ...fieldsValue,
            start_time,
            end_time,
          },
        }).then(() => {
          this.setState({
            visible: false,
          });
          CourseManage.fetchArrangementList({
            dispatch,
            schoolId: match.params.sid,
            courseId: match.params.cid,
          })
        })
      }
    })
  };

  render() {
    const links = [
      {
        title: '学校',
        url: `/school/${get(this.props.course, 'courseEntity.school.id', null)}`,
      },
    ];
    const {
      form,
      arrangementLoading,
      course,
      arrangement,
      student,
    } = this.props;
    const { current, visible } = this.state;
    const { getFieldDecorator } = form;
    const { arrangementEntities } = arrangement;
    const { courseEntity } = course;
    const { studentEntities } = student;
    const getModalContent = () => <Form onSubmit={this.handleSubmit}>
      <FormItem label="排课名称" {...this.formLayout}>
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '请输入排课名称',
            },
          ],
          initialValue: get(current, 'name', ''),
        })(<Input placeholder="" />)}
      </FormItem>
      <FormItem label="开始周" {...this.formLayout}>
        {getFieldDecorator('start_week', {
          rules: [
            {
              required: true,
              message: '请选择开始周',
            },
          ],
          initialValue: get(current, 'start_week', 1),
        })(<InputNumber min={1} />)}
      </FormItem>
      <FormItem label="结束周" {...this.formLayout}>
        {getFieldDecorator('end_week', {
          rules: [
            {
              required: true,
              message: '请选择结束周',
            },
          ],
          initialValue: get(current, 'end_week', 17),
        })(<InputNumber min={1} />)}
      </FormItem>
      <FormItem label="周几" {...this.formLayout}>
        {getFieldDecorator('day_of_week', {
          rules: [
            {
              required: true,
              message: '请选择周几',
            },
          ],
          initialValue: get(current, 'day_of_week', 1),
        })(<Select>
          <Option value={1}>周一</Option>
          <Option value={2}>周二</Option>
          <Option value={3}>周三</Option>
          <Option value={4}>周四</Option>
          <Option value={5}>周五</Option>
          <Option value={6}>周六</Option>
          <Option value={0}>周日</Option>
        </Select>)}
      </FormItem>
      <FormItem label="单双周" {...this.formLayout}>
        {getFieldDecorator('odd_even', {
          rules: [
            {
              required: true,
              message: '请选择单双周',
            },
          ],
          initialValue: get(current, 'odd_even', 0),
        })(<Select>
          <Option value={0}>单双周</Option>
          <Option value={1}>单周</Option>
          <Option value={2}>双周</Option>
        </Select>)}
      </FormItem>
      <FormItem label="开始节" {...this.formLayout}>
        {getFieldDecorator('start_section', {
          rules: [
            {
              required: true,
              message: '请选择开始节',
            },
          ],
          initialValue: get(current, 'start_section', 1),
        })(<InputNumber min={1} />)}
      </FormItem>
      <FormItem label="结束节" {...this.formLayout}>
        {getFieldDecorator('end_section', {
          rules: [
            {
              required: true,
              message: '请选择结束节',
            },
          ],
          initialValue: get(current, 'end_section', 2),
        })(<InputNumber min={1} />)}
      </FormItem>
      <FormItem label="开始时间" {...this.formLayout}>
        {getFieldDecorator('start_time', {
          rules: [
            {
              required: true,
              message: '请选择开始时间',
            },
          ],
          initialValue: moment(get(current, 'start_time', 0)),
        })(<TimePicker />)}
      </FormItem>
      <FormItem label="结束时间" {...this.formLayout}>
        {getFieldDecorator('end_time', {
          rules: [
            {
              required: true,
              message: '请选择结束时间',
            },
          ],
          initialValue: moment(get(current, 'end_time', 0)),
        })(<TimePicker />)}
      </FormItem>
    </Form>;
    return (
      <PageHeaderWrapper
        content={<PageHeaderContent courseEntity={courseEntity} />}
        extraContent={<ExtraContent arrangementEntities={arrangementEntities}/>}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{
                marginBottom: 24,
              }}
              title="进行中的排课"
              bordered={false}
              extra={<Link onClick={() => this.handleAllClick(this.state.arrangementMode === 'all' ? 'hide' : 'all')}>{this.state.arrangementMode === 'all' ? '收起' : '全部'} </Link>}
              loading={arrangementLoading}
              bodyStyle={{
                padding: 0,
              }}
            >
              <Card.Grid
                className={styles.projectGrid}
                key="add"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                onClick={this.showModal}
              >
                  <div style={{ height: '95px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div>
                    <Icon type="plus" /> 添加排课
                  </div>
                </div>
              </Card.Grid>
              {arrangementEntities.map((item, index) => {
                if (this.state.arrangementMode === 'hide') {
                  if (index <= 4) {
                    return <Card.Grid className={styles.projectGrid} key={item.id}>
                      <Card
                        bodyStyle={{
                          padding: 0,
                        }}
                        bordered={false}
                      >
                        <Card.Meta
                          title={
                            <div className={styles.cardTitle}>
                              <Avatar size="small" src={item.logo} />
                              <Link >{item.name}</Link>
                            </div>
                          }
                          description="暂无简介"
                        />
                        <div className={styles.projectItemContent}>
                          <span>{item.start_week} 至 {item.end_week} 周 周 {item.day_of_week} {item.start_section} ～ {item.end_section} 节</span>
                          <Link></Link>
                          <span className={styles.datetime} title={item.update_time}>
                        {moment(item.create_time).fromNow()}
                      </span>
                        </div>
                      </Card>
                    </Card.Grid>
                  }
                  return null
                }
                return <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card
                    bodyStyle={{
                      padding: 0,
                    }}
                    bordered={false}
                  >
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link >{item.name}</Link>
                        </div>
                      }
                      description="暂无简介"
                    />
                    <div className={styles.projectItemContent}>
                      <span>{item.start_week} 至 {item.end_week} 周 周 {item.day_of_week} {item.start_section} ～ {item.end_section} 节</span>
                      <Link></Link>
                      <span className={styles.datetime} title={item.update_time}>
                      {moment(item.create_time).fromNow()}
                    </span>
                    </div>
                  </Card>
                </Card.Grid>
              }).filter(item => !!item)}
            </Card>
            <Card
              bodyStyle={{
                padding: 0,
              }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              // loading={}
            >
              {/*<List*/}
                {/*loading={activitiesLoading}*/}
                {/*renderItem={item => this.renderActivities(item)}*/}
                {/*dataSource={activities}*/}
                {/*className={styles.activitiesList}*/}
                {/*size="large"*/}
              {/*/>*/}
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{
                marginBottom: 24,
              }}
              title="便捷导航"
              bordered={false}
              bodyStyle={{
                padding: 0,
              }}
            >
              <EditableLinkGroup  links={links} linkElement={Link} />
            </Card>
            <Card
              style={{
                marginBottom: 24,
              }}

              bordered={false}
              title="数据"
              // loading={radarData.length === 0}
            >
              {/*<div className={styles.chart}>*/}
                {/*<Radar hasLegend height={343} data={radarData} />*/}
              {/*</div>*/}
            </Card>
            <Card
              bodyStyle={{
                paddingTop: 12,
                paddingBottom: 12,
              }}
              bordered={false}
              title="参与学生"
              loading={arrangementLoading}
              extra={<a onClick={() => this.handleStudentAllClick(this.state.studentMode === 'all' ? 'hide' : 'all')}>{this.state.studentMode === 'all' ? '收起' : '全部'}</a>}
            >
              <div className={styles.members}>
                <Row gutter={6}>
                  {studentEntities.map((item, index) => {
                    if (this.state.studentMode === 'hide') {
                      if (index < 8) {
                        return <Col span={6} key={`members-item-${item.id}`}>
                          <Link to={item.href}>
                            <span className={styles.member}>{item.realname}</span>
                          </Link>
                        </Col>
                      }
                      return null
                    }
                    return (
                      <Col span={6} key={`members-item-${item.id}`}>
                        <Link to={item.href}>
                          <span className={styles.member}>{item.realname}</span>
                        </Link>
                      </Col>
                    )
                  }).filter(item => !!item)}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
        <Modal
          title="排课创建"
          destroyOnClose
          visible={visible}
          okText="确认"
          cancelText="取消"
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(CourseManage);
