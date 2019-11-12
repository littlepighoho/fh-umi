import React from 'react';
import './attendance.scss';
import { Table, Input, Button, Icon, Card, message, Form, Modal, Divider } from 'antd';
import {get} from "lodash-es";
import {connect} from 'dva';
import props from 'prop-types';
import attendance from '@/pages/practise/attendance/models/attendance';
import { parse } from 'path-to-regexp';

const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
//转换时间
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
const mapStateToProps = (state,props) => {
  const data=get(state.attendance,"entities",[]);
  return{
    data,
    pagination:state.attendance.pagination,
  }
};

@connect(mapStateToProps)
//----------------------------------------------------------------------------
class AttendanceView extends React.PureComponent {
  state = {
    searchText: '',
    data:[],
    editing: false,
    InputValue:'',
    hasFetchData:false,
    editData:[],
    visible1:false,
    visible:true,
  };
  //接口
  componentDidMount() {
      this.props.dispatch({
          type: 'attendance/getAttendanceList',
          payload: {
          }
        })
  }
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


  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };
  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  //查找
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
          搜索
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      console.log(value, record);
      if (dataIndex === "absent"){
        return parseInt(record[dataIndex], 10) >= value
      }
      else if(dataIndex=="student_number"){
        return parseInt(record[dataIndex],10)==value
      }
      else{
        return parse(record[dataIndex])==value
      }
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

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

  showDrawer=()=>{
    this.setState({
      visible:true,
    });
  };

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
  }


//-------------------------------------------------------
  //列表声明+数据
  constructor(props){
    super(props);
    this.columns = [
      {
        title: '学生ID',
        dataIndex: 'student_number',
        key: 'student_number',
        ...this.getColumnSearchProps('student_number'),
      },
      {
        title: '学生姓名',
        dataIndex: 'realname',
        key: 'realname',
        ...this.getColumnSearchProps('realname'),
      },
      {
        title: '旷课次数',
        dataIndex: 'absent',
        key: 'absent',
        editable: true,
        ...this.getColumnSearchProps('absent'),
      },
      {
        title: '请假次数',
        dataIndex: 'leaver',
        key: 'leaver',
        editable: true,
      },

      {
        title: '迟到次数',
        dataIndex: 'late',
        key: 'late',
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
  //
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
        <Table columns={columns}
               dataSource={this.data()} bordered
               components={components}
               className="card"
               size={'middle'}
               pagination={{ pageSize: 8}}>
        </Table>

        <Card title={"课程信息"} className="card1">
          <p>学校：2</p>
          <p>课程：2</p>
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
            <Form.Item label="请假次数">
              {getFieldDecorator('leaver',{
                rules:[],
              })(
                <Input placeholder={this.state.editData.leaver}/>
              )}
            </Form.Item>
            <Form.Item label="迟到次数">
              {getFieldDecorator('late',{
                rules:[],
              })(
                <Input placeholder={this.state.editData.late}/>
              )}
            </Form.Item>
          </Form>

        </Modal>
      </div>
    )
  }
}

export default Form.create()(AttendanceView);
