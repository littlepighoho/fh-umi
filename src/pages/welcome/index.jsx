import React from 'react';
import LoginView from './login/index';

class WelcomeView extends React.PureComponent {

  render() {
    const { location } = this.props;
    const key = location.pathname.split("/")[2];
    if(key === 'login') return (<LoginView/>);
    return (
      <div>
      123
      </div>
    )
  }
}

export default WelcomeView;
