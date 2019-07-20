import React from 'react';
import {Row, Input, Tooltip, Icon, Form, Button } from 'antd';
class Login extends React.PureComponent {

  state = {
    email: "",
    password: "",
  };
  render() {
    return (
      <Row>
        <Form.Item>
          <Input
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
          <Input.Password placeholder="input password" />
        </Form.Item>
        <Form.Item>
          <Button>123</Button>
        </Form.Item>
      </Row>
    )
  }
}

export default Login;
