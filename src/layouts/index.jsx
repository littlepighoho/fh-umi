import React from 'react';
import router from 'umi/router';
import './index.scss';
import { connect } from 'dva';
import WelcomeView from '../pages/welcome/index';
import { Menu, Icon, Layout, Breadcrumb  } from 'antd';
import withRouter from 'umi/withRouter';
import FhHeader from './header';
import Logo from '@/assets/img/fh-logo.png';



const { SubMenu }  = Menu;
const { Header, Content, Footer, Sider} = Layout;

const mapStateToProps = (state) => {
  const { auth } = state.global;
  const { me } = state.global;
  return {
    auth,
    isLoading: state.loading.effects['global/me'],
    me,
  };
};

@withRouter
@connect(mapStateToProps)
class BaseLayout extends React.PureComponent {

  componentDidMount() {
    this.props.dispatch({
      type: 'global/checkLogin',
      payload: {},
    })
  }

  state = {
    inlineCollapsed: true,
  };

  handleNavChange = (item) => () => {
    router.push(item.path)
  };

  navItems = [{
    key: 'account',
    path: '/account',
    title: '仪表盘',
    icon: 'dashboard'
  }, {
    key: 'mission_hall',
    path: '/mission_hall',
    title: '任务大厅',
    icon: 'fire'
  }, {
    key: 'rank',
    path: '/rank',
    title: '排行榜',
    icon: 'crown',
  }];
  renderSelectedKeys = () => {
    const { location } = this.props;
    const key = location.pathname.split("/")[1];
    return key;
  };
  render() {
    const { location } = this.props;
    const key = location.pathname.split("/")[1];
    console.log(this.props)
    if(key === "welcome") {
      return <WelcomeView {...this.props} />
    }
    return (
      <Layout className="layout" style={{height:"100%"}}>
        <Sider
          collapsible
          collapsed={this.state.inlineCollapsed}
          style={{background: '#222222'}}
          onCollapse={() => this.setState({inlineCollapsed: !this.state.inlineCollapsed})}
        >
          <div className="logo">
            {this.state.inlineCollapsed ?
              <img src={Logo} width={40} height={40}/>

              :
              <React.Fragment>
                <img src={Logo} width={40} height={40} />
                <div style={{color:"white", fontSize: "42px"}} >Fire</div>

              </React.Fragment>
            }
          </div>
          <Menu
            theme="dark"
            mode="inline"
            style={{ lineHeight: '64px',background: '#222222'}}
            selectedKeys={this.renderSelectedKeys()}
          >
            {this.navItems.map((item) => {
              return (
                <Menu.Item
                  key={item.key}
                  onClick={this.handleNavChange(item)}
                >
                  <Icon
                    type={item.icon}
                    theme="filled"
                    style={{ fontSize: '20px'}}
                  />
                  <span style={{fontWeight: 'bold', color: '#c1c1c1', fontSize: '16px', marginLeft: '4px'}}>{item.title}</span>
                </Menu.Item>
              )
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#303133'}} >
            <FhHeader { ...this.props } />
          </Header>
          <Content style={{ padding: '0 50px',  height:'calc(100% - 30px)',background: '#303133'}}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center',height:'30px',background: '#303133' }}>FH ©2019 Created by Rom Chung</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default BaseLayout;
