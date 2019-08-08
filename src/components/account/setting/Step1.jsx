import React from 'react';
import { Form,Button,Input } from 'antd';
import PropTypes from 'prop-types';
// import "../setting.scss";


class Step1View extends React.Component {
  static propTypes = {
    ChangeMessage: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      "phone":"12345678966",
      count: 60, // 秒数初始化为60秒
      icode: '',
      code_ts: '获取验证码',
      show_btn: true,
      toast: false,
    };
  }
  handleChange = () => {
    this.props.ChangeMessage({
      username: this.state.username,
      password: this.state.password
    })
  };

  getCode () {
    let count = this.state.count;
    // 这里写一个定时器就可以去更新灰色按钮的内容而且show_btn是false时会出现灰色按钮，当倒计时结束又变成可以触发的按钮
    const timer = setInterval(() => {
      this.setState({
        count: (count--),
        show_btn: false,
        code_ts: count +'S重发'
      }, () => {
        if (count === 0) {
          clearInterval(timer)
          this.setState({
            show_btn: true ,
            count: 60,
            code_ts: '获取验证码'
          })
        }
      })
    }, 1000)

  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };
    return (
      <div className="team_fist" >
        <span>验证码将发送到手机号{this.state.phone.substring(3,0)}*****{this.state.phone.substring(11,8)}</span>
        <Form layout="inline">
          <Form.Item label="验证码">
            {getFieldDecorator('验证码')(<Input />)}
          </Form.Item>
          <Form.Item>
            <div className='phone_box_right'>
              {
                this.state.show_btn ?
                  <Button size='small' type='secondary' circle = { true } onClick = { this.getCode.bind(this) }>获取验证码</Button>
                  : <Button className='disbtn' disabled = { true } size='small' type='secondary' circle = { true }> { this.state.code_ts }</Button>
              }
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const step1 = Form.create({name: 'step1View'})(Step1View);
export default step1;
