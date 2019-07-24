import React from 'react';
import Register from '../../../components/account/auth/register';
import './register.scss'
import { connect } from 'dva';
const mapStateToProps = (state) => {
  console.log(state)
};

@connect(mapStateToProps)
class RegisterView extends React.PureComponent{
  doRegister = (payload) => {
    this.props.dispatch({
      type: 'global/register',
      payload: {
        username: payload.username,
        password: payload.password,
       repassword:payload.repassword
      }
    })
  };
  render(){
    return (
      <div className="register_view">
        <div className="register_pad">
          <Register doRegister={this.doRegister}  />
        </div>
      </div>
    )
  }
}
export default RegisterView;
