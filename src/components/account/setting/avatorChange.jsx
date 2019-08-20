
import React from 'react';
import './avatorChange.scss';
import { Upload, Icon, Card,message,Avatar} from 'antd';
import router from 'umi/router';
import { connect } from 'react-redux';

// 上传文件获取编码
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

//上传条件
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('你只可以使用JPG/PNG 的文件!');
  }
  return isJpgOrPng;
}

//接口配置
const mapStateToProps = (state) => {
  return {
    auth: state.account.auth,
  }
};

@connect(mapStateToProps)
class AvatarChange extends React.Component {
  state = {
    loading: false,
    avator:''
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} style={{color:"#ad2102"}}/>
        <div  style={{color:"#ad2102",font:"20px"}}>修改头像</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
        <div className="avatar_content">
          {/*上传图片*/}
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar_uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
            value={this.state.avator}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%'}} /> : uploadButton}
          </Upload>
        </div>
    );
  }
}

export default  AvatarChange;
