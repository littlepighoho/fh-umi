import React from 'react';
import { connect } from 'dva';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import PageLoading from '@/components/PageLoading';
import { DVAKEYS } from '@/constant/dvaKeys';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      // 验证登录状态
      dispatch({
        type: DVAKEYS.ACCOUNT.CHECKSTATUS,
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, account } = this.props;
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = account.logined && account.currentAccount;
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!isLogin) {
      return <Redirect to="user/login" />;
    }
    return children;
  }
}

export default connect(({ account, loading }) => ({
  account,
  loading: loading.models.account,
}))(SecurityLayout);
