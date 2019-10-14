import React from 'react';
import { Row, Col, Table, Button, Modal, Form, Input, DatePicker, Rate } from 'antd';
import './course.scss';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class EvaluateView extends React.PureComponent {
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
      title: '评价等级',
      dataIndex: 'star',
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
  handleClick = () => {
    this.setState({
      visible: true,
    })
  }
  data = [
    {
      key: '1',
      name: 'C语言',
      author: '测试老师',
      time: '2019/10/10 08:20:13',
      star: <Rate  defaultValue={3} />,
      action: <div><Button onClick={this.handleClick} type="primary">评价</Button></div>
    },
    {
      key: '2',
      name: '软件测试',
      author: '测试老师',
      time: '2019/10/10 08:22:30',
      star: <Rate disabled defaultValue={0} />,
      action: <div><Button onClick={this.handleClick} type="primary">评价</Button></div>

    },
    {
      key: '3',
      name: '软件工程',
      author: '测试老师',
      time: '2019/10/10 08:33:42',
      star: <Rate disabled defaultValue={4} />,
      action: <div><Button onClick={this.handleClick} type="primary">评价</Button></div>

    },
    {
      key: '4',
      name: '测试',
      author: '测试老师',
      time: '2019/10/10 08:42:15',
      star: <Rate disabled defaultValue={5} />,
      action: <div><Button onClick={this.handleClick} type="primary">评价</Button></div>

    },
  ];
  state = {
    visible: false,
    name: '',
    author: '',
    desc: '',

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
          </div>
        </div>
        <Row>
          <Table
            columns={this.columns}
            dataSource={this.data}
          />
        </Row>
        <Modal
          title="评价"
          visible={this.state.visible}
          onOk={this.handleOk}
          okText="确认"
          cancelText="取消"
          onCancel={this.handleCancel}
          width={400}
        >
          <Form.Item>
            <span style={{ color: 'black'}}>评价信息:</span>
            <Input.TextArea onChange={this.handleInputChange('name')} value={this.state.desc}/>
          </Form.Item>
          <Form.Item>
            <span style={{ color: 'black'}}>评价星级:</span>
              <Rate />
          </Form.Item>
        </Modal>
      </div>
    )
  }
}

export default EvaluateView;
