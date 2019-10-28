import React from 'react';
import Highlighter from 'react-highlight-words';
import  {Input, Icon,Card,Table,Form,Popconfirm,
    Drawer,Modal,Button,message,Row,Col,Divider} from 'antd';
import router from 'umi/router';
import {hashHistory} from 'React-router'
import { Link } from 'react-router-dom';
import { get } from 'lodash-es';
import { connect } from 'dva';
// import moment from ' moment';

const { Search } = Input;
const { confirm } = Modal;

// function formateDate (time){
//   if(!time)
//       return '';
//   let date = new Date(time);
//   return date.getFullYear()+'-' + (date.getMonth()+1) +'-'+date.getDate() +' '+date.getHours() +':' +date.getMinutes() +':' +date.getSeconds();
//  }
function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n;
}
// 参数number为毫秒时间戳，format为需要转换成的日期格式
function formatTime (number, format) {
  var time = new Date(number)
  var newArr = []
  var formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
  newArr.push(time.getFullYear())
  newArr.push(formatNumber(time.getMonth() + 1))
  newArr.push(formatNumber(time.getDate()))

  newArr.push(formatNumber(time.getHours()))
  newArr.push(formatNumber(time.getMinutes()))
  newArr.push(formatNumber(time.getSeconds()))

  for (var i in newArr) {
      format = format.replace(formatArr[i], newArr[i])
  }
  return format;
}

const mapStateTopProps = (state, props) => {

  const data =get(state.school,"entities",[]);
  const pagination =get(state.school,"pagination",[]);
  console.log("111",data)
  return {
    data,
    pagination,
  }
}

@connect(mapStateTopProps)
class SchoolView extends React.PureComponent {

  state = {
    InputValue: '',
    selectedKeys: [],
    visible: false, //add
    visible1: false, // edit
    count:0,
    hasFetchData: false,
    editData:[],
    key:-1,
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if(!prevState.hasFetchData) {
      nextProps.dispatch({
        type: 'school/getList',
        payload: {},
        // callback:(res)=>{
        //   console.log("resr",res);
        // }
      })
      return {
        ...prevState,
        hasFetchData: true,
      }
    }

  }
  componentDidMount() {
  }

    handleDelete = (key) => {
    Modal.confirm({
        title:'删除提示',
        content: `您确定要删除这些数据吗?`,
        onOk:()=>{
            // const data = dataSource.filter(item => item.id !== key) ;
            this.props.dispatch({
              type: 'school/deleteSchool',
              payload: {
                schoolId: key,
              }
            }).then(() => {
              message.success('删除成功');
              this.props.dispatch({
                type: 'school/getList',
                payload: {
                  schoolId: key,
                }
              })
            })
        }
    });
    // console.log("key:"+key);
    };

