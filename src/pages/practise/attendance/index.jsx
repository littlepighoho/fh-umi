import React from 'react';
import './attendance.scss';
import { Table, Input, Button, Icon, Card, message, Form, Modal, Divider } from 'antd';
import {get} from "lodash-es";
import {connect} from 'dva';
import { parse } from 'path-to-regexp';
import router from 'umi/router';
const { Search } = Input;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
const mapStateToProps = (state,props) => {
  const data=get(state.attendance,"entities",[]);
  return{
    data,
    pagination:state.attendance.pagination,
  }
};

//---------------------------转换时间-------------------------------
function formatNumber (n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}
// 参数number为毫秒时间戳，format为需要转换成的日期格式
function formatTime (number, format) {
  const time = new Date(number);
  let newArr = [];
  let formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
  newArr.push(time.getFullYear())
  newArr.push(formatNumber(time.getMonth() + 1))
  newArr.push(formatNumber(time.getDate()))
  newArr.push(formatNumber(time.getHours()))
  newArr.push(formatNumber(time.getMinutes()))
  newArr.push(formatNumber(time.getSeconds()))
  for (let i in newArr) {
    format = format.replace(formatArr[i], newArr[i])
  }
  return format;
}

@connect(mapStateToProps)
//----------------------------------------------------------------------------
class AttendanceView extends React.PureComponent {
  state = {
    searchText: '',
    data:[],
    editing: false,
    selectedKey: -1,
    InputValue:'',
    hasFetchData:false,
    editData:[],
    visible1:false,
    visible:true,
    key:-1,
    name:'',
  };
  //--------------------------------------接口---------------------------
  componentDidMount() {
      this.props.dispatch({
          type: 'attendance/getAttendanceList',
          payload: {
          }
        })
  }
  //----------------分页----------------------------------

  onPageChange = (page,pageSize) =>{
    const {name} = this.state;
    const {leaver} = this.state;
    const {late}=this.state;
    const {absent}=this.state;
    this.props.dispatch({
      type: 'attendance/getAttendanceList',
      payload: {
        limit:pageSize,
        page:page,
        key:name,
        leaver:leaver,
        late:late,
        absent: absent
      },
    })
  };

  //----------------搜索--------------------------------------
  onSearchName = value =>{
    console.log("搜索函数");
    this.props.dispatch({
      type: 'attendance/getAttendanceList',
      payload: {
        key:value,
      },
    });
    this.setState({
      name:value,
    })

  };

  onSearchAbsent= value =>{
    this.props.dispatch({
      type: 'attendance/getAttendanceList',
      payload: {
        absent:value,
      },
    });
    this.setState({
      absent:value,
    });
  };

  onSearchLeaver= value =>{
    this.props.dispatch({
      type: 'attendance/getAttendanceList',
      payload: {
        leaver:value,
      },
    });
    this.setState({
      leaver:value,
    })
  };

  onSearchLate= value =>{
    this.props.dispatch({
      type: 'attendance/getAttendanceList',
      payload: {
        late:value,
      },
    });
    this.setState({
      late:value,
    })
  };


  //-------------------删除-------------------------------

  handleDelete = (key) => {
    Modal.confirm({
      title:'删除提示',
      content:'你要删除这个数据吗？',
      onOk:()=>{
        this.props.dispatch({
          type:'attendance/deleteAttendance',
          payload:{
            id:key.id,
          }
        });
        message.success('删除成功');
      }
    })
  };



