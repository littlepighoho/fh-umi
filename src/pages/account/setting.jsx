import React from 'react';
import { Card, Form, Input, Button, message,Avatar,DatePicker, Tooltip,Icon,Radio } from 'antd';
import "./setting.scss";
import { ContentLayout } from '@/layouts/contentLayout';
import FHAvatarEditor from '../../components/account/setting/avatorChange';
import AvatarChange from '@/components/account/setting/avatorChange';
import { Link } from 'react-router-dom';
import { get } from 'lodash-es';
import router from 'umi/router';
import { connect } from 'dva';

//路由配置
const mapStateToProps = (state) => {
  const me = get(state.account,"me",[]);
  return {
    me: me,
  }
};

@connect(mapStateToProps)
 class AccountSetting extends React.PureComponent{
  state={
    confirmDirty: false,
      newAvatar: '',
      processing: false,
  };
  handleAvatarConfirm = (imageData) => {
    this.setState({
      newAvatar: imageData,
    });
  };
  handleEditAccount = () => {
    this.setState({
      processing: true,
    },() =>this.props.dispatch({
      type: 'account/changeAvatar',
      payload: {
        avator: this.state.newAvatar,
      }
    }).then(() => {
      this.setState({
        processing: false,
        newAvatar:''
      })
    })
    )
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
  const { newAvatar } = this.state;
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

              <Form.Item label={<span style={{ color: 'white'}}>性别</span>}>
              {getFieldDecorator('sex',{  initialValue: get(this.props,"me.sex",[])})(
                <Radio.Group   >
                <Radio value={2}>小姐姐</Radio>
                <Radio value={1}>小哥哥</Radio>
              </Radio.Group>)}
            </Form.Item>

            <Form.Item label={<span style={{ color: 'white'}}>角色</span>}>
              {getFieldDecorator('role',{ initialValue: get(this.props,"me.role",[])})(
                <Radio.Group >
                  <Radio value={0}>普通用户</Radio>
                  <Radio value={1}>管理员</Radio>
                </Radio.Group>)}
            </Form.Item>
            <Form.Item label={<span style={{ color: 'white'}}>电话号码</span>}>
            {getFieldDecorator('phone')(
                <Input placeholder={get(this.props,"me.phone",[])}   allowClear/>)}
            </Form.Item>

            <Form.Item label={<span style={{ color: 'white'}}>一句话签名</span>}>
              {getFieldDecorator('motto')(
                <Input placeholder={get(this.props,"me.motto",[])}   allowClear/>)}
            </Form.Item>
          </Form>

          <div className="avatar_item">
              { newAvatar ? <React.Fragment>
                <div align="center">
                  <h2 className="avatar-title">确认要更换成此头像吗？</h2></div>
                <img className="avatar-img" src={newAvatar} width={180} height={180} alt="" />
                <br></br>
                <Button
                  loading={this.state.processing}
                  type="primary"
                  onClick={this.handleEditAccount}
                  className="btn-update"
                >
                  <Icon type="upload" /> 确认上传
                </Button>
                <Button
                  className="btn-dete"
                  type="primary"
                  disabled={this.state.processing}
                  onClick={() => { this.handleAvatarConfirm(''); }}
                >
                  <Icon type="delete" /> 重新选择
                </Button>
              </React.Fragment> : <FHAvatarEditor
                borderWidth={50}
                borderHeight={30}
                width={180}
                height={180}
                onUpload={this.handleAvatarConfirm}
              />}
              </div>

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
