import React,{Component,Fragment} from 'react';
import './team.scss';

import { Steps, Button, message,Card,Descriptions} from 'antd';
import Step1 from "@/components/create_team/step1"
import Step2 from '@/components/create_team/step2';
import Step3 from '@/components/create_team/step3';
const { Step } = Steps;
const steps = [
  {
    id:1,
    title: '第一步',
    content: 'First-content',

  },
  {
    id:2,
    title: '第二步',
    content: 'Second-content',
  },
  {
    id:3,
    title: '第三步',
    content: 'Last-content',
  },
];


function getStepContent(id) {
  // eslint-disable-next-line default-case
  switch (id) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return  <Step3/>;
  }
}

class teamView extends React.Component {
  static propTypes={

  };
  static  defaultProps={

  }


  state={
    current:0,
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     current: 0,
  //   };
  // }


  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleChangeStep=(keyName)=>()=>{
    if(keyName==='next'){
      this.setState({
        current:this.state.current+1,
      })
    }else{
      this.setState({
        current:this.state.current-1,
      })
    }

  };



  render() {
    const { current } = this.state;
    return (


      <div>

        <Steps className="step" current={current} >
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <div className="steps-content">
          {getStepContent(current)}
        </div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" htmlType="submit" onClick={this.handleChangeStep('next')}>
              下一步
            </Button>
          )}

          {current === steps.length - 1 && (
            <Button type="primary" htmlType="submit" onClick={() => message.success('队伍创建成功!')}>
              创建队伍！
            </Button>
          )}

          {current > 0 && (
            <Button style={{ marginLeft: 8 }} htmlType="submit" onClick={this.handleChangeStep('prev')}>
              上一步
            </Button>
          )}
        </div>
      </div>
    );
  }
};
export  default teamView;