  //------------------修改--------------------------------------
  handleEdit=(key)=>{
      this.setState({
        visible1:true,
        editData:key,
      });
  };
  handleCreate=(e)=>{
    e.preventDefault();
    const{editData}=this.state;
    // const data1=key;
    this.props.form.validateFields((err,values)=>{
      console.log("values",values);
      if(err){
        return;
      }
      this.props.dispatch({
        type:'attendance/exitAttendance',
        payload:{
          id:editData.id,
          late:values.late,
          absent:values.absent,
          leaver:values.leaver,
        }
      });
      this.props.form.resetFields();
      this.setState({
        visible1:false,
        }
      );
    });
  };

//----------修改框---------------
  onClose=()=>{
    this.setState({
      visible:false,
      visible1:false,
    });
    this.props.dispatch({
      type:'attendance/getAttendanceList',
      payload:{
      },
    })
  };

//------------------------列表声明+数据-------------------------------
  constructor(props){
    super(props);
    this.columns = [
      {
        title: '学生ID',
        dataIndex: 'student_number',
        key: 'student_number',
      },
      {
        title: '学生姓名',
        dataIndex: 'realname',
        key: 'realname',
      },
      {
        title: '旷课次数',
        dataIndex: 'absent',
        key: 'absent',
        editable: true,
      },

      {
        title: '迟到次数',
        dataIndex: 'late',
        key: 'late',
        editable: true,
      },
      {
        title: '请假次数',
        dataIndex: 'leaver',
        key: 'leaver',
        editable: true,
      },

      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
      },
      {
        title: '更新时间',
        dataIndex: 'update_time',
        key: 'update_time',
      },
      {
        title: '删除',
        dataIndex: 'operation',
        key:'operation',
        render: (text, record) =>
          <span>
            <Button type={'danger'}  value="small" onClick={()=>this.handleDelete(record)}>
              删除
            </Button>
            <Divider type="vertical"/>
            <Button type={'primary'} value="small" onClick={()=>this.handleEdit(record)}>
              修改
            </Button>
          </span>
      },
    ];

  }



  //-------------------声明数据-----------------------------------
  data = () => {
    return this.props.data.map((item) => {
      return{
        student_number:item.student.id,
        realname:item.student.realname,
        leaver:item.leaver,
        late:item.late,
        id: item.id,
        absent:item.absent,
        create_time:formatTime(item.create_time*1000,'Y-M-D h:m:s'),
        update_time:formatTime(item.update_time*1000,'Y-M-D h:m:s'),
      }
    });
  };


  render(){
    const { data } = this.state;
    const {getFieldDecorator} =this.props.form;
    const components = {
      body: {
        row: EditableFormRow,
      },
    };
    const  pagination= {
      current:get(this.props.pagination, 'page', 0),
      total:get(this.props.pagination, 'total', 0),
      pageSize: get(this.props.pagination, 'limit', 0),
      showQuickJumper:true,
      onChange:(page,pageSize) => this.onPageChange(page,pageSize),
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
        }),
      };
    });
    return(
      <div>
        <Table
               columns={columns}
               dataSource={this.data()} bordered
               className="card"
               size={'middle'}
               pagination= {pagination}
        >
        </Table>

        <Card title={"课程信息"} className="card1">
          <div>
          <p>学校：2</p>
          <p>课程：2</p>
          </div>
        </Card>

        <Card title={"查询"} className="card2">
          <div className="cardsearch">
            <Search
              className="search"
              placeholder="输入学生名字"
              enterButton="查询"
              size="smart"
              onSearch={value => this.onSearchName(value)}/>
            <br/>  <br/>
            <Search
              className="search"
              placeholder="旷课>="
              enterButton="查询"
              size="smart"
              onSearch={value => this.onSearchAbsent(value)}/>
            <br/>  <br/>
            <Search
              className="search"
              placeholder="迟到>="
              enterButton="查询"
              size="smart"
              onSearch={value => this.onSearchLate(value)}/>
            <br/>  <br/>
            <Search
              className="search"
              placeholder="请假>="
              enterButton="查询"
              size="smart"
              onSearch={value => this.onSearchLeaver(value)}/>
          <br/>
          </div>
        </Card>

        <Modal
          visible={this.state.visible1}
          title="修改考勤信息"
          okText="update"
          onCancel={this.onClose}
          onOk={this.handleCreate}
          >
          <Form layout="vertical">
            <Form.Item label="缺勤次数">
              {getFieldDecorator('absent',{
                rules:[],
              })(
                <Input placeholder={this.state.editData.absent}/>
              )}
            </Form.Item>

            <Form.Item label="迟到次数">
              {getFieldDecorator('late',{
                rules:[],
              })(
                <Input placeholder={this.state.editData.late}/>
              )}
            </Form.Item>
            <Form.Item label="请假次数">
              {getFieldDecorator('leaver',{
                rules:[],
              })(
                <Input placeholder={this.state.editData.leaver}/>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(AttendanceView);
