import React from 'react';
import { ContentLayout } from '@/layouts/contentLayout';

import "./account.scss"
import { Avatar, Button, Descriptions,Statistic, Icon, Tag } from 'antd';
import { connect } from 'dva';
import { get } from 'lodash-es';
import VipSvg from '@/assets/img/vip.svg'

const mapStateToProps = (state) => {
  return {
    me: state.global.me,
  }
}

@connect(mapStateToProps)
class AccountView extends React.PureComponent {

  render() {
    return (
      <div className="dashboard_view">
        <div className="dashboard_content">
          <div className="dashboard_item dashboard_account">
            <div className="avatar">
              <Avatar
                size={80}
                src="http://demo.sc.chinaz.net/Files/DownLoad/moban/201907/moban3892/images/t1.jpg"
              />
            </div>
            <div className="profile">
              <div className="profile_title">
                <div className="name">
                  {get(this.props, 'me.nickname', '')}
                  {/*<Icon component={VipSvg}/>*/}
                </div>
                <div className="statics">
                  <Statistic  value={99} prefix={<Icon type="like"  theme="twoTone" twoToneColor="#52c41a"/>} />
                  <Statistic  value={10} prefix={<Icon type="frown" theme="twoTone" twoToneColor="#f5222d"/>} />
                </div>
              </div>
              <Descriptions >
                <Descriptions.Item label="姓名">{get(this.props, 'me.name', '')}</Descriptions.Item>
                <Descriptions.Item label="电话">{get(this.props, 'me.phone', '')}</Descriptions.Item>
                <Descriptions.Item label="介绍">
                  {get(this.props, 'me.motto', "") === "" ? "这个人很懒，什么也没有留下" : this.props.me.motto}
                </Descriptions.Item>
              </Descriptions>
              <Button size="small" type="primary" >修改个人资料</Button>
            </div>
          </div>
          <div className="dashboard_item">

          </div>
        </div>
      </div>
    )
  }
}

export default AccountView;
