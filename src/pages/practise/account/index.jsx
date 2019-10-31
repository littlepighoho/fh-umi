import React from 'react';
import "./index.scss";
import  {Card,Icon,Avator,Carousel,Descriptions} from 'antd';
import router from 'umi/router';
import { connect } from 'http2';

const mapStateToProps=(state)=>{
  return{
    auth:state.account.auth,
  };
};

@connect(mapStateToProps)
class AccountView extends React.PureComponent{
  state={
    "username":"Administer",
    "role":"总管理员",
    "number":"001"
  };
  doGetMessage=(payload)=>{
    this.props.dispatch({
      type:'account/getMessage',
      payload:{
        "username":payload.username,
        "role":payload.role,
        "number":payload.number
      },
    }).then(()=>{
      if(this.props.auth){
        router.push('')
      }
    })
  };
  handleChange=()=>{
    this.props.history.push('')
  };

  render(){
    return(
      <ContentLayout dogemessage={this.doGetMessage}>
        <div>
          <button></button>
        </div>
      </ContentLayout>
    )
  }
}
