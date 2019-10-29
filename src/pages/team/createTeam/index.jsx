import React from 'react';
import './createTeam.scss';
import { Steps, Button} from 'antd';
import Step1 from "@/components/create_team/Step1"
import Step2 from '@/components/create_team/Step2';
import { connect } from 'dva';
import router from 'umi/router';
// import router from 'umi/router';
// const mapStateToProps = (state) => {
//   return {
//     auth: state.createTeam.auth,
//   }
// };
// @connect(mapStateToProps)
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

];
function getStepContent(id) {
  // eslint-disable-next-line default-case
  switch (id) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
  }
}

class teamView extends React.Component {

  // docreateTeam = (payload) => {
  //   this.props.dispatch({
  //     type: 'createTeam',
  //     payload: {
  //       nickname: payload.nickname,
  //       slogan: payload.slogan,
  //       password: payload.password,
  //       public: payload.public
  //     }
  //   }).then(() => {
  //     if(this.props.auth.logined) {
  //       router.push('')
  //     }
  //   })
  // };
  static propTypes={
  };
  static  defaultProps={
  }

  state={
    current:0,
  };
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

  Step2 = (payload) => {
    this.props.dispatch({
      type: 'createTeam',
      payload: payload
    }).then(() => {
      router.push('/team')
    })
  };

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps className="step" current={current} Step2={this.Step2}>
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
        </div>
      </div>
    );
  }
};
export  default teamView;
