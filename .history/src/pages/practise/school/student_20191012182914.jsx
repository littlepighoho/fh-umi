import React from "react";
import ReactDOM from "react-dom";
import style from "./index.less";
// import "antd/dist/antd.css";
// import data from "./data.js";
//网上源代码

import {Modal,Card,
  Table,
  Icon,
  Input,
  Divider,
  Button,
  notification,
  Form
} from "antd";

const sty = style;
const FormItem = Form.Item;
const EditableContext = React.createContext();


const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { renderDom, record, ...restProps } = this.props;

    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        <EditableContext.Consumer>
          {form => {
            this.form = form;
            return renderDom(form, record);
          }}
        </EditableContext.Consumer>
      </td>
    );
  }
}

class Client extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isRowOpen: false, //当前是否处于编辑状态（有且只有一行可编辑）
      locale: {
        emptyText: "暂无数据"
      },
      data: [],
      selectedRowKeys: [],
      selectedKeys:[]
    };

    this.columns = [
      {
        title: "学生编号",
        key: "studentId",
        width: "10%",
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("studentId", {
                rules: [
                  {
                    required: true,
                    message: "学生编号不能为空！"
                  }
                ],
                initialValue: record.studentId
              })(<Input />)}
            </FormItem>
          ) : (
            record.studentId
          );
        },
        ...this.getColumnSearchProps('studentId'),
      },
      {
        title: "学生名称",
        width: "25%",
        key: "studentName",
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("studentName", {
                rules: [
                  {
                    required: true,
                    message: "学生名称不能为空！"
                  }
                ],
                initialValue: record.studentName
              })(<Input />)}
            </FormItem>
          ) : (
            record.studentName
          );
        },
        ...this.getColumnSearchProps('studentName'),
      },
      {
        title: "联系方式",
        width: "15%",
        key: "studentPhone",
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("studentPhone", {
                rules: [
                  {
                    required: true,
                    message: "联系方式不能为空！"
                  }
                ],
                initialValue: record.studentPhone
              })(<Input />)}
            </FormItem>
          ) : (
            record.studentPhone
          );
        }
      },
      {
        title: "学生班级",
        width: "20%",
        key: "studentClass",
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("studentClass", {
                rules: [
                  {
                    required: true,
                    message: "班级"
                  }
                ],
                initialValue: record.studentClass
              })(<Input />)}
            </FormItem>
          ) : (
            record.studentClass
          );
        }
      },
      {
        title: "班主任",
        width: "10%",
        key: "studentPerson",
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("studentPerson", {
                rules: [
                  {
                    required: true,
                    message: "班主任不能为空！"
                  }
                ],
                initialValue: record.studentPerson
              })(<Input />)}
            </FormItem>
          ) : (
            record.studentPerson
          );
        }
      },
      {
        title: "操作",
        // width:"20%",
        renderDom: (form, record) => (
          <span>
            {record.type === "new" && (
              <span>
                <a
                  href="javascript:;"
                  onClick={e => this.addSubmit(form, record)}
                >
                  完成
                </a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={e => this.removeAdd(record)}>
                  取消
                </a>
              </span>
            )}
            {record.type === "edit" && (
              <span>
                <a
                  href="javascript:;"
                  onClick={e => this.editSubmit(form, record)}
                >
                  完成
                </a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={e => this.giveUpUpdata(record)}>
                  取消
                </a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={e => this.delete(record)}>
                  删除
                </a>
              </span>
            )}
            {record.type === "view" && (
              <span>
                <a href="javascript:;" onClick={e => this.edit(record)}>
                  编辑
                </a>
                <Divider type="vertical" />
                <a href="javascript:;" onClick={e => this.delete(record)}>
                  删除
                </a>
                {/* <Divider type="vertical" />ss */}
                {/* <a href="javascript:;" onClick={() =>  this.props.history.push('/student.jsx')}>
                  查看
                </a> */}
              </span>
            )}
          </span>
        ),
        width: 150
      }
    ];
  }
  componentDidMount() {
    const data =[
      {
        studentId: "11222222",
        studentName: "apple",
        studentPerson: "001",
        studentPhone:'11111',
        studentClass:"122",
        id: 2905258602579968
      },
      {
        studentId: "112222",
        studentName: "apple",
        studentPerson: "001",
        studentPhone:'11111',
        studentClass:"122",
        id: 2904806276614144
      }
    ]
    this.initRowType(data);
  }
  initRowType(data) {
    for (let item of data) {
      item["type"] = "view";
    }
    this.updateDataSource(data);
  }
  updateDataSource(newData, isAddDisabled) {
    let isRowOpen =
      typeof isAddDisabled == "boolean"
        ? isAddDisabled
        : newData.some(item => item.type === "new" || item.type === "edit");
    this.setState({
      isRowOpen,
      data: newData
    });
  }
  addRow = () => {
    let { data } = this.state;
    let newRecord = {
      studentId: "",
      studentName:"",
      studentPerson: "",
      studentClass:"",
      studentPhone:"",
      type: "new",
    };

    data.push(newRecord);
    this.updateDataSource(data);
  };
  addSubmit(form, record) {
    let { data } = this.state;

    form.validateFields((error, values) => {
      if (error) {
        return;
      }
      values.evaluate = values.evaluate == "1" ? true : false;
      let updateData = { ...record, ...values };

      setTimeout(res => {
        updateData.type = "view";
        data.pop();
        data.push(updateData);
        this.updateDataSource(data);
        notification["success"]({ message: "添加成功！" });
      }, 500);
    });
  }
  editSubmit(form, record) {
    let { data } = this.state;

    form.validateFields((error, values) => {
      if (error) {
        return;
      }
      values.evaluate = values.evaluate == "1" ? true : false;
      let updateData = { ...record, ...values };

      // console.log(updateData);
      setTimeout(res => {
        //将updateData更新到dataSource
        let newData = data.map(item => {
          if (item.id === updateData.id) {
            item = Object.assign({}, updateData);
            item.type = "view";
          }
          return item;
        });
        this.updateDataSource(newData);
        notification["success"]({ message: "修改成功！" });
      });
    });
  }
  removeAdd(record) {
    let { data } = this.state;
    data.pop();
    this.updateDataSource(data);
  }
  giveUpUpdata(record) {
    let { data } = this.state;
    let editRow = data.find(item => item.id === record.id);
    editRow.type = "view";
    this.updateDataSource(data);
  }
  delete(record) {
    let { data } = this.state;
    // console.log(record);
    setTimeout(res => {
      let index = data.findIndex(item => item.id === record.id);
      data.splice(index, 1);
      this.updateDataSource(data);
      notification["success"]({ message: "删除成功！" });
    });
  }
  edit(record) {
    let { data } = this.state;
    let newData = data.filter(item => {
      if (item.id === record.id) {
        item.type = "edit";
        return item;
      } else if (item.type !== "new") {
        item.type = "view";
        return item;
      }
    });
    this.updateDataSource(newData, true);
  }
  // onpen(record){
    
  // }
  onRowClick = (record,index) =>{
    let seltctKey = [index];
    Modal.info({
        title:'message',
        content:`用户名:%{record.userName}`
    })
    this.setState({
        selectedRowKeys:seltctKey,
        selectedItem:record
    })
}

// 搜索
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

    onSelectChange = (selectedRowKeys) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.setState({ selectedRowKeys });
    };
  render() {
    const { data, locale, isRowOpen } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      return {
        ...col,
        onCell: record => ({
          ...col,
          record
        })
      };
    });


    return (
      <div className="school_message">
        <Card title="学生信息" className="school_card">
          <Button
          style={{margin:'10px'}}
            disabled={isRowOpen}
            type="primary"
            onClick={this.addRow}
          >
            + 添加
          </Button>
          <Button
          style={{margin:'10px',float:'right'}}
          onClick={() => window.location.href="/practise/school"}
            type="primary"
          >
            返回
          </Button>
          <Table
            components={components}
            locale={locale}
            bordered
            rowKey={record => record.id}
            columns={columns}
            dataSource={data}
            pagination={false}
            // rowSelection = {rowSelection}
            rowClassName="editable-row"
          />
        </Card>
      </div>
    );
  }
}

export default Client;
