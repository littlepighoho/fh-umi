import React from 'react';
import Highlighter from 'react-highlight-words';
import  {Input, Icon,Card,Table,Form,Popconfirm,
    Drawer,Modal,Button,message,Row,Col,Divider} from 'antd';
import router from 'umi/router';
import {hashHistory} from 'react-router'
import { Link } from 'react-router-dom';
import { get } from 'lodash-es';
import { connect } from 'dva';
import  './index.less'
const { Search } = Input;
const { confirm } = Modal;

function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n;
}
// 参数number为毫秒时间戳，format为需要转换成的日期格式
function formatTime (number, format) {
  var time = new Date(number)
  // time  =  time *1000;
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
// console.log("pagination",state.school.pagination);
  return {
    data,
    pagination:state.school.pagination,
  }
}

@connect(mapStateTopProps)
class SchoolView extends React.PureComponent {

  state = {
    InputValue: '',
    selectedKey: -1,
    visible: false, //add
    visible1: false, // edit
    count:0,
    hasFetchData: false,
    editData:[],
    key:-1,
    name:'',
    ischeck:false,
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if(!prevState.hasFetchData) {
      nextProps.dispatch({
        type: 'school/getList',
        payload: {},
      })
      return {
        ...prevState,
        hasFetchData: true,
      }
    }
  }
    handleDelete = (key) => {
    Modal.confirm({
        title:'删除提示',
        content: `您确定要删除这些数据吗?`,
        onOk:()=>{
            this.props.dispatch({
              type: 'school/deleteSchool',
              payload: {
                schoolId: key,
              }
            })
              message.success('删除成功');
        }
    });
    };

    //点击新建按钮，drawer出现
    showDrawer = () => {
    this.setState({
        visible: true,
        ischeck:false,
    });
    };
    //drawer里面的关闭按钮
    onClose = () => {
      this.setState({
          visible: false,
          visible1: false,
          ischeck:false,

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
          })
          message.success('创建成功');

          if (!err) {
            this.setState({
              visible: false,
          });
        }
        this.props.form.resetFields();
        }
    )
  };
    handleEdit =(key) =>{
      console.log(key);
       this.setState({
              visible1: true,
              editData: key,
        });
    }
    handleCreate = (e) => {
        e.preventDefault();
        const { editData } = this.state;
        // const data1 = this.props.data[selectedKey];
        this.props.form.validateFields((err, values) => {
            if (err) {
            return;
            }
            this.props.dispatch({
              type: 'school/editSchool',
              payload: {
                  schoolId: editData.schoolId,
                  name:values.name,
                  description:values.description,
              }
            })
            this.props.form.resetFields();
            this.setState({
                visible1: false,
            });
        });
    };
    onPageChange = (page,pageSize) =>{
      const {name} = this.state;
      this.props.dispatch({
        type: 'school/getList',
        payload: {
          limit:pageSize,
          page:page,
          name:name
        },
      })
  }
  onSearchName = value =>{
    this.props.dispatch({
      type: 'school/getList',
      payload: {
        name:value,
      },
    })
    this.setState({
      name:value,
    })
  }
  renderData = () => {
    // console.log("pan",this.props.pagination);
    return this.props.data.map((item) => {
      return {
        schoolId: item.id,
        name: item.name,
        description: item.description,
        update_time:formatTime(item.update_time * 1000,"Y-M-D h:m:s"),
        create_time:formatTime(item.create_time * 1000,"Y-M-D h:m:s"),
      }
    });

  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const columns = [
    {
      title: '名字',
      key: 'name',
      dataIndex: 'name',
      width:"20%",
    },
    {
      title: '简介描述',
      key: 'description',
      dataIndex: 'description',
      width:"25%",
    },
    {
      title: '创建时间',
      key: 'create_time',
      dataIndex: 'create_time',
      width:"20%"
    },
    {
      title: '更新时间',
      key: 'update_time',
      dataIndex: 'update_time',
      width:"20%"
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
                <a onClick={() => this.handleEdit(record)}>
                    修改
                </a>
                <Divider type="vertical" />
                <Link to={{pathname:`/practise/school/${record.schoolId}/student`}}>查看</Link>
                </span>
    }
    ];

    const  pagination= {
      current:get(this.props.pagination, 'page', 0),
      total:get(this.props.pagination, 'total', 0),
      pageSize: get(this.props.pagination, 'limit', 0),
      showQuickJumper:true,
      onChange:(page,pageSize) => this.onPageChange(page,pageSize),
    }
      const rowSelection = {
        type: 'radio',
        onChange: (selectedKey) => {
          this.setState({
            selectedKey,
          })
        },
        checked:this.state.ischeck,
        // console.log(check)
      };
    return (
      <div className="school_message">
        <Card title="学校管理" className="school_card">
          <div className="school_option">
            <Search
            className="school_search"
              placeholder="输入学校名字"
              enterButton="查询"
              size="smart"
              onSearch={value => this.onSearchName(value)}/>
            <div className="school_operate">
              <Button type="primary"
                onClick={this.showDrawer}
                icon="plus">
                  添加
                  </Button>
            </div>
          </div>
          <Table
            className="school_table"
            bordered
            columns={columns}
            // rowSelection = {rowSelection}
            dataSource={this.renderData()}
            pagination= {pagination }
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
          okText="修改"
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
