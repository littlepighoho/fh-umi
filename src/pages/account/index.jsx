import React from 'react';
import "./index.scss";
import {Card,Icon,Avatar,Carousel,Descriptions} from  'antd';
import { ContentLayout } from '@/layouts/contentLayout';
import { connect } from 'dva';
import { get } from 'lodash-es';
import router from 'umi/router';

// <<<<<<< HEAD
const mapStateToProps = (state) => {
  console.log("state",state)
  return {
    me: state.account.me,
    entities:state.account.entities,
  };
};

function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n;
}
// 参数number为毫秒时间戳，format为需要转换成的日期格式
function formatTime (number, format) {
  var time = new Date(number)
  // time  =  time *1000;
  var newArr = []
  var formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
  newArr.push(time.getFullYear())
  newArr.push(formatNumber(time.getMonth() + 1))
  newArr.push(formatNumber(time.getDate()))

  newArr.push(formatNumber(time.getHours()))
  newArr.push(formatNumber(time.getMinutes()))
  newArr.push(formatNumber(time.getSeconds()))

  for (var i in newArr) {
      format = format.replace(formatArr[i], newArr[i])
  }
  return format;
}

function getSex(number){
  if( number == 1)
    return "小哥哥";
  else if(number == 2)
    return "小姐姐";
  else
    return "未知";
}
function getRole(number){
  if( number == 0)
    return "普通用户";
  else
    return "管理员";
}
function getTeamRole(number){
  if( number == 0)
    return "成员";
  else
    return "队长";
}

@connect(mapStateToProps)
class AccountView extends React.PureComponent{

  handleChangeAvatar = () => {
    this.props.history.push('/account/setting');
  };

  handleChange = () =>{
    this.props.history.push('/account/setting')
  };
  componentDidMount(){
    this.props.dispatch({
      type: 'account/me',
      payload: {},
    })
  }

  render() {
    return (
      <ContentLayout dogeMessage={this.doGetMessage}>
      <div>
          {/*个人基础信息*/}
        <Card  className="account_date"
          cover={
            <Avatar className="account_avatar" src={get(this.props, 'me.avator', '')} title="更改"onClick={this.handleChangeAvatar}/>
          }
          title="个人资料"
        >
          <Descriptions className="account_description" column={4}>
            <Descriptions.Item label="用户名" span={2}>  {get(this.props, 'me.username', '')} </Descriptions.Item>
            <Descriptions.Item label="角色" span={2}>{getRole(get(this.props, 'me.role', ''))}</Descriptions.Item>
            <Descriptions.Item label="昵称" span={2} >{get(this.props, 'me.nickname', '')}</Descriptions.Item>
            <Descriptions.Item label="性别" span={2}>{getSex(get(this.props, 'me.sex', ''))}</Descriptions.Item>
            <Descriptions.Item label="电话" span={2}>{get(this.props, 'me.phone', '')}</Descriptions.Item>
            <Descriptions.Item label="一句话签名" span={2}>
              &nbsp;&nbsp;&nbsp;&nbsp;{get(this.props, 'me.motto', '')}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间" span={2}>
              {formatTime(get(this.props, 'me.create_time', '')*1000,"Y-M-D h:m:s")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间" span={2}>
              {formatTime(get(this.props, 'me.update_time', '')*1000,"Y-M-D h:m:s")}
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
            <Descriptions.Item label="团队昵称" span={2}>{get(this.props, 'me.team.nickname', '')} </Descriptions.Item>
            {/* <Descriptions.Item label="团队id" span={2}>{get(this.props, 'me.team.id', '')}</Descriptions.Item> */}
            <Descriptions.Item label="角色" span={2}>{getTeamRole(get(this.props, 'me.team.role', ''))}</Descriptions.Item>
            <Descriptions.Item label="创建时间" span={2}>{formatTime(get(this.props, 'me.team.create_time', '')*1000,"Y-M-D h:m:s")}</Descriptions.Item>
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
