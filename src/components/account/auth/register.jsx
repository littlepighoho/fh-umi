import React,{Component} from 'react';
import {Row, Input, Tooltip, Icon, Form, Button } from 'antd';
import  imgURL from '@/assets/img/logo.png';
import PropTypes from 'prop-types';
import './register.scss';

class Register extends Component {
  static propTypes = {
    doRegister: PropTypes.func.isRequired,
  };
  state = {
    username: "",
    password: "",
  };

  handleRegister = () => {
    this.props.doRegister({
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
      <React.Fragment>
        <Row>
          <img
            style={{ width:380 }}
            src={imgURL} alt=""
          />
        </Row>
        <Row>
          <div className='register_input'>
            <Form.Item>
              <Input
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
                onChange={this.handleInputChange('password')}
                placeholder="input password" />
            </Form.Item>
            <Form.Item>
              <Button style={{backgroundColor:'#FF4C18',color:'#FFFFFF'}}>
                加入</Button>
            </Form.Item>
          </div>
        </Row>
      </React.Fragment>
    )
  }
}

export default Register;
