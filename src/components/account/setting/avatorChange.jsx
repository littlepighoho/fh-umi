
import React from 'react';
import './avatorChange.scss';
import { Upload, Icon, Modal,message,Slider,Avatar} from 'antd';
import router from 'umi/router';
import { connect } from 'react-redux';
import { get } from 'lodash-es';
import { noop } from 'lodash-es';

const BOX_SIZE = 200;
const BOX_BORDER = 80;

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
  const me = get(state.account,"me",[]);
  return {
    me: me,
  }
};

@connect(mapStateToProps)
class AvatarChange extends React.Component {
  state = {
    loading: false,
    avator:'',
    visible:false,
    image:this.props.image,
    scale:12,
  };
  handleScale= (value) =>{

  }
  handleFileSelect=( file)=>{
    this.setState({
      image:file,
    })
  }
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
  open = () =>{
    this.setState({
       visible:true,
    })
  }
  onClose = () =>{
    this.setState({
      visible:false,
    })
  }
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
          <Avatar src={get(this.props,"me.avator",[])} size={160} onClick={this.open}/>
        <Modal
          visible={this.state.visible}
          title="修改头像"
          okText="确认"
          onCancel={this.onClose}
          onOk={this.handleCreate}
          width={400}>
          <Upload
            className="avatar_uploader"
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={this.handleFileSelect}
            onChange={this.handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%'}} /> : uploadButton}
          </Upload>
          <Slider
            onChange={(value) => {this.setState({scale:value})}}
            className="avatar_slider"
            min={1}
            max={2}
            step={0.01}
            value={this.state.scale}
            style={{ width: 280, margin: '10px auto' }}
          />
       </Modal>
      </div>
    );
  }
}

export default  AvatarChange;
