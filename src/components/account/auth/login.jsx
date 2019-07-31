import React,{Component} from 'react';
import {Row, Input, Tooltip, Icon, Form, Button } from 'antd';
import  imgURL from '@/images/logo.png';
import "@/pages/welcome/login/login.scss";
class Login extends Component {

  state = {
    email: "",
    password: "",
  };


  render() {
    return (
      <Row>
        <Form.Item>
          <img
            style={{width:380}}
            src={imgURL} alt="" />
          <Input  className="input1"
                  placeholder="Enter your email"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  suffix={
                    <Tooltip title="输入您的邮箱">
                      <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                  }

          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            style={{width:400,left:80,top:60}}
            placeholder="input password" />
        </Form.Item>
        <Form.Item>
          <Button
            // onClick={this.confirm}
            style={{backgroundColor:'#FF4C18',color:'#FFFFFF',width:400,left:80,top:90}}>
            GO</Button>
          {/*<Link to="/mission_hall">返回</Link>*/}
        </Form.Item>
        <Form.Item>
           <a >马上注册</a>
        </Form.Item>
      </Row>
    )
  }
}

export default Login;
