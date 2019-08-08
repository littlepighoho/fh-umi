import React from 'react';
import "./setting.scss";
import { Form,Button,Select,Input,Row,Col} from 'antd';
const {Option} = Select;


class Step1View extends React.Component {
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
          clearInterval(timer);
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
      labelCol: { span: 8},
      wrapperCol: { span: 8 },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 ,color:'black'}}>
        <Option value="86" style={{color:'black'}}>+86</Option>
        <Option value="87" style={{color:'black'}}>+87</Option>
      </Select>,
    );

    return (
      <div>
        <Form {...formItemLayout}>
          <Form.Item label="输入新手机号">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item label="填写验证码">
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('captcha')(<Input />)}
              </Col>
              <Col span={8}>
                {
                  this.state.show_btn ?
                    <Button size='small' type='secondary' circle = { true } onClick = { this.getCode.bind(this) }>获取验证码</Button>
                    : <Button className='disbtn' disabled = { true } size='small' type='secondary' circle = { true }> { this.state.code_ts }</Button>
                }
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const step1 = Form.create({name: 'step1View'})(Step1View);
export default step1;
