import React from 'react';
import Login from '../../../components/account/auth/login';
import './login.scss'
class LoginView extends React.PureComponent{

  render(){
    return (
      <div className="login_view">
        <div className="login_pad">
          <Login/>
        </div>
      </div>
    )
  }
}
export default LoginView;
