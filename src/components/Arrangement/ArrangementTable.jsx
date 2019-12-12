import React from 'react';
import { Table } from 'antd';


class ArrangementTable extends React.PureComponent {

  state = {

  };

  columns = [
    {
      title: '排课名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
      ),
    },
  ];

  render() {
    return (
      <div>
        <Table columns={this.columns} dataSource={this.props.data} />
      </div>
    )
  }
}

export default ArrangementTable;
