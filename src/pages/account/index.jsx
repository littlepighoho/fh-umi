import React from 'react';
import {Card,Icon,Avatar,Carousel,Descriptions} from  'antd';
import "./index.scss";

const {Meta} = Card;

export default class AccountView extends React.PureComponent{
  state = {
    current: 'mail',
  };

  render() {

    return (
      <div>
          {/*个人基础信息*/}
        <Card  className="account_date"

          cover={
            <Avatar className="account_avatar" src="http://demo.sc.chinaz.net/Files/DownLoad/moban/201907/moban3892/images/t1.jpg" />
          }
               title="个人资料"
        >
          <Descriptions className="account_description">
            <Descriptions.Item label="昵称">jing</Descriptions.Item>
            <Descriptions.Item label="微信">12346</Descriptions.Item>
            <Descriptions.Item label="出生年月日" >1999年1月1日</Descriptions.Item>
            <Descriptions.Item label="等级">🌟🌟🌟</Descriptions.Item>
            <Descriptions.Item label="接受任务数">30</Descriptions.Item>
            <Descriptions.Item label="发布任务数">10</Descriptions.Item>
            <Descriptions.Item label="自我介绍">
              &nbsp;&nbsp;&nbsp;&nbsp;对待工作认真负责，善于沟通、协调有较强的组织能力与团队精神；活泼开朗、乐观上进、有爱心并善于施教并行；上进心强、勤于学习能不断提高自身的能力与综合素质。在未来的工作中，我将以充沛的精力，刻苦钻研的精神来努力工作，稳定地提高自己的工作能力，与企业同步发展。
            </Descriptions.Item>
          </Descriptions>
          <button  type="primary" className="account_button">修改个人信息</button>
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
            <div>

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
    )
  }
}
