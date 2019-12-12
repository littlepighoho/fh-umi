import { Card, Form, List, Typography, Empty } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import AvatarList from './components/AvatarList';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import { DVAKEYS } from '@/constant/dvaKeys';
import router from 'umi/router';

const FormItem = Form.Item;
const { Paragraph } = Typography;


class CourseList extends Component {
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
      type: DVAKEYS.COURSE.INIT_COURSE_LIST,
    })
  }

  handleCourseClick = (item) => {
    router.push(`/course/${item.school.id}/${item.id}`)
  };

  render() {
    const {
      loading,
      form,
      school,
      course,
    } = this.props;
    const { schoolEntities } = school;
    const { chooseSchool, courseEntities } = course;
    const { getFieldDecorator } = form;
    const cardList = courseEntities && (
      <List
        rowKey="id"
        loading={loading}
        locale={{ emptyText: chooseSchool ? <Empty description="暂无课程"/> : <Empty description="请选择学校"/> }}
        grid={{
          gutter: 24,
          xl: 4,
          lg: 3,
          md: 3,
          sm: 2,
          xs: 1,
        }}
        dataSource={courseEntities}
        renderItem={item => (
          <List.Item onClick={() => this.handleCourseClick(item)}>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.name} src="https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png" />}
            >
              <Card.Meta
                title={<a>{item.name}</a>}
                description={
                  <Paragraph
                    className={styles.item}
                    ellipsis={{
                      rows: 2,
                    }}
                  >
                    {item.description}
                  </Paragraph>
                }
              />
              <div className={styles.cardItemContent}>
                {/*<span>{moment(item.start_time).format}</span>*/}
                <div className={styles.avatarList}>
                </div>
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
        <div className={styles.coverCardList}>
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
          <div className={styles.cardList}>{cardList}</div>
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
        type: DVAKEYS.COURSE.GET_COURSE_LIST,
        payload: {
          schoolId,
          params: {
            page: 1,
            limit: 10000,
          },
        },
      });
    } else {
      dispatch({
        type: DVAKEYS.COURSE.INIT_COURSE_LIST,
      })
    }
  },
})(CourseList);
export default connect(({ school, course, loading }) => ({
  school,
  course,
  loading: loading.global,
}))(WarpForm);
