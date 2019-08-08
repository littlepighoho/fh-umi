import React from 'react';
import "./index.scss";
import {Card,Icon,Avatar,Carousel,Descriptions} from  'antd';
import { ContentLayout } from '@/layouts/contentLayout';
import { connect } from 'dva';
import router from 'umi/router';

const mapStateToProps = (state) => {
  return {
    auth:state.account.auth,
  };
};


@connect(mapStateToProps)
class AccountView extends React.PureComponent{

  state = {
    "username":"4@firehydrant.com",
    "team":{
      "role":'队员',
      "nickname":"国服集结",
      "create_time":1563979767.82811,
      "id":2
    },
    "role":'普通用户',
    "phone":"66666666",
    "motto":"好好学习天天向上",
    "avator":"http://demo.sc.chinaz.net/Files/DownLoad/moban/201907/moban3892/images/t1.jpg",
    "nickname":"4@firehydrant.com",
    "update_time":1563976794.03092,
    "create_time":1563976794.0309,
    "sex":'小姐姐'
  };

  doGetMessage = (payload) => {
    this.props.dispatch({
      type: 'account/getMessage',
      payload: {
        "username":payload.username,
        "team":{
          "role":payload.role,
          "nickname":payload.nickname,
          "create_time":payload.create_time,
          "id":payload.id
        },
        "role":payload.role,
        "phone":payload.phone,
        "motto":payload.motto,
        "avator":payload.avator,
        "nickname":payload.nickname,
        "update_time":payload.update_time,
        "create_time":payload.create_time,
        "sex":1

      },
    }).then(() => {
      if(this.props.auth) {
        router.push('')
      }
    })
  };

  handleChange = () =>{
    this.props.history.push('/account/setting')
  };

  render() {
    return (
      <ContentLayout dogeMessage={this.doGetMessage}>
      <div>
          {/*个人基础信息*/}
        <Card  className="account_date"
          cover={
            <Avatar className="account_avatar" src={this.state.avator} />
          } title="个人资料"
        >
          <Descriptions className="account_description" column={4}>
            <Descriptions.Item label="用户名" span={2}>{this.state.username} </Descriptions.Item>
            <Descriptions.Item label="角色" span={2}>{this.state.role}</Descriptions.Item>
            <Descriptions.Item label="昵称" span={2} >{this.state.nickname}</Descriptions.Item>
            <Descriptions.Item label="性别" span={2}>{this.state.sex}</Descriptions.Item>
            <Descriptions.Item label="电话" span={2}>{this.state.phone}</Descriptions.Item>
            <Descriptions.Item label="创建时间" span={2}>{this.state.create_time}</Descriptions.Item>
            <Descriptions.Item label="一句话签名">
              &nbsp;&nbsp;&nbsp;&nbsp;{this.state.motto}
            </Descriptions.Item>
          </Descriptions>
          <button  type="primary" className="account_button" onClick={this.handleChange}>
              修改个人信息</button>
        </Card>
          {/*团队信息*/}
        <Card  className="account_team"
                title="团队信息"
        >
          <Descriptions className="account_description" column={4}>
            <Descriptions.Item label="团队昵称" span={2}>{this.state.team.nickname} </Descriptions.Item>
            <Descriptions.Item label="角色" span={2}>{this.state.team.role}</Descriptions.Item>
            <Descriptions.Item label="创建时间" span={2}>{this.state.team.create_time}</Descriptions.Item>
            <Descriptions.Item label="id" span={2}>{this.state.team.id}</Descriptions.Item>
          </Descriptions>
        </Card>

        {/*发布任务数据分析*/}
        <Card  className="account_num"
               title="发布任务">
          <Carousel autoplay className="account_numContent">
            <div>
              <Card title="fir原型图设计" className="account_accepted">
                <p>接受者：ztr</p>
                <p>发布日期：1999年1月1日</p>
                <p>等    级:🔥🔥🔥🔥</p>
                <p >金    额：¥30</p>
              </Card>
              <Card title="fir原型图设计" className="account_accepted">
                <p>接受者：ztr</p>
                <p>发布日期：1999年1月1日</p>
                <p>等    级:🔥🔥🔥🔥</p>
                <p >金    额：¥30</p>
              </Card>
            </div>
            <div>
              <Card title="fir原型图设计" className="account_accepted">
                <p>接受者：ztr</p>
                <p>发布日期：1999年1月1日</p>
                <p>等    级:🔥🔥🔥🔥</p>
                <p >金    额：¥30</p>
              </Card>
              <Card title="fir原型图设计" className="account_accepted">
                <p>接受者：ztr</p>
                <p>发布日期：1999年1月1日</p>
                <p>等    级:🔥🔥🔥🔥</p>
                <p >金    额：¥30</p>
              </Card>
            </div>
          </Carousel>
        </Card>

        {/*接受任务数据分析*/}
        <Card  className="account_num"
               title="接受任务">
          <Card title="毕业答辩PPT" className="account_accepted">
            <p>发布者：ztr</p>
            <p>发布日期：1999年1月1日</p>
            <p>等    级:🔥🔥🔥🔥</p>
            <p >金    额：¥30</p>
            <p>发布者评价评价：<br></br>
              项目最后成果不错
            </p>
          </Card>
          <Card title="fir原型图设计" className="account_accepted">
            <p>发布者：ztr</p>
            <p>发布日期：1999年1月1日</p>
            <p>等    级:🔥🔥🔥🔥</p>
            <p >金    额：¥30</p>
            <p>发布者评价：<br></br>
              项目最后成果不错
            </p>
          </Card>
        </Card>

        {/*信用值分析*/}
        <Card className="account_credit" title="信用">
          <p>信用分数：300<Icon type="crown" style={{color:"#FACD91" }}/><Icon type="crown" style={{color:"#FACD91" }}/></p>
            <p>不良信用记录：</p>
            <Card className="account_creditRecord" title="招新推送">
              <p>未完成原因：没有按时间完成</p>
              <p>扣除积分：100分</p>
            </Card>
        </Card>

      </div>
      </ContentLayout>
    )
  }
}


export default AccountView;
