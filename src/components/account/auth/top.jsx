import React, { Component } from 'react';

import "@/pages/index.scss";
import router from 'umi/router';
class Top extends Component{
  state = {};

  handleNavChange = (item) => () => {
    router.push(item.path)
  }
  notice = [{
    key: 'mission_hall',
    path: '/mission_hall',
  }];
  Administration = [{
    key: 'manage',
    path: '/manage',
  }];
  personal= [{
    key: 'account',
    path: '/account',
  }];
  // photo= [{
  //   key: 'account',
  //   path: '/account',
  // }];
  render() {
    return (
      <div>1</div>

    )
  }
}
export default Top;
