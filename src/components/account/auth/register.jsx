import React from 'react';
import {Row,Input,Tooltip,Icon,Form,Button,Radio} from 'antd';
import PropTypes from 'prop-types';

class Register extends React.PureComponent{
    static propTypes ={
        doRegister:PropTypes.func.isRequired,
    };
    state={
        username:"",
        password:"",
        repassword:"",
        sex:0
    };
    handleRegister = () =>{
      if(this.state.password === this.state.repassword){
        this.props.doRegister({
          username:this.state.username,
          password:this.state.password,
          sex:this.state.sex
        })
      }
       else{
        alert("两次密码输入不一致");
      }
    };
    handleInputChange = (keyName) => ({ target }) => {
        this.setState({
        [keyName]: target.value,
        });
    };

    handleRadioChange = (e) => {
      console.log('radio checked', e.target.value);
      this.setState({
        value: e.target.value,
      });
    };
    render(){
        return(
            <Row>
                <h1 className="register_head">FireHydrant</h1>
                <Form.Item>
                    <Input
                        value={this.state.username}
                        placeholder="Enter your email"
                        onChange={this.handleInputChange('username')}
                        prefix={<Icon type="user" style={{color:'rgba(0,0,.25)'}}/>}
                        suffix={
                            <Tooltip title="输入你的邮箱">
                                <Icon type="info-circle" style={{color:'rgba(0,0,.45)'}}/>
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
                    <Input.Password
                    value={this.state.repassword}
                    onChange={this.handleInputChange('repassword')}
                    placeholder="again input password"
                    />
                </Form.Item>
                <Form.Item>
                  <Radio.Group onChange={this.handleRadioChange} value={this.state.value}>
                    <Radio style={{color:'white'}} value={1}>男</Radio>
                    <Radio style={{color:'white'}} value={2}>女</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <Button onClick={this.handleRegister} type="primary" className="register_button">Register</Button>
                </Form.Item>
            </Row>
        )
    }
}

export default  Register;
