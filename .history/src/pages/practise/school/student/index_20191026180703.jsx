import React from 'react';
import Highlighter from 'react-highlight-words';
import  {Input, Icon,Card,Table,Form,Popconfirm,
    Drawer,Modal,Button,message,Row,Col} from 'antd'
import "./index.less"
import { get } from 'lodash-es';
import { connect } from 'dva';
const { Search } = Input;
const { confirm } = Modal;



const mapStateTopProps = (state, props) => {

  const data =get(state.studentusers,"entities",[]);
  return {
    data,
    pagination:state.studentusers.pagination,
  }

}
@connect(mapStateTopProps)
class StudentView extends React.PureComponent {

  state = {
    InputValue: '',
    dataSource: [],
    selectedKeys: [],
    visible: false, //add
    visible1: false, // edit
    count:0,
    editData:[],
    schoolId:0,
  };
  static getDerivedStateFromProps = (nextProps, prevState) => {
    if(!prevState.hasFetchData) {
      nextProps.dispatch({
        type: 'studentusers/getList',
        payload: {
        },
      })
      return {
        ...prevState,
        hasFetchData: true,
      }
    }
  }
    handleDelete = (key) => {
        console.log(key)
    const { dataSource } = this.state;
    Modal.confirm({
        title:'删除提示',
        content: `您确定要删除这些数据吗？`,
        onOk:()=>{
            message.success('删除成功');
            // const data = dataSource.filter(item => item.id !== key) ;
            // this.setState({
            //     dataSource: data,
            // })
            this.props.dispatch({
              type: 'studentusers/deleteStudent',
              payload: {
                studentId: key,
              }
            })
        }
    });
    // console.log("key:"+key);
    };

    handleAllDelete =() =>{
        const { selectedKeys } = this.state;
        let data = this.state.dataSource;
        console.log(selectedKeys + "$$$$$$")
        if(selectedKeys != ''){
        Modal.confirm({
            title:'删除提示',
            content: `您确定要删除这些数据吗？`,
            onOk:()=>{
                message.success('删除成功');
                selectedKeys.forEach((item) =>{
                console.log(item +"%%%%%%")
                data = data.filter(it=> it.key != item);
                })
                this.setState({
                dataSource: data,
                })
            }
        })
        }
    else{
        message.error('你没有选择学生！');
    }  };

    //点击新建按钮，drawer出现
    showDrawer = () => {
    this.setState({
        visible: true,
    });
    };
    //drawer里面的关闭按钮
    onClose = () => {
    this.setState({
        visible: false,
        visible1: false,
    });
    };

