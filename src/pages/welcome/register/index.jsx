import React from 'react';
import Register from '../../../components/account/auth/register';
import './register.scss'
import { connect } from 'dva';
import Logo from '@/assets/img/fh-logo.png';
import router from 'umi/router';

const mapStateToProps = (state) => {
  console.log(state)
};

@connect(mapStateToProps)
class RegisterView extends React.PureComponent{
  doRegister = (payload) => {
    this.props.dispatch({
      type: 'global/register',
      payload: payload
    }).then(() => {
      router.push('/welcome/login')
    })
  };
  render(){
    return (
      <div className="register_view">
        <div className="register_pad">
          <div className="fh-logo">
            <img src={Logo} width={40} height={40}/>
            <div>FireHydrant</div>
          </div>
          <Register doRegister={this.doRegister}  />
        </div>
      </div>
    )
  }
}
export default RegisterView;
