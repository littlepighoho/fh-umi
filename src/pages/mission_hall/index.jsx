import React from 'react';
import  {Row, Col } from 'antd'
import './mission_hall.scss'
import MissionList from '@/components/mission_hall/mission_list';

class MissionHallView extends React.PureComponent {

  DEMO = [{
    title: 'hei',
    description: 'heiasdasd',
  }, {
    title: 'sb',
    description: 'sbsbsbsbsb',
  }]

  render(){
    return (
      <div className="mission_hall">
        {/*col一定要在row里面才会有效*/}
        <Row gutter={8}>
          <Col span={7}>
            <div className="filter">
              过滤条件
            </div>
          </Col>
          <Col span={17}>
            <div className="mission-list">
              <MissionList listData={this.DEMO} />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default MissionHallView;
