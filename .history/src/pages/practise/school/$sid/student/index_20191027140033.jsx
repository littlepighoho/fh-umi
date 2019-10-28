import React from 'react';
import Highlighter from 'react-highlight-words';
import  {Input, Icon,Card,Table,Form,Popconfirm,
    Drawer,Modal,Button,message,Row,Col} from 'antd'
import "./index.less"
import { get } from 'lodash-es';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'dva';
const { Search } = Input;
const { confirm } = Modal;


const mapStateTopProps = (state, props) => {
  console.log("studentusers",get(state.studentusers,"entities",[]));
  console.log("student",get(state.student,"entities",[]));
  const data =get(state.studentusers,"entities",[]);
  return {
    data,
    schoolId:props.match.praram,
    pagination:state.studentusers.pagination,
  }

}
@withRouter
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
    hasFetchData: false,
  };
  // componentDidMount() {
  //   this.props.dispatch({
  //     type: 'studentusers/fetchStudentEntities',
  //     payload: {
  //       schoolId: 10,
  //     }
  //   })
  // }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if(!prevState.hasFetchData) {
      nextProps.dispatch({
        type: 'studentusers/getList',
        payload: {
          schoolId: 10,
        }
      }).then (() =>{
        nextProps.dispatch({
          type: 'studentusers/fetchStudentEntities',
          payload: {
            schoolId: 10,
          }
        })
      })
      return {
        ...prevState,
        hasFetchData: true,
      }
    }
  }
    handleDelete = (key) => {
        console.log(key)
     Modal.confirm({
      title:'删除提示',
      content: `您确定要删除这些数据吗？`,
      onOk:()=>{
        message.success('删除成功');
        this.props.dispatch({
          type: 'studentusers/deleteStudent',
          payload: {
            studentId: key,
          }
        }).then(() => {
          message.success('删除成功');
          this.props.dispatch({
            type: 'studentusers/getList',
            payload: {
              schoolId: 10,
            }
          })
        })
      }
    });
    };


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
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        this.props.dispatch({
          type: 'studentusers/setStudent',
          payload: {
            data:{
              code:values.code,
              realname:values.realname,
              phone:values.phone,
            }
          }
        }).then(() => {
          message.success('增加成功');
          this.props.dispatch({
            type: 'studentusers/getList',
            payload: {
              schoolId: 10,
            }
          })
        })
        if (!err) {
          this.setState({
            visible: false,
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
      console.log(data1);
      this.props.form.validateFields((err, values) => {
          if (err) {
          return;
          }
          this.props.dispatch({
            type: 'studentusers/editStudent',
            payload: {
              studentId: data1.id,
              code:values.code,
              realname:values.realname,
              phone:values.phone,
            }
          }).then(() => {
            message.success('删除成功');
            this.props.dispatch({
              type: 'studentusers/getList',
              payload: {
                schoolId: 10,
              }
            })
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
          <a onClick={() => this.handleDelete(record.studentId)}>
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
            <div className="student_operate">

                <Button type="primary"
                onClick={this.showDrawer}
                icon="plus"
                className="student_add"/>

                <Button
                type="primary"
                icon="edit"
                className="student_delete"
                onClick={this.handleEdit}/>

                <Button
                type="primary"
                className="student_delete">
                <Link to={`/practise/school`} >返回 </Link>
                </Button>
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
                    {getFieldDecorator('code',{
                            rules:[{required:true,message:'学号不能为空'}],
                        })(
                            <Input  placeholder="请输入用户名"/>
                        )}
                    </Form.Item>
                    <Form.Item label="真实名称">
                    {getFieldDecorator('realname', {
                        rules: [
                            {
                                required: true, message: '学生姓名不为空'
                            }
                        ],
                    })(
                        <Input placeholder="请填写姓名" />
                     )}
                    </Form.Item>
                    <Form.Item label="电话">
                    {getFieldDecorator('phone', {
                        rules: [
                            {
                                required: true, message: '电话不为空'
                            }
                        ],
                    })(
                        <Input placeholder="请填写电话" />
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
            <Form.Item label="电话">
              {getFieldDecorator('phone', {
                  rules: [],
              })(
                  <Input/>
                )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(StudentView);
