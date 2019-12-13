import { Button, Card, Col, Form, Icon, List, Rate, Select, Tag } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ArticleListContent from './components/ArticleListContent';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import { DVAKEYS } from '@/constant/dvaKeys';
import get from 'lodash/get';

const FormItem = Form.Item;

class Evaluate extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'courseAndevaluate/fetch',
      payload: {
        count: 5,
      },
    });
  }

  render() {
    const {
      form,
      studentLoading,
      evaluateLoading,
      evaluate,
      student,
    } = this.props;
    const { getFieldDecorator } = form;
    const { studentEntities } = student;
    const { evaluateEntities } = evaluate;
    const data = evaluateEntities.map(item => {
      const stu = studentEntities.filter(it => it.id === item.author.id)[0];
      return {
        ...item,
        author: stu,
      }
    });
    return (
      <PageHeaderWrapper
        title="评价"
        className={styles.pageHeader}

      >
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow
              title="评价类型"
              block
              style={{
                paddingBottom: 11,
              }}

            >
              <FormItem>
                {getFieldDecorator('mode')(
                  <TagSelect expandable hideCheckAll defaultValue={["student"]}>
                    <TagSelect.Option value="student">学生对老师</TagSelect.Option>
                    <TagSelect.Option value="course">学生对课程</TagSelect.Option>
                    <TagSelect.Option value="teacher">老师对学生</TagSelect.Option>
                  </TagSelect>,
                )}
              </FormItem>
            </StandardFormRow>

          </Form>
        </Card>
        <Card
          style={{
            marginTop: 24,
          }}
          bordered={false}
          bodyStyle={{
            padding: '8px 32px 32px 32px',
          }}
        >
          <List
            size="large"
            loading={evaluateLoading && studentLoading}
            rowKey="id"
            itemLayout="vertical"
            dataSource={data}
            renderItem={item => (
              <List.Item
                key={item.id}
                extra={<div className={styles.listItemExtra} />}
              >
                <List.Item.Meta
                  title={
                    <a className={styles.listItemMetaTitle} href={item.href}>
                      {get(item, 'author.code', '')} {get(item, 'author.realname', '')}
                    </a>
                  }
                  description={
                    <Rate disabled defaultValue={item.star} />
                  }
                />
                <ArticleListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

const WarpForm = Form.create({
  onValuesChange({ dispatch, match }, value) {
    // 表单项变化时请求数据
    // 模拟查询表单生效
    const { mode } = value;
    if (mode[0] === 'student') {
      dispatch({
        type: DVAKEYS.EVALUATE.GET_EVALUATE_STUDENT_LIST,
        payload: {
          schoolId: match.params.sid,
          courseId: match.params.cid,
          params: {
            page: 1,
            limit: 100000,
          },
        },
      });
    } else if (mode[0] === 'course') {
      dispatch({
        type: DVAKEYS.EVALUATE.GET_EVALUATE_COURSE_LIST,
        payload: {
          schoolId: match.params.sid,
          courseId: match.params.cid,
          params: {
            page: 1,
            limit: 100000,
          },
        },
      })
    } else {
      // dispatch({
      //   type: DVAKEYS.EVALUATE.ADD_EVALUATE_STUDENT,
      //   payload: {
      //     schoolId: match.params.sid,
      //     courseId: match.params.cid,
      //     data: [{code: '1701030158', star: 2, message: '123123'}]
      //   }
      // })
      dispatch({
        type: DVAKEYS.EVALUATE.GET_EVALUATE_TEACHER_LIST,
        payload: {
          schoolId: match.params.sid,
          courseId: match.params.cid,
          params: {
            page: 1,
            limit: 100000,
          },
        },
      })
    }
  },
})(Evaluate);
export default connect(({ student, evaluate, loading }) => ({
  evaluate,
  student,
  studentLoading: loading.models.student,
  evaluateLoading: loading.models.evaluate,

}))(WarpForm);
