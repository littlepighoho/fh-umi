import React from 'react';
import  {Input, Icon,Card,Table,Form,Popconfirm,Modal,Button} from 'antd'
import "./index.less"

const { Search } = Input;

const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class SchoolView extends React.PureComponent {

  state={
    searchText: ''
  };
  constructor(props) {
    super(props)
  this.columns = [{
    title: 'id',
    key: 'id',
    dataIndex: 'id',
    ...this.getColumnSearchProps('id'),
  },
  {
    title: '学校名字',
    key: 'schoolName',
    dataIndex: 'schoolName',
    editable: true,
    ...this.getColumnSearchProps('schoolName'),
  },
  {
    title: '联系方式',
    key: 'schoolPhone',
    dataIndex: 'schoolPhone',
    editable: true,
  },
  {
    title: '地址',
    key: 'schoolAddress',
    dataIndex: 'schoolAddress',
  },
  {
    title: '删除',
    dataIndex: 'delete',
    render: (text, record) =>
      this.state.dataSource.length >= 1 ? (
        <Popconfirm title="确定要删除吗?" onConfirm={() => this.handleDelete(record.key)}>
          <a>删除</a>
        </Popconfirm>
      ) : null,
  },
  ];
  this.state={
    count:4
  }
}
  // //点击
  // onRowClick = (record,index) =>{
  //   let seltctKey = [index];
  //   // Modal.info({
  //   //   title:'message',
  //   // });
  //   this.setState({
  //     selectedRowKeys:seltctKey,
  //     selectedItem:record
  //   })
  // };

  componentDidMount(){
    const data =[
      {
        id:'1',
        schoolName:'北京师范大学珠海分校',
        schoolAddress:'广东省珠海市',
        schoolPhone:'111111111111',
      },
      {
        id:'2',
        schoolName:'Jack',
        schoolAddress:'1',
        schoolPhone:'1',
      },
      {
        id:'3',
        schoolName:'Jack',
        schoolAddress:'1',
        schoolPhone:'1',
      },
    ]
    data.map((item,index) => {
      item.key = index;
  })
  this.setState({
      dataSource:data
  })
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

    // 新建
    handleAdd = () => {
      const { count, dataSource } = this.state;
      const newData = {
        key: count,
        id: count,
        schoolName: '',
        schoolAddress: '',
        schoolPhone:''
      };
      this.setState({
        dataSource: [...dataSource, newData],
        count: count + 1,
      });
    };
    handleSave = row => {
      const newData = [...this.state.dataSource];
      const index = newData.findIndex(item => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      this.setState({ dataSource: newData });
    };
    //搜索
    handleSearch = (selectedKeys, confirm) => {
      confirm();
      this.setState({ searchText: selectedKeys[0] });
    };
    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`请输入 ${dataIndex}`}
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
            查找
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
  render(){

      // const {selectedRowKeys} = this.state;
      // 选择按钮联动
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };
      const columns = this.columns.map(col => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave,
          }),
        };
      });
    return (
      <div className="school_message">
        <Card title="学校管理" className="school_card">
          <div>
            <Search
            className="school_searchId"
            placeholder="请输入id"
            // onSearch={() => this.handleReset()}
            enterButton />
            <Search
            className="school_searchName"
            placeholder="请输入学校名称"
            onSearch={value => console.log(value)}
            enterButton />
            <Button type="primary" onClick={this.handleDelete}  icon="delete" className="school_delete"/>
            <Button type="primary" onClick={this.handleAdd}  icon="plus" className="school_add"/>
            <Button type="primary" icon="edit" className="school_add"/>
          </div>
          <Table
           components={components}
            className="school_table"
            bordered
            columns={columns}
            rowSelection = {rowSelection}
            dataSource={this.state.dataSource}
            rowClassName={() => 'editable-row'}
            // pagination={false}  //是否分页
            // onRow={(record,index) =>{
            //   return{
            //     onClick:()=>{
            //       this.onRowClick(record,index)
            //     } //点击行
            //   }
            // }}
          >
          </Table>
        </Card>
      </div>
    );
  }
}

export default SchoolView;
