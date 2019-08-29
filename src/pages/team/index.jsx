import { Table, Input, Button, Icon } from 'antd';
import React from 'react';
import './team.scss';
import { connect } from 'dva';
import router from 'umi/router';

const data = [
  {
    key: '1',
    name: 'fire',
    full:'否',
    publish:"公开",
  },
];

class team extends React.Component {
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`搜索 ${dataIndex}`}
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
          搜索
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          取消
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
    // render: text => (
    //   <Highlighter
    //     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //     searchWords={[this.state.searchText]}
    //     autoEscape
    //     textToHighlight={text.toString()}
    //   />
    // ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columns = [
      {
        title: '队伍名字',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
        ...this.getColumnSearchProps('队伍名字'),
      },
      {
        title: '是否满员',
        dataIndex: 'full',
        key: 'full',
        width: '10%',
        ...this.getColumnSearchProps('是否满员'),
      },
      {
        title: '是否公开',
        dataIndex: 'publish',
        key: 'publish',
        width:'10%',
        ...this.getColumnSearchProps('是否公开'),
      },
    ];
    return <Table columns={columns} dataSource={data} />;
  }
}

export default team;
