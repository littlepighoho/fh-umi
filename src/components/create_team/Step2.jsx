import React, { Component } from 'react';
import { Form, Input, Button, Select, message , Radio} from 'antd';
import "./step.scss";
import PropTypes from 'prop-types';
import router from 'umi/router';
const FormItem = Form.Item;

class Step2 extends Component {
  state = {
    visible: true,
  };


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        window.location.href = '/team';
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    const formItemLayout = {
      labelCol: {
        xs: { span: 30 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 41 },
        sm: { span: 16 },
      },
    };
    function onChange(value) {
      console.log(`selected ${value}`);
    }
    function onBlur() {
      console.log('blur');
    }
    function onFocus() {
      console.log('focus');
    }
    function onSearch(val) {
      console.log('search:', val);
    }

    function handleChange(value) {
      console.log(`Selected: ${value}`);
    }




    return (

    <Form { ...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
        <p className="team_fist">请完善队伍信息</p>
      <br/>
      <br/>
        <FormItem label="队名">

          {getFieldDecorator('队名', {
            rules: [{ required: true, message: '请输入你们的队名' }],
          })(
            <Input className="inpu_wid"  placeholder="队名" />
          )}
        </FormItem>

        <FormItem label="口号">
          {getFieldDecorator('输入你们的口号', {
            rules: [{ required: true, message: '请输入你们的口号' }],
          })(
            <Input   className="inpu_wid"  placeholder="口号" />
          )}
        </FormItem>

      <FormItem label="状态" >
        {getFieldDecorator('设置队伍状态', {
          rules: [{ required: true ,message:'请设置队伍的状态'}],
        })(
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="选择队伍的状态"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="publish">公开</Option>
            <Option value="private"
                    // onClick={() => this.setState({ visible: !this.state.visible })}
            >私人</Option>

          </Select>

        )}

      </FormItem>


      <Form.Item label="加入密码" className="inp">
        {getFieldDecorator('私人队伍密码', {
          rules: [{ required: false }],
        })(
          <Input.Password
            // onClose={() => this.setState({ visible: false })}
            placeholder="输入密码"/>
        )}

      </Form.Item>


        <FormItem>
          <Button type="primary" htmlType="submit"
                   // onClick={() => message.success('队伍创建成功!')}
                  className="login-form-button"
          >
              创建队伍
          </Button>
        </FormItem>
      </Form>
    )
  }
}
export default Step2 = Form.create()(Step2);
