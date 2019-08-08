import React from 'react';
import { Icon,Select} from 'antd';
import "./setting.scss";


class Step3View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "phone":"12345678966",
      count: 60, // 秒数初始化为60秒
      icode: '',
      code_ts: '获取验证码',
      show_btn: true,
      toast: false,
    };
  }


  render() {
    return (
      <div className="setting_end">
          手机号修改成功
        <Icon type="fire" theme="filled" className="setting_fire"/>
      </div>
    );
  }
}

export default Step3View;
