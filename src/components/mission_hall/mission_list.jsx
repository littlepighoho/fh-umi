import React from 'react';
import './mission_list.scss'

class MissionList extends React.PureComponent {
  state = {

  };

  render() {
    const { listData } = this.props;
    return (
      <div className="list-widget">
        假装有列表项
        {listData.map((item) => {
          return <div style={{ margin: '4px', border: "1px solid red"}}>
            <div>{item.title}</div>
            <div>{item.description}</div>
          </div>
        })}
      </div>
    )
  }
}

export default MissionList;
