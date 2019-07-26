import React, { Component, Fragment } from 'react';
import "@/pages/index.scss";
import  imgURL4 from '@/images/炸弹.png';
import  imgURL5 from '@/images/灭火器.png';
import Top from '@/components/account/auth/top';
class firstView extends Component {
  render() {
    return (
      <Fragment>
        {/*---------导航栏-----------*/}
         <Top />

        {/*--------欢迎字样 -------------*/}
        <div className="typeface">
          HELLO,
        </div>
        <br/>
        <div class="typeface_color">
          FIRE HYDRANT USER1.
        </div>
        <br/>
        <div className="typeface">
          WELCOME BACK.
        </div>
        <div className="condition">
          what is your condition?
        </div>
        {/*----------功能区-------------*/}
          <div className="onfire">
            <img
              style={{ width: 100, height: 100 }}
              src={imgURL4} alt=""/>
            <a>ON FIRE</a>
          </div>


          <div className="putout">
            <img
              style={{ width: 100, height: 100 }}
              src={imgURL5} alt=""/>
            <a>PUT OUT</a>
          </div>

      </Fragment>

    )
  }
}
export default firstView ;
