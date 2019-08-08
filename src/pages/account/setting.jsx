import React from 'react';
import { Card, Form, Steps, Button, message,Avatar,DatePicker, Tooltip,Icon,Radio } from 'antd';
import "./setting.scss";
import { ContentLayout } from '@/layouts/contentLayout';
import Step1 from '@/components/account/setting/Step1';
import Step2 from '@/components/account/setting/Step2';
import Step3 from '@/components/account/setting/Step3';
import { Input } from 'antd';
import router from 'umi/router';
import { connect } from 'react-redux';

const { Step } = Steps;
//电话修改
const steps = [
  {
    id :1,
    title: '验证信息',
    content: 'First-content',
  },
  {
    id:2,
    title: '更改信息',
    content: 'Second-content',
  },
  {
    id:3,
    title: '完成',
    content: 'Last-content',
  },
];
function getStepContent(id) {
  // eslint-disable-next-line default-case
  switch (id) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return  <Step3/>;
  }
}
//路由配置
const mapStateToProps = (state) => {
  return {
    auth: state.account.auth,
  }
};

@connect(mapStateToProps)
 class AccountSetting extends React.PureComponent{
   constructor(props) {
     super(props);
     this.state = {
       current: 0,
       "username":"4@firehydrant.com",
       "role":0,
        "old_password":"123456",
       "new_password":"",
       "phone":"66666666",
       "motto":"好好学习天天向上",
       "avator":"http://demo.sc.chinaz.net/Files/DownLoad/moban/201907/moban3892/images/t1.jpg",
       "nickname":"4@firehydrant.com",
       "sex":1
     };
   }

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
  handleChangeMessage= (payload) =>{
    message.success('个人信息修改成功');
    this.props.dispatch({
      type: 'account/changeMessage',
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

  handleChangePassword= (payload) =>{
    message.success('密码修改成功');
    this.props.dispatch({
      type: 'account/changeMessage',
      payload: {
        new_password: payload.new_password

      },
    }).then(() => {
      if(this.props.auth.logined) {
        router.push('')
      }
    })
  };

   //修改电话号码
   next() {
     const current = this.state.current + 1;
     this.setState({ current });
   }

   prev() {
     const current = this.state.current - 1;
     this.setState({ current });
   }

   //密码不一致
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
  const { current } = this.state;
  return (
    <ContentLayout dogetMessage={this.doGetMessage}>

        {/*个人基础信息*/}
        <Card  className="account_changeDate" title="修改个人信息">
          <Form className="account_description" {...formItemLayout} >
            <Form.Item
              label={
                <span>
              昵称&nbsp;
                  <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
              }
            >
              {getFieldDecorator('nickname')(
                <Input placeholder={this.state.nickname}  value={this.state.nickname} allowClear/>)}
            </Form.Item>

            <Form.Item label="性别">
              {getFieldDecorator('sex')(
                <Radio.Group defaultValue={this.state.sex}  value={this.state.sex} >
                <Radio value="0">小姐姐</Radio>
                <Radio value="1">小哥哥</Radio>
              </Radio.Group>)}
            </Form.Item>

            <Form.Item label="生日">
              {getFieldDecorator('date-picker')(<DatePicker />)}
            </Form.Item>

            <Form.Item label="一句话签名">
              {getFieldDecorator('motto')(
                <Input placeholder={this.state.motto}  value={this.state.motto}allowClear/>)}
            </Form.Item>
          </Form>
          <button  type="primary" className="account_button"
                   onClick={this.handleChangeMessage}>确认修改</button>
        </Card>

      {/*修改密码*/}
      <Card  className="account_changeDate" title="修改密码">
        <Form className="account_description" {...formItemLayout} onSubmit={this.handleSubmit}>
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
            })(<Input.Password  value={this.state.new_password}/>)}
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
            })(<Input.Password  value={this.state.old_password} onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
        </Form>
        <button  type="primary" className="account_button" onClick={this.handleChangePassword}>确认修改</button>
      </Card>

      {/*修改电话号码*/}
      <Card  className="account_changeDate" title="修改电话">
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{getStepContent(current)}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('手机号修改成功')}>
              完成修改
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              上一步
            </Button>
          )}
        </div>
      </Card>

      <button type="primary" className="account_backButton"
              onClick={()=>{this.props.history.push('/account')}}>返回</button>
    </ContentLayout>
  )
}
}

const Setting = Form.create({name: 'accountSetting'})(AccountSetting);
export default Setting;
