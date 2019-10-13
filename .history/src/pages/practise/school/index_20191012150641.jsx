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
        title: "学校编号",
        key: "schoolId",
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("schoolId", {
                rules: [
                  {
                    required: true,
                    message: "学校编号不能为空！"
                  }
                ],
                initialValue: record.schoolId
              })(<Input />)}
            </FormItem>
          ) : (
            record.schoolId
          );
        },
        ...this.getColumnSearchProps('schoolId'),
      },
      {
        title: "学校名称",
        width: "25%",
        key: "schoolName",
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("schoolName", {
                rules: [
                  {
                    required: true,
                    message: "学校名称不能为空！"
                  }
                ],
                initialValue: record.schoolName
              })(<Input />)}
            </FormItem>
          ) : (
            record.schoolName
          );
        },
        ...this.getColumnSearchProps('schoolName'),
      },
      {
        title: "联系方式",
        width: "15%",
        key: "schoolPhone",
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("schoolPhone", {
                rules: [
                  {
                    required: true,
                    message: "联系方式不能为空！"
                  }
                ],
                initialValue: record.schoolPhone
              })(<Input />)}
            </FormItem>
          ) : (
            record.schoolPhone
          );
        }
      },
      {
        title: "学校地址",
        width: "20%",
        key: "schoolAddress",
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("schoolAddress", {
                rules: [
                  {
                    required: true,
                    message: "学校地址能为空！"
                  }
                ],
                initialValue: record.schoolAddress
              })(<Input />)}
            </FormItem>
          ) : (
            record.schoolAddress
          );
        }
      },
      {
        title: "负责人",
        width: "10%",
        key: "schoolPerson",
        renderDom: (form, record) => {
          return record.type !== "view" ? (
            <FormItem style={{ margin: 0 }}>
              {form.getFieldDecorator("schoolPerson", {
                rules: [
                  {
                    required: true,
                    message: "负责人不能为空！"
                  }
                ],
                initialValue: record.schoolPerson
              })(<Input />)}
            </FormItem>
          ) : (
            record.schoolPerson
          );
        }
      },
      {
        title: "操作",
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
        schoolId: "11222222",
        schoolName: "apple",
        schoolPerson: "001",
        schoolPhone:'11111',
        schoolAddress:"122",
        id: 2905258602579968
      },
      {
        schoolId: "112222",
        schoolName: "apple",
        schoolPerson: "001",
        schoolPhone:'11111',
        schoolAddress:"122",
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
      schoolId: "",
      schoolName:"",
      schoolPerson: "",
      schoolAddress:"",
      schoolPhone:"",
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
    const rowSelection = {
      onChange:(selectedRowKeys,selectedKeys) => {
        this.setState({
          selectedKeys,
          selectedRowKeys,
        })
        return "1";
      },
    };

    return (
      <div className="school_message">
        <Card title="学校管理" className="school_card">
          <Button
            disabled={isRowOpen}
            type="primary"
            onClick={this.addRow}
          >
            + 添加
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
