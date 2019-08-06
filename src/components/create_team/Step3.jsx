import React, { Component } from 'react';
import { Form, Icon, Input,InputNumber,Card, Button, Checkbox, Upload } from 'antd';
import "./step.scss";
const FormItem = Form.Item;



class Step3 extends Component {


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };


    function onChange(value) {
      console.log('changed', value);
    }

    return (

      <Form { ...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
        <p className="team_fist">请完善队长信息</p>

        <br/>
        <br/>

        <FormItem label="姓名">

          {getFieldDecorator('姓名', {
            rules: [{ required: true, message: '请输入你的姓名' }],
          })(
            <Input className="inpu_wid"  placeholder="姓名" />
          )}
        </FormItem>

        <FormItem label="邮箱">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: '您输入的不是一个合法的邮箱',
              },
              {
                required: true,
                message: '请输入您的邮箱',
              },
            ],
          })(<Input className="inpu_wid"  placeholder="邮箱" />)}
        </FormItem>


        <FormItem label="手机号">
          {getFieldDecorator('phone', {
            rules: [
              {
                type: 'phone',
                message: '您输入的不是一个合法的手机号',
              },
              {
                required: true,
                message: '请输入您的手机号',
              },
            ],
          })(<Input className="inpu_wid"  placeholder="手机号" />)}
        </FormItem>

        <FormItem label="简介">
          {getFieldDecorator('一句话简介', {
            rules: [{ required: true, message: '你确定不好好介绍你们的队伍嘛' }],
          })(
            <Input   className="inpu_wid"  placeholder="简介" />
          )}
        </FormItem>



        <FormItem>

          {/*<a className="login-form-forgot" href="" >Forgot password</a>*/}
          {/*<Button type="primary" htmlType="submit" className="login-form-button">*/}
          {/*  点击确认然后进行下一步*/}
          {/*</Button>*/}

        </FormItem>

      </Form>

    )
  }
}

export default Step3 = Form.create()(Step3);
