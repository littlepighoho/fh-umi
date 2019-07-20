import React from 'react';
import router from 'umi/router';
import './index.scss';
import WelcomeView from '../pages/welcome/index';
import { Menu, Icon, Layout, Breadcrumb  } from 'antd';

const { SubMenu }  = Menu;
const { Header, Content, Footer, Sider} = Layout;

class BasicLayout extends React.PureComponent {
  state = {

  };

  handleNavChange = (item) => () => {
    router.push(item.path)
  }

  navItems = [{
    key: 'mission_hall',
    path: '/mission_hall',
    title: '任务大厅'
  }, {
    key: 'dashboard',
    path: '/dashboard',
    title: 'dashboard'
  }, {
    key: 'rank',
    path: '/rank',
    title: '排行榜'
  }];
  renderSelectedKeys = () => {
    const { location } = this.props;
    const key = location.pathname.split("/")[1];
    return key;
  };
  render() {
    const { location } = this.props;
    const key = location.pathname.split("/")[1];
    if(key === "welcome") {
      return <WelcomeView {...this.props} />
    }
    return (
      <Layout className="layout" style={{height:"100%"}}>
        <Sider style={{background: '#222222'}}>
          <div className="logo" style={{ marginLeft: '10px'}}>
            <h1 style={{color:"white", fontSize: "42px"}}>Fire</h1>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            style={{ lineHeight: '64px',background: '#222222'}}
            selectedKeys={this.renderSelectedKeys()}
          >
            {this.navItems.map((item) => {
              return (
                <Menu.Item key={item.key} onClick={this.handleNavChange(item)}>{item.title}</Menu.Item>
              )
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#303133'}}>

          </Header>
          <Content style={{ padding: '0 50px', background: '#303133'}}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center',background: '#303133' }}>FH ©2019 Created by Rom Chung</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default BasicLayout;
