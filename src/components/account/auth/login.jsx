import React from 'react';
import {Row, Input, Tooltip, Icon, Form, Button } from 'antd';
import PropTypes from 'prop-types';
class Login extends React.PureComponent {
  static propTypes = {
    doLogin: PropTypes.func.isRequired,
  };
  state = {
    username: "",
    password: "",
  };
  handleLogin = () => {
    this.props.doLogin({
      username: this.state.username,
      password: this.state.password
    })
  }
  handleInputChange = (keyName) => ({ target }) => {
    this.setState({
      [keyName]: target.value,
    })
  };
  render() {
    return (
      <Row>
        <Form.Item>
          <Input
            value={this.state.username}
            placeholder="Enter your email"
            onChange={this.handleInputChange('username')}
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
            value={this.state.password}
            onChange={this.handleInputChange('password')}
            placeholder="input password"
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={this.handleLogin}>GoGoGo</Button>
        </Form.Item>
      </Row>
    )
  }
}

export default Login;
