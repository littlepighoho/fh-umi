import React, { Component } from 'react';
import imgURL from '@/images/通知.png';
import imgURL1 from '@/images/设置.png';
import imgURL2 from '@/images/zhang.png';
import imgURL3 from '@/images/photo.png';
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
  photo= [{
    key: 'account',
    path: '/account',
  }];

  render() {
    return (
      <div className="nav">
        {this.notice.map((item) => {
          return (
            <a onClick={this.handleNavChange(item)}>
              <img
              style={{width:40,height:40}}
              src={imgURL} alt="" />
            </a>
          )
        })}

        {this.Administration.map((item) => {
          return (
            <a onClick={this.handleNavChange(item)}>
              <img
                style={{width:40,height:40}}
                src={imgURL1} alt="" />
            </a>
          )
        })}

        {this.personal.map((item) => {
          return (
            <a onClick={this.handleNavChange(item)}>
              <img
                style={{width:40,height:40}}
                src={imgURL2} alt="" />
            </a>
          )
        })}

        {this.photo.map((item) => {
          return (
            <a onClick={this.handleNavChange(item)}>
              <img
                style={{width:40,height:40}}
                src={imgURL3} alt="" />
            </a>
          )
        })}


      </div>
    )
  }
}
export default Top;
