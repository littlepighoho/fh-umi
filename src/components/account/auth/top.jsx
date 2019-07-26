import React, { Component } from 'react';
import imgURL from '@/images/通知.png';
import imgURL1 from '@/images/设置.png';
import imgURL2 from '@/images/zhang.png';
import imgURL3 from '@/images/photo.png';
import "@/pages/index.scss";
class Top extends Component{
  render() {
    return (
      <div className="nav">
        <a href="#">
          <img
            style={{width:40,height:40}}
            src={imgURL} alt="" />
        </a>
        <a href="#">
          <img
            style={{width:40,height:40}}
            src={imgURL1} alt="" />
        </a>
        <a href="#">
          <img
            style={{width:40,height:40}}
            src={imgURL2} alt="" />
        </a>
        <a href="#">
          <img
            style={{width:40,height:40}}
            src={imgURL3} alt="" />
        </a>
      </div>
    )
  }
}
export default Top;
