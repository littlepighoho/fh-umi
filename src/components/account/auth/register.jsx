import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Radio, Checkbox, Button, AutoComplete, } from 'antd';
import PropTypes from 'prop-types';


class Register extends React.PureComponent{
  static propTypes ={
    doRegister:PropTypes.func.isRequired,
  };
  state={
    confirmDirty: false,
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
        this.props.doRegister(values)
      }
    });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('密码不一致！');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };


  render(){
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

    return(
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="邮箱">
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
          })(<Input />)}
        </Form.Item>
        <Form.Item label="密码" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入您的密码',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="确认密码" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请确认您的密码',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              昵称&nbsp;
              <Tooltip title="这是您的昵称">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入您的昵称', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="性别">
          {getFieldDecorator('sex', {
            rules: [{ required: true, message: '请选择您的性别', whitespace: true }],
          })(<Radio.Group>
            <Radio value="0">小姐姐</Radio>
            <Radio value="1">小哥哥</Radio>
          </Radio.Group>)}
        </Form.Item>
        {/*<Form.Item {...tailFormItemLayout}>*/}
        {/*  {getFieldDecorator('agreement', {*/}
        {/*    valuePropName: 'checked',*/}
        {/*  })(*/}
        {/*    <Checkbox>*/}
        {/*      I have read the <a href="">agreement</a>*/}
        {/*    </Checkbox>,*/}
        {/*  )}*/}
        {/*</Form.Item>*/}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const RegisterForm = Form.create({name: 'register'})(Register)
export default RegisterForm;
