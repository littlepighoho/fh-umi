import React, { Component } from 'react';
import { Form, Icon, Input,InputNumber,Card, Button, Checkbox, Upload } from 'antd';
import "./step.scss";
const FormItem = Form.Item;



class Step2 extends Component {


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
        xs: { span: 30 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 41 },
        sm: { span: 16 },
      },
    };


    function onChange(value) {
      console.log('changed', value);
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

        <FormItem label="简介">
          {getFieldDecorator('一句话简介', {
            rules: [{ required: true, message: '你确定不好好介绍你们的队伍嘛' }],
          })(
            <Input   className="inpu_wid"  placeholder="简介" />
          )}
        </FormItem>

        <FormItem label="人数">
          {getFieldDecorator('人数', {
            rules: [{ required: true, message: '请确认你们的队伍人数' }],
          })(
            <InputNumber  className="number" min={1} max={10} defaultValue={3} onChange={onChange}
                         placeholder="队伍人数"
            />

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

export default Step2 = Form.create()(Step2);
