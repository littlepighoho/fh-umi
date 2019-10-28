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
  constructor(props, context) {
    super(props, context);
    // this.setState({
    //   schoolId: this.props.location.state.dotData
    // });
    // console.log("$$$$"+this.props.location.query.schoolId);
  }
  // const schoolId = this.props.location.state.dotData;

  componentDidMount() {
    // const schoolId = this.props.location.state.dotData;
    // console.log(schoolId);
  }
  static getDerivedStateFromProps = (nextProps, prevState) => {
    // const { schoolId } = this.state;
    if(!prevState.hasFetchData) {
      nextProps.dispatch({
        type: 'student/getList',
        payload: {
          // school:schoolId,
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
            const data = dataSource.filter(item => item.id !== key) ;
            this.setState({
                dataSource: data,
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
        const { count, dataSource } = this.state;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            const newData = {
                id:count,
                key:count,
                studentId: values.id,
                studentName: values.name,
                studentClass:values.class,
                studentPerson:values.person
            };
            this.setState({
                dataSource: [...dataSource, newData],
                visible: false,
                count:count+1,
            });
        }
        this.props.form.resetFields()
        });
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
                editData: this.state.dataSource[selectedKeys]});
            }
        else{
            message.error('你没有选择学生！');
        }
    }

    handleCreate = (e) => {

        e.preventDefault();
        const { selectedKeys } = this.state;
        const data = this.state.dataSource[selectedKeys];
        this.props.form.validateFields((err, values) => {
            if (err) {
            return;
            }
            if(values.id)
                data.studentId = values.id;
            if(values.name)
                data.studentName = values.name;
            if(values.person)
                data.studentPerson = values.person;
            if(values.class)
                data.studentClass = values.class;
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
          studentId: item.id,
          code:item.code,
          account_iD:item.account.id,
          create_time: item.create_time,
          update_time:item.update_time,
          school_id:item.school.id,
        }
      })
    };


  render(){
    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '学号',
      key: 'studentId',
      dataIndex: 'studentId',
      ...this.getColumnSearchProps('studentId')
    },
    {
      title: '名字',
      key: 'studentName',
      dataIndex: 'studentName',
      ...this.getColumnSearchProps('studentName'),
    },
    {
      title: '班级',
      key: 'studentClass',
      dataIndex: 'studentClass',
    },
    {
      title:'班主任',
      key:'studentPerson',
      dataIndex:'studentPerson'
    },
    {
      title: '操作',
      dataIndex: 'option',

        render: (text, record) =>
            this.state.dataSource.length >= 1 ? (
                <span>
                <a onClick={() => this.handleDelete(record.key)}>
                    删除
                </a>
                </span>
            ) : null,
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
            dataSource={this.state.dataSource}
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
            {getFieldDecorator('id',{
                    rules:[],
                })(
                    <Input  placeholder={this.state.editData.studentId}/>
                )}
            </Form.Item>
            <Form.Item label="姓名">
                    {getFieldDecorator('name', {
                        rules: [],
                    })(
                        <Input placeholder={this.state.editData.studentName} />
                     )}
                    </Form.Item>
                    <Form.Item label="班级">
                    {getFieldDecorator('class', {
                        rules: [],
                    })(
                        <Input placeholder={this.state.editData.studentClass}/>
                      )}
                    </Form.Item>
                    <Form.Item label="班主任">
                    {getFieldDecorator('person', {
                        rules: [],
                    })(
                        <Input placeholder={this.state.editData.studentPerson} />
                        )}
                    </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(StudentView);
