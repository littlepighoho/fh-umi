import React from 'react';
import { Card,Checkbox,List, Typography } from 'antd';
import "./step.scss";
const data = [
  '1、任何人都可以创建队伍',
  '2、等级限制成员数量',
  '3、队伍只能接团队任务',
  '4、正在进行任务的成员不可参与当前任务',
  '5、只能由队长请求任务',
];

class Step1 extends React.Component {
  state = {};

  render() {
    function onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    }

    return (
      <div>

        <h3 className="team_fist">请阅读创建队伍需知</h3>
        <List
          size="small"
          bordered={false}
          dataSource={data}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
        <Checkbox className="check" defaultChecked={true} onChange={onChange}>
          我已经阅读
        </Checkbox>

      </div>
    );
  }
}
export default Step1;
