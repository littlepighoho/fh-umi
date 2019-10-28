import React from 'react';
import { Row, Col, Table, Button, Modal, Form, Input, DatePicker } from 'antd';
import './course.scss';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class CourseView extends React.PureComponent {
  static defaultProps = {

  };

  columns = [
    {
      title: '课程名称',
      dataIndex: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '负责老师',
      dataIndex: 'author',
    },
    {
      title: '时间',
      dataIndex: 'time',
    },
    {
      title: '操作',
      dataIndex: 'action',
    }
  ];
  data = [
    {
      key: '1',
      name: 'C语言',
      author: '测试老师',
      time: '2019/10/10 08:00:00 - 2019/10/20 10:00:00',
      action: <div><Button type="primary">编辑</Button><Button type="danger">删除</Button></div>
    },
    {
      key: '2',
      name: '软件测试',
      author: '测试老师',
      time: '2019/10/10 08:00:00 - 2019/10/20 10:00:00',
      action: <div><Button type="primary">编辑</Button><Button type="danger">删除</Button></div>

    },
    {
      key: '3',
      name: '软件工程',
      author: '测试老师',
      time: '2019/10/10 08:00:00 - 2019/10/20 10:00:00',
      action: <div><Button type="primary">编辑</Button><Button type="danger">删除</Button></div>

    },
    {
      key: '4',
      name: '测试',
      author: '测试老师',
      time: '2019/10/10 08:00:00 - 2019/10/20 10:00:00',
      action: <div><Button type="primary">编辑</Button><Button type="danger">删除</Button></div>

    },
  ];
  state = {
    visible: false,
    name: '',
    author: '',

  }
  handleCourseClick = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleInputChange = keyName => ({ target }) => {
    this.setState({
      [keyName]: target.value,
    })
  }
  render(){
    return (
      <div className="course-view">
        <div className="course-action-bar">
          <div>
          </div>
          <div>
            <Button type="primary" onClick={this.handleCourseClick}>
              创建课程
            </Button>
          </div>
        </div>
        <Row>
          <Table
            columns={this.columns}
            dataSource={this.data}
          />
        </Row>
        <Modal
          title="创建课程"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={400}
        >
          <Form.Item>
            <span style={{ color: 'black'}}>课程名称:</span>
            <Input onChange={this.handleInputChange('name')} value={this.state.name}/>
          </Form.Item>
          <Form.Item>
            <span style={{ color: 'black'}}>负责老师:</span>
            <Input onChange={this.handleInputChange('author')} value={this.state.author}/>
          </Form.Item>
          <Form.Item>
            <span style={{ color: 'black'}}>时间选择:</span>
            <RangePicker />
            <br />
          </Form.Item>
        </Modal>
      </div>
    )
  }
}

export default CourseView;
