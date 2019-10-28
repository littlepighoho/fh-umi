import React from 'react';
import './attendance.scss';
import { Table, Input, Button, Icon, Card, message,Popconfirm,Select,Form ,Modal} from 'antd';
// import { connect } from 'react-redux';
import router from 'umi/router';
import {get} from "lodash-es";
import {connect} from 'dva'
import props from 'prop-types';
import attendance from '@/pages/practise/attendance/models/attendance';
import { parse } from 'path-to-regexp';
function cancel(e) {
  console.log(e);
  message.error('取消删除');
}
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);
//保存数据
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
const mapStateToProps = (state,prop) => {
  // const  data = get(s)
  const data=get(state.attendance,"entites",[]);
  console.log("data",data);
  return{
    data,
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
  };
  //接口
  componentDidMount() {
      this.props.dispatch({

          type: 'attendance/getAttendanceList',
          payload: {
             // schoolId: 1,
             // courseId: 1,
          }
        })
  }

  // attendance = (payload) => {
  //   console.log("6666");
  //   this.props.dispatch({
  //     type: 'attendance/getAttendanceList',
  //     payload: {
  //       // schoolId: 1,
  //       // courseId: 1,
  //     }
  //   }).then(() => {
  //     router.push('/attendanceView')
  //   })
  // };

  // static  getDerivedStateFormProps = (nextProps,prevState) =>{
  //   console.log("6666");
  //   if(!prevState.hasFetchData){
  //     nextProps.dispatch({
  //       type:'attendance/getAttendanceList',
  //       payload:{},
  //     })
  //   }
  //   return {
  //     ...prevState,
  //     hasFetchData: true
  //   }
  // };

//
// static getDerivedStateFromProps=(nextProps,prevState)=>{
//   if(!prevState.hasFetchData){
//     nextProps.dispatch({
//       type:"Attendance/getAttendanceList",
//       payload: {},
//     });
//     return{
//       ...prevState,
//       hasFetchData:true,
//     }
//   }
// };

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
  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };
  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  handleDelete = (key) => {
    const data= [...this.state.data];
    this.setState({
      data: data.filter(item => item.key !== key) ,
      // this:props.dispatch({
      //   type:'attendance/deleattendance',
      //   payload:{
      //     id:key,
      //   }

      })
    message.success('删除成功');
  };
  handleSave = row => {
    const newData = [...this.state.data];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ data: newData });
    message.success('保存成功');
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
        title: '请假次数',
        dataIndex: 'leaver',
        key: 'leaver',
        editable: true,
      },
      {
        title: '旷课次数',
        dataIndex: 'absent',
        key: 'absent',
        editable: true,
        ...this.getColumnSearchProps('absent'),
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
          this.state.data.length >= 1 ? (
            <Popconfirm title="确定要删除吗?"
                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                        onConfirm={
                          () => this.handleDelete(record.key)
                        }

                        onCancel={cancel}
            >
              <Button type="danger" size="small"
              >删除</Button>
            </Popconfirm>
          ) : null,
      },
    ];
    // this.state = {
    //   data: [
    //     {
    //       key: '1',
    //       number: '1',
    //       student_number: '1701030122',
    //       name: '吴禹辉',
    //       leave: 0,
    //       absent: 0,
    //       late: 0,
    //     },
    //     {
    //       key: '2',
    //       number: '2',
    //       student_number: '1701030123',
    //       name: '冯希瑶',
    //       leave: 0,
    //       absent: 2,
    //       late: 0,
    //     },
    //     {
    //       key: '3',
    //       number: '3',
    //       student_number: '1701030124',
    //       name: '蔡依林',
    //       leave: 0,
    //       absent: 3,
    //       late: 0,
    //     },
    //     {
    //       key: '4',
    //       number: '4',
    //       student_number: '1701030125',
    //       name: '林心如',
    //       leave: 0,
    //       absent: 2,
    //       late: 0,
    //     },
    //     {
    //       key: '5',
    //       number: '5',
    //       student_number: '1701030126',
    //       name: '周杰伦',
    //       leave: 0,
    //       absent: 1,
    //       late: 0,
    //     },
    //     {
    //       key: '6',
    //       number: '6',
    //       student_number: '1701030127',
    //       name: '林俊杰',
    //       leave: 0,
    //       absent: 4,
    //       late: 0,
    //     },
    //
    //     {
    //       key: '7',
    //       number: '7',
    //       student_number: '1701030128',
    //       name: '华晨宇',
    //       leave: 0,
    //       absent: 1,
    //       late: 0,
    //     },
    //     {
    //       key: '8',
    //       number: '8',
    //       student_number: '1701030129',
    //       name: '林更新',
    //       leave: 0,
    //       absent: 1,
    //       late: 0,
    //     },
    //
    //   ],
    // };
  }
  //
  data = () => {
    return this.props.data.map((item) => {
      return{
        student_number:item.student.id,
        realname:item.realname,
        leaver:item.leaver,
        late:item.late,
        absent:item.absent,
        create_time:item.create_time,
        update_time:item.update_time
      }
    });
  };

  render(){
    const { data } = this.state;
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
          <p>课程名称：小葵花手工课</p>
          <p>上课时间：周一1、2节</p>
        </Card>
        <Card title={"统计"} className="card2">
            <p>更新时间：2019/10/1</p>
            <p>缺勤人数：3</p>
            <p>已取消考试资格人数:5</p>
        </Card>
      </div>
    )
  }
}
export default AttendanceView;
