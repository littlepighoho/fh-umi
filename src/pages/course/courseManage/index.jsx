import { Avatar, Card, Col, Icon, List, Row, Skeleton, Statistic } from 'antd';
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
          limit: nextProps.limit,
          page: 1,
        },
      }
    })
  };

  state = {
    arrangementMode: 'hide',
    studentMode: 'hide',
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

  render() {
    const links = [
      {
        title: '学校',
        url: `/school/${get(this.props.course, 'courseEntity.school.id', null)}`,
      },
    ];
    const {
      activities,
      arrangementLoading,
      activitiesLoading,
      radarData,
      course,
      arrangement,
      student,
    } = this.props;
    const { arrangementEntities } = arrangement;
    const { courseEntity } = course;
    const { studentEntities } = student;
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
              <Card.Grid className={styles.projectGrid} key="add" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
      </PageHeaderWrapper>
    );
  }
}

export default CourseManage;
