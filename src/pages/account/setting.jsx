import React from 'react';
import { Card, Form, Steps, Button, message,Avatar,DatePicker, Tooltip,Icon,Radio } from 'antd';
import "./setting.scss";
import { ContentLayout } from '@/layouts/contentLayout';
// import Step1 from '@/components/account/setting/Step1';
// import Step2 from '@/components/account/setting/Step2';
// import Step3 from '@/components/account/setting/Step3';
import AvatarChange from '@/components/account/setting/avatorChange';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { get } from 'lodash-es';
import router from 'umi/router';
import { connect } from 'react-redux';
import { call } from 'redux-saga/effects';

const { Step } = Steps;
//电话修改
// const steps = [
//   {
//     id :1,
//     title: '验证信息',
//     content: 'First-content',
//   },
//   {
//     id:2,
//     title: '更改信息',
//     content: 'Second-content',
//   },
//   {
//     id:3,
//     title: '完成',
//     content: 'Last-content',
//   },
// ];
// function getStepContent(id) {
//   // eslint-disable-next-line default-case
//   switch (id) {
//     case 0:
//       return <Step1 />;
//     case 1:
//       return <Step2 />;
//     case 2:
//       return  <Step3/>;
//   }
// }
//路由配置
const mapStateToProps = (state) => {
  const me = get(state.account,"me",[]);
  // console.log("me",me);
  return {
    me: me,
  }
};

@connect(mapStateToProps)
 class AccountSetting extends React.PureComponent{
  state={
    confirmDirty: false,
  };

   doGetMessage = (payload) => {
    this.props.dispatch({
      type: 'account/getMessage',
      payload: {
        "username":payload.username,
        "role":payload.role,
        "motto":payload.motto,
        "nickname":payload.nickname,
        "sex":1

      },
    }).then(() => {
      if(this.props.auth.logined) {
        router.push('')
      }
    })
  };
  //  //修改个人信息
  handleChangeMessage= () =>{
    // console.log("payload");
    this.props.form.validateFields((err, values) => {
      console.log("values",values);
      if (err) {
        return;
        }
      this.props.dispatch({
        type: 'account/changeMessage',
        payload: {
          username:values.username,
          role:values.role,
          motto:values.motto,
          nickname:values.nickname,
          sex:values.sex,
          phone:values.phone,
        },
      }).then(() =>{
        this.props.dispatch({
          type: 'account/me',
          payload: {},
       })
      })
    })
  };
  handleChangePassword= () =>{
    // console.log("payload");
    this.props.form.validateFields((err, values) => {
      console.log("values",values);
      if (err) {
        return;
        }
      this.props.dispatch({
        type: 'account/changeMessage',
        payload: {
          new_password:values.new_password,
          old_password:values.old_password,
        },
      }).then(() =>{
        this.props.dispatch({
          type: 'account/me',
          payload: {},
       })
      })
    })
  };

   //密码不一致
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('new_password')) {
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        this.props.doRegister(values)
      }
    });
  };


render() {
  const { getFieldDecorator } = this.props.form;
  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
  };
  return (
    <ContentLayout>


        {/*个人基础信息*/}
        <Card  className="account_changeDate" title="修改个人信息">
          <Form className="account_description" {...formItemLayout} >
            <Form.Item label={<span style={{ color: 'white'}}>用户名</span>}>
              {getFieldDecorator('nickname')(
                 <Input placeholder={get(this.props,"me.nickname",[])}   allowClear/>)}
             </Form.Item>

            <Form.Item label="性别">
              {getFieldDecorator('sex',{  initialValue: get(this.props,"me.sex",[])})(
                <Radio.Group   >
                <Radio value={2}>小姐姐</Radio>
                <Radio value={1}>小哥哥</Radio>
              </Radio.Group>)}
            </Form.Item>

            <Form.Item label="角色">
              {getFieldDecorator('role',{ initialValue: get(this.props,"me.role",[])})(
                <Radio.Group >
                  <Radio value={0}>普通用户</Radio>
                  <Radio value={1}>管理员</Radio>
                </Radio.Group>)}
            </Form.Item>
            <Form.Item label="电话号码">
            {getFieldDecorator('phone')(
                <Input placeholder={get(this.props,"me.phone",[])}   allowClear/>)}
            </Form.Item>

            <Form.Item label="一句话签名">
              {getFieldDecorator('motto')(
                <Input placeholder={get(this.props,"me.motto",[])}   allowClear/>)}
            </Form.Item>
          </Form>
          <AvatarChange className="data_avatar"/>
          <Button  type="primary" className="account_button"
              onClick={this.handleChangeMessage}>
                <Link to={{pathname:'/account'}}>确认修改</Link>
          </Button>
        </Card>

      {/*修改密码*/}
      <Card  className="account_changeDate" title="修改密码">
        <Form className="account_description" {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label={<span style={{ color: 'white'}}>原密码</span>}>
            {getFieldDecorator('old_password', {
              rules: [
                {
                  required: true,
                  message: '请输入您的密码',
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label={<span style={{ color: 'white'}}>新密码</span>}hasFeedback>
            {getFieldDecorator('new_password', {
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

          <Form.Item label={<span style={{ color: 'white'}}>确认密码</span>} hasFeedback>
            {getFieldDecorator('new_password1', {
              rules: [
                {
                  required: true,
                  message: '请输入密码',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
        </Form>
        <Button  type="primary" className="account_button"
         onClick={this.handleChangePassword}>确认修改</Button>
      </Card>

      <button type="primary" className="account_backButton"
              onClick={()=>{this.props.history.push('/account')}}>返回</button>
    </ContentLayout>
  )
}
}

const Setting = Form.create({name: 'accountSetting'})(AccountSetting);
export default Setting;
