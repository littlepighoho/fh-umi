import React from 'react';
import './attendance.scss';
import { Table, Input, Button, Icon,Card, Menu, Dropdown} from 'antd';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        软件测试
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        软件工程
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        数据库
      </a>
    </Menu.Item>
  </Menu>
);
class AttendanceView extends React.PureComponent {
  state = {
    searchText: '',
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render(){
    const data = [
      {
        key: '1',
        student_number:'1701030122',
        name: '吴禹辉',
        num: 0,
        address: '17软件二班',
        time:'周一1，2节',
      },
      {
        key: '2',
        student_number:'1701030123',
        name: '冯希瑶',
        num: 0,
        address: '17软件二班',
        time:'周一1，2节',
      },
      {
        key: '3',
        student_number:'1701030124',
        name: '蔡依林',
        num: 1,
        address: '17软件二班',
        time:'周一1，2节',
      },
      {
        key: '4',
        student_number:'1701030125',
        name: '林心如',
        num: 1,
        address: '17计算机二班',
        time:'周一1，2节',
      },
      {
        key: '5',
        student_number:'1701030126',
        name: '周杰伦',
        num: 1,
        address: '17电子二班',
        time:'周一1，2节',
      },
      {
        key: '6',
        student_number:'1701030127',
        name: '林俊杰',
        num: 2,
        address: '17数媒二班',
        time:'周一1，2节',
      },

      {
        key: '7',
        student_number:'1701030128',
        name: '华晨宇',
        num: 2,
        address: '17计算机一班',
        time:'周一1，2节',
      },
      {
        key: '8',
        student_number:'1701030129',
        name: '林更新',
        num: 8,
        address: '16软件二班',
        time:'周一1，2节',
      },
      {
        key: '9',
        student_number:'1701030130',
        name: '朱一龙',
        num: 2,
        address: '16软件二班',
        time:'周一1，2节',
      },
      {
        key: '10',
        student_number:'1701030131',
        name: '杜江',
        num: 3,
        address: '16计算机二班',
        time:'周一1，2节',
      },
      {
        key: '11',
        student_number:'1701030132',
        name: '郭富城',
        num: 3,
        address: '15软件二班',
        time:'周一1，2节',
      },
      {
        key: '12',
        student_number:'1701030133',
        name: '郑爽',
        num: 0,
        address: '17软件二班',
        time:'周一1，2节',
      },
      {
        key: '13',
        student_number:'1701030134',
        name: '张艺兴',
        num: 1,
        address: '17软件二班',
        time:'周一1，2节',
      },
      {
        key: '14',
        student_number:'1701030135',
        name: '吴亦凡',
        num: 5,
        address: '17数媒二班',
        time:'周一1，2节',
      },

      {
        key: '15',
        student_number:'1701030136',
        name: '胡彦斌',
        num: 0,
        address: '17软件二班',
        time:'周一1，2节',
      },
      {
        key: '16',
        student_number:'1701030137',
        name: '陈嘉桦',
        num: 0,
        address: '17软件二班',
        time:'周一1，2节',
      },
      {
        key: '17',
        student_number:'1701030138',
        name: '吴京',
        num: 9,
        address: '15软件二班',
        time:'周一1，2节',
      },
    ];
    const columns = [
      {
        title:'学生ID',
        dataIndex:'student_number',
        key:'student_number',
        width:'10%',
        ...this.getColumnSearchProps('student_number'),
      },
      {
        title: '学生姓名',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
        ...this.getColumnSearchProps('name'),
      },

      {
        title: '班级',
        dataIndex: 'address',
        key: 'address',
        width: '10%',
        ...this.getColumnSearchProps('address'),
      },
      {
        title: '总缺勤次数',
        dataIndex: 'num',
        key: 'num',
        width: '10%',
        ...this.getColumnSearchProps('num'),
      },

      {
        title: '状态',
        dataIndex: 'now',
        key: 'now',
        width: '10%',
        ...this.getColumnSearchProps('now'),
      },


    ];

    return(
      <div>
        <Card title={"考勤 — 学生信息"} className="card">
          <Table columns={columns} dataSource={data} bordered
                 pagination={{ pageSize: 7 }}>
          </Table>
        </Card>

        {/*<Dropdown overlay={menu} placement="bottomRight" className="btn">*/}
        {/*  <Button>切换课程</Button>*/}
        {/*</Dropdown>*/}
        <Card title={"课程信息"} className="card1">
          <p>课程名称：软件测试</p>
          <p>上课时间：周一1、2节</p>
        </Card>
        <Card title={"统计"} className="card2">
            <p>更新时间：2019/10/1</p>
            <p>缺勤人数：3</p>
            <p>已取消考试资格人数:5</p>
        </Card>
      </div>

    )

  }

}

export default AttendanceView;
