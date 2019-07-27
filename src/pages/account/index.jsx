import React from 'react';
import {Layout,Menu,Icon} from 'antd';
import  {Link} from 'react-router-dom';

const {Header,Content,Footer,Sider} = Layout;

class  Personal extends React.PureComponent{
    state = {
    };

    render(){
        return (
            // <Layout>
            //     <Sider style={{overflow :'auto',height:'100vh',position:'fixed',left:0}}>
            //         <div className="logo"/>
            //         <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} >
            //             <Menu.Item key="1" >
            //                 <Link to={null}>
            //                 <Icon type="user"/>
            //                 <span className="nav-text">个人资料</span>
            //                 </Link>
            //             </Menu.Item>
            //             <Menu.Item key="2">
            //                 <Link to={null}>
            //                 <Icon type="carry-out"/>
            //                 <span className="nav-text">我的任务</span>
            //                 </Link>
            //             </Menu.Item>
            //             <Menu.Item key="3">
            //                 <Link to={null}>
            //                 <Icon type="message"/>
            //                 <span className="nav-text">我的评论</span>
            //                 </Link>
            //             </Menu.Item>
            //         </Menu>
            //     </Sider>
            //     <Layout style={{marginLeft:200}}>
            //         <Header style={{background:'#fff',padding:0}}/>
            //         <Content style={{margin:'24px 16px 0',overflow:'initial'}}>
            //             <div style={{padding:24,backgroud:'#fff',textAlign:'center'}}>
            //                 ....
            //                 Content
            //             </div>
            //         </Content>
            //         <Footer  style={{textAlign:'center'}}>我们一起学猫叫</Footer>
            //     </Layout>
            // </Layout>
            <div>123</div>
        );
    }
}

export default  Personal;
