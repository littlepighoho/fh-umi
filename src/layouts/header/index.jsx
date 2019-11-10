import React from 'react';
import './index.scss';
import { Menu, Icon, Avatar, Button, Spin } from 'antd';
import { connect } from 'dva';
import { get } from 'lodash-es'
import router from 'umi/router';
import { buildResourcePath } from '@/utils/path_helper';
const { SubMenu } = Menu;

const mapStateToProps = (state) => {
  return {
    me: state.global.me,
  }
}

@connect(mapStateToProps)
class FhHeader extends React.PureComponent {

  state = {
  };

  handleLogout = () => {
    this.props.dispatch({
      type: 'global/logout',
      payload: {},
    })
  };
  handleSkip =() =>{
    this.props.history.push("/account");
  }
  render() {

    return (
      <div className='fh_header'>
        <div className='header_title'>
          123
        </div>
        <div className='action_bar'>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ display: 'flex', justifyContent: 'row', alignItems: 'center'}}
          >
            <Menu.Item key="notice">
              <Icon type="bell" style={{ fontSize: '26px', color: 'white' }} theme="filled" />
            </Menu.Item>
            {(!this.props.isLoading && this.props.auth.logined && this.props.me) && <SubMenu
              title={
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Avatar
                      shape="square"
                      size="large"
                      className="account_avatar"
                      // src="http://demo.sc.chinaz.net/Files/DownLoad/moban/201907/moban3892/images/t1.jpg"
                      src={get(this.props.me, 'avator') ? buildResourcePath(get(this.props.me, 'avator')) : null}
                    />
                    <div style={{ margin: '0 12px', fontSize: '16px'}}>
                      {this.props.me.nickname}
                    </div>
                  </div>
              }
            >
              <Menu.Item key="setting" onClick={this.handleSkip}>个人设置</Menu.Item>
              <Menu.Item key="logout" onClick={this.handleLogout}>退出</Menu.Item>
            </SubMenu>}
            {!this.props.auth.logined && !this.props.isLoading && <Button
              type="primary"
              style={{ margin: '0 16px', fontWeight: 'bold'}}
              size={'small'}
              onClick={() => router.push('/welcome/login')}
            >
              登录
            </Button>}
          </Menu>
        </div>
      </div>
    )
  }
}

export  default FhHeader;