        // 新建
    handleAdd = (e) => {
      const { count } = this.state;
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        this.props.dispatch({
          type: 'studentusers/setStudent',
          payload: {
            data:{
              code:values.code,
              realname:values.realname,
            }
          }
        })
        if (!err) {
          this.setState({
            visible: false,
            count:count+1,
        });
      }
      this.getDerivedStateFromProps();
      this.props.form.resetFields();
      }
  )
    };

    handleEdit =(key) =>{
        const { selectedKeys } = this.state;
        console.log(selectedKeys)
        if(selectedKeys != '') {
            if(selectedKeys.length > 1 ){
                message.error('只能选择一个学生编辑');
                return;
            }
            console.log("%%%%%%%%")
            this.setState({
                visible1: true,
                editData: this.props.data[selectedKeys]});
            }
        else{
            message.error('你没有选择学生！');
        }
    }

    handleCreate = (e) => {
      e.preventDefault();
      const { selectedKeys} = this.state;
      const data1 = this.props.data[selectedKeys];
      this.props.form.validateFields((err, values) => {
          if (err) {
          return;
          }
          this.props.dispatch({
            type: 'studentusers/editStudent',
            payload: {
              studentId: data1.studentId,
              code:values.code,
              realname:values.realname,
            }
          })
          this.props.form.resetFields();
          this.setState({
              visible1: false,
          });
      });
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
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    });
    handleSearch = (selectedKeys, confirm) => {
    confirm();
    console.log(selectedKeys[0])
    this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
    };

    renderData = () => {
      return this.props.data.map((item) => {
        return {
          realname:item.realname,
          code:item.code,
          studentId: item.id,
          accountId:item.account.id,
          create_time: item.create_time,
          update_time:item.update_time,
          schoolId:item.school.id,
        }
      })
    };


  render(){
    const { getFieldDecorator } = this.props.form;

    const columns = [
      {
        title:'真实姓名',
        key:'realname',
        dataIndex:'realname',
        ...this.getColumnSearchProps('realname'),
      },
    {
      title: 'code',
      key: 'code',
      dataIndex: 'code',
      ...this.getColumnSearchProps('code')
    },
    {
      title: '学号',
      key: 'studentId',
      dataIndex: 'studentId',
      ...this.getColumnSearchProps('studentId')
    },
    {
      title: '系统账户',
      key: 'accountId',
      dataIndex: 'accountId',
      // ...this.getColumnSearchProps('accountId'),
    },
    {
      title: '创建时间',
      key: 'create_time',
      dataIndex: 'create_time',
    },
    {
      title: '更新时间',
      key: 'update_time',
      dataIndex: 'update_time',
    },
    {
      title: '学校id',
      key: 'schoolId',
      dataIndex: 'schoolId',
    },
    {
      title: '操作',
      dataIndex: 'option',
        render: (text, record) =>
          <span>
          <a onClick={() => this.handleDelete(record.key)}>
              删除
          </a>
          </span>
    }
    ];

      const selectedKeys = this.state.selectedKeys;

      const rowSelection = {
        onChange: (selectedKeys) => {
          this.setState({
            selectedKeys,
          })
        },
      };
    return (
      <div className="student_message">
        <Card title="学生管理" className="student_card">

          <div className="student_option">
          {/* <Search placeholder="输入学生编号" className="student_searchid"
                 enterButton />
            <Search placeholder="输入学生姓名" className="student_searchname" enterButton /> */}

            <div className="student_operate">
                <Button
                type="primary"
                onClick={ this.handleAllDelete}
                icon="delete" className="student_delete"/>

                <Button type="primary"
                onClick={this.showDrawer}
                icon="plus"
                className="student_add"/>

                <Button
                type="primary"
                icon="edit"
                className="student_delete"
                onClick={this.handleEdit}/>
            </div>
          </div>
          <Table
            className="student_table"
            bordered
            columns={columns}
            rowSelection = {rowSelection}
            dataSource={this.renderData()}
          >
          </Table>
        </Card>
        {/* 添加学生弹窗 drawer */}
        <Drawer
          title="添加学生"
          width={350}
          onClose={this.onClose}
          visible={this.state.visible}
        >
            <Form onSubmit={this.handleAdd}  layout="vertical" hideRequiredMark style={{width:'300px'}}>
                    <Form.Item label="学号">
                    {getFieldDecorator('id',{
                            rules:[{required:true,message:'学号不能为空'}],
                        })(
                            <Input  placeholder="请输入用户名"/>
                        )}
                    </Form.Item>
                    <Form.Item label="姓名">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true, message: '学生姓名不为空'
                            }
                        ],
                    })(
                        <Input placeholder="请填写姓名" />
                     )}
                    </Form.Item>
                    <Form.Item label="班级">
                    {getFieldDecorator('class', {
                        rules: [{ required: true, message: '学生班级不为空' }],
                    })(
                        <Input placeholder="请填写学生班级" />
                      )}
                    </Form.Item>
                    <Form.Item label="班主任">
                    {getFieldDecorator('person', {
                        rules: [{ required: true, message: '班主任不为空' }],
                    })(
                        <Input placeholder="请填写班主任" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"> 添加</Button>
                    </Form.Item>
             </Form>
        </Drawer>

        <Modal
          visible={this.state.visible1}
          title="修改学生信息"
          okText="Create"
          onCancel={this.onClose}
          onOk={this.handleCreate}
        >
          <Form layout="vertical">
            <Form.Item label="学号">
            {getFieldDecorator('code',{
                    rules:[],
                })(
                    <Input  placeholder={this.state.editData.code}/>
                )}
            </Form.Item>
            <Form.Item label="姓名">
              {getFieldDecorator('realname', {
                  rules: [],
              })(
                  <Input placeholder={this.state.editData.realname} />
                )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(StudentView);
