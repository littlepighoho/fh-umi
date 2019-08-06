import React from 'react';
import { Card,Checkbox } from 'antd';
import "./step.scss";


class Step1 extends React.Component {
  state = {};
  render() {
    function onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    }
    return (
    <div className="team_fist">请阅读创建队伍需知
          <Card className="card_word">
            <ul>
              <li>任何人都可以创建队伍</li>
              <li>等级限制成员数量</li>
              <li>队伍只能接团队任务</li>
              <li>正在进行任务的成员不可参与当前任务</li>
              <li>只能由队长请求任务</li>
            </ul>
          </Card>
      <Checkbox className="check" defaultChecked={true} onChange={onChange}>
        我已经阅读
      </Checkbox>
    </div>
    );
  }
}
export default Step1;
