import React,{Component}  from 'react';
import {Button,Table,Modal } from 'antd'
import EditModal from './edit'
const confirm = Modal.confirm;
require('./class.scss');
class ClassView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        editVisiable:false,
      dataSource:[],
      editDataObj:{},
    }
  }
 editHandle = (record)=> {
       //record 为 当前行数据
          //将当前行数据传递给EditModal组件展示
            this.setState({
                editVisiable:true,
         editDataObj:record,
          })
     }
  //显示弹窗
  addDataSource = () =>{
       this.setState({
            editVisiable:true,
         editDataObj:{},
          })
      }
  //取消弹窗
 onModelCancel = () =>{
        this.setState({
            editVisiable:false,
          })
     }

  saveData = (updateData) => {

        const { dataSource } = this.state
    dataSource.push(updateData)
        this.setState({
          dataSource:dataSource,
          })
     }
//修改
updateDataHandle = (values)=> {
     //  var { dataSource } = this.state
       // const id = values.key,
  //status = values.status || 0
    //      const index = dataSource.findIndex(e=> e.key == id)
          //替换
      //        if(status >= 0) {
    //let replace = dataSource.splice(index,1,values)
      //  } else {
       //删除
        //  let removed = dataSource.splice(index,1)
        //}
        //  this.setState({
          //    dataSource:dataSource,
      //  })
  const { data } = await AllService.update(values)
     }
//删除
  deleteHandle = (record) => {
      confirm({
            title: `您确定要删除?(${record.key})`,
            onOk: () => {
              this.updateDataHandle({
                  key:record.key,
                  status:-1,
                })
           },
          });
     }
  render() {

         const { editVisiable, dataSource,editDataObj } = this.state
    return (
      <div className="content-inner">
        <Button type ='primary' onClick={ this.addDataSource }> 新增教室</Button>
        <Table columns = {this.columns} dataSource={dataSource}>

        </Table>
        <EditModal
          editVisiable={ editVisiable }
          onModelCancel={ this.onModelCancel}
             saveData = { this.saveData }
          editDataObj = { editDataObj }
      />
  </div>
  );
  }
  columns = [{
    title: 'id',
    dataIndex: 'key',
    key: 'key',
  },
    {
      title: '教室编号',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '教室名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '教室地点',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div style={{ textAlign: 'ceter' }}>
          <a href="javascript:void(0)" style={{ marginRight: +'10px' }}
             onClick={() => this.editHandle(record)}
          >编辑</a>
          <a href="javascript:void(0)" style={{ marginRight: +'10px' }}
             onClick={() => this.deleteHandle(record)}
          >删除</a>
        </div>
      ),
    }];

}

export default ClassView;
