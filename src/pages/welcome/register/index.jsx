
import React,{Component,Fragment} from 'react';
import './register.scss'
import Register from '@/components/account/auth/register';

class RegisterView extends Component{
  render(){
    return (
      <div className="register_view">
        <div className="register_pad">
          <Register/>
          注册
        </div>
      </div>
    )
  }
}
export default RegisterView;

