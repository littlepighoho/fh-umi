import React from 'react';
import { Row, Col, Table, Button, Modal, Form, Input, DatePicker, Rate } from 'antd';
import './course.scss';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const { useState } = React;
export default function() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [desc, setDesc] = useState('');
  const handleClick = () => {
    setVisible(true)
  }
  const data = [
    {
      key: '1',
      name: 'C语言',
      author: '测试老师',
      time: '2019/10/10 08:20:13',
      star: <Rate  defaultValue={3} />,
      action: <div><Button onClick={handleClick} type="primary">评价</Button></div>
    },
    {
      key: '2',
      name: '软件测试',
      author: '测试老师',
      time: '2019/10/10 08:22:30',
      star: <Rate disabled defaultValue={0} />,
      action: <div><Button onClick={handleClick} type="primary">评价</Button></div>

    },
    {
      key: '3',
      name: '软件工程',
      author: '测试老师',
      time: '2019/10/10 08:33:42',
      star: <Rate disabled defaultValue={4} />,
      action: <div><Button onClick={handleClick} type="primary">评价</Button></div>

    },
    {
      key: '4',
      name: '测试',
      author: '测试老师',
      time: '2019/10/10 08:42:15',
      star: <Rate disabled defaultValue={5} />,
      action: <div><Button onClick={handleClick} type="primary">评价</Button></div>

    },
  ];
  const columns = [
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
  const handleOk = () => {
    setVisible(false)
  }
  const handleInputChange = (keyName) => ({ target }) => {
    if(keyName === 'Desc') {
      setDesc(target.value);
    }
  }
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
          columns={columns}
          dataSource={data}
        />
      </Row>
      <Modal
        title="评价"
        visible={visible}
        onOk={handleOk}
        okText="确认"
        cancelText="取消"
        onCancel={() => {setVisible(false)}}
        width={400}
      >
        <Form.Item>
          <span style={{ color: 'black'}}>评价信息:</span>
          <Input.TextArea onChange={handleInputChange('Desc')} value={desc}/>
        </Form.Item>
        <Form.Item>
          <span style={{ color: 'black'}}>评价星级:</span>
          <Rate />
        </Form.Item>
      </Modal>
    </div>
  )
}