    // handleAllDelete =() =>{
    //     const { selectedKeys } = this.state;
    //     let data = this.state.dataSource;
    //     // console.log(selectedKeys + "$$$$$$")
    //     if(selectedKeys != ''){
    //     Modal.confirm({
    //         title:'删除提示',
    //         content: `您确定要删除这些数据吗？`,
    //         onOk:()=>{
    //             message.success('删除成功');
    //             selectedKeys.forEach((item) =>{
    //             // console.log(item +"%%%%%%")
    //             data = data.filter(it=> it.key != item);
    //             })
    //             this.setState({
    //             dataSource: data,
    //             })
    //         }
    //     })
    //     }
    // else{
    //     message.error('你没有选择学校！');
    // }  };

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
        this.props.dispatch({
          type: 'school/getList',
          payload: {},
        })
    }

        // 新建
    handleAdd = (e,payload) => {
        const { count } = this.state;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          this.props.dispatch({
            type: 'school/setSchool',
            payload: {
              data:{
                name:values.name,
                description:values.description,
              }
            }
          }).then(() => {
            message.success('创建成功');
            this.props.dispatch({
              type: 'school/getList',
              payload: {}
            })
          })
          if (!err) {
            this.setState({
              visible: false,
              count:count+1,
          });
        }
        this.props.form.resetFields();
        }
    )
  };

    handleEdit =(key) =>{
      const { selectedKeys } = this.state;
      if(selectedKeys != '') {
          if(selectedKeys.length > 1 ){
              message.error('只能选择一个学校编辑');
              return;
          }
          this.setState({
              visible1: true,
              editData: this.props.data[selectedKeys],
            });
          }
      else{
          message.error('你没有选择学校！');
      }
    }

    handleCreate = (e) => {
        e.preventDefault();
        const { selectedKeys,key } = this.state;
        const data1 = this.props.data[selectedKeys[0]];
        this.props.form.validateFields((err, values) => {
            if (err) {
            return;
            }
            this.props.dispatch({
              type: 'school/editSchool',
              payload: {
                  schoolId: data1.id,
                  name:values.name,
                  description:values.description,
              }
            }).then(() => {
              this.props.dispatch({
                type: 'school/getList',
                payload: {}
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
        schoolId: item.id,
        name: item.name,
        description: item.description,
        // update_time:moment(item.update_time).forment("YYYY-MM-DD HH:mm:ss"),
        // create_time:moment(item.create_time).forment("YYYY-MM-DD HH:mm:ss"),
        update_time:formatTime(item.update_time,"Y-M-D m:s"),
        create_time:formatTime(item.create_time,"Y-M-D m:s"),
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '学校id',
      key: 'schoolId',
      dataIndex: 'schoolId',
      ...this.getColumnSearchProps('schoolId')
    },
    {
      title: '名字',
      key: 'name',
      dataIndex: 'name',
      ...this.getColumnSearchProps('name'),
    },
    {
      title: '简介描述',
      key: 'description',
      dataIndex: 'description',
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
      title: '操作',
      dataIndex: 'option',

        render: (text, record) =>
                <span>
                <a onClick={() => this.handleDelete(record.schoolId)}>
                    删除
                </a>
                <Divider type="vertical" />
                <Link to={{pathname:`/practise/school/${record.schoolId}/student`,schoolId:record.schoolId}}>查看</Link>
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
        <Card title="学校管理" className="student_card">

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
            </div>
          </div>
          <Table
            className="student_table"
            bordered
            columns={columns}
            rowSelection = {rowSelection}
            dataSource={this.renderData()}
            pagination= {{
              // total:12,
              pageSize:5,
            }}
          >
          </Table>
        </Card>
        {/* 添加学校弹窗 drawer */}
        <Drawer
          title="添加学校"
          width={350}
          onClose={this.onClose}
          visible={this.state.visible}
        >
            <Form onSubmit={this.handleAdd}  layout="vertical" hideRequiredMark style={{width:'300px'}}>
                    <Form.Item label="学校名称">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true, message: '学校名称不为空'
                            }
                        ],
                    })(
                        <Input placeholder="请填写学校名称" />
                     )}
                    </Form.Item>
                    <Form.Item label="描述介绍">
                    {getFieldDecorator('description', {
                        rules: [{ }],
                    })(
                        <Input placeholder="描述介绍" />
                      )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"> 添加</Button>
                    </Form.Item>
             </Form>
        </Drawer>

        <Modal
          visible={this.state.visible1}
          title="修改学校信息"
          okText="Create"
          onCancel={this.onClose}
          onOk={this.handleCreate}
        >
          <Form layout="vertical">
            <Form.Item label="学校名称">
                    {getFieldDecorator('name', {
                        rules: [],
                    })(
                        <Input placeholder={this.state.editData.name} />
                     )}
                    </Form.Item>
                    <Form.Item label="描述简介">
                    {getFieldDecorator('description', {
                        rules: [],
                    })(
                        <Input placeholder={this.state.editData.description}/>
                      )}
                    </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(SchoolView);
