import React from 'react';
import {Row,Input,Tooltip,Icon,Form,Button} from 'antd';
import PropTypes from 'prop-types';

class Register extends React.PureComponent{
    static propTypes ={
        doRegister:PropTypes.func.isRequired,
    };
    state={
        username:"",
        password:"",
        repassword:""
    }
    handleRegister = () =>{
        this.props.doRegister({
            username:this.state.username,
            password:this.state.password,
            repassword:this.state.repassword
        })
    }
    handleInputChange = (keyName) => ({ target }) => {
        this.setState({
            [keyName]: target.value,
        })
    }
    render(){
        return(
            <Row>
                <h1 className="register_head">FireHydrant</h1>
                <Form.Item>
                    <Input
                        value={this.state.username}
                        placeholder="Enter your email"
                        onChange={this.handleInputChange('username')}
                        prefix={<Icon type="user" style={{color:'rgba(0,0,.25'}}/>}
                        suffix={
                            <Tooltip title="输入你的邮箱">
                                <Icon tyoe="info-circle" style={{color:'rgba(0,0,.45)'}}/>
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
                    placeholder="angin input password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button onClick={this.handleRegister} type="primary" className="register_button">Register</Button>
                </Form.Item>
            </Row>
        )
    }
}

export default  Register;