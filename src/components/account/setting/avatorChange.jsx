
import React from 'react';
import './avatorChange.scss';
import { Upload, Icon, Modal,Button,Row,Col,message,Slider,Avatar} from 'antd';
import router from 'umi/router';
import { buildResourcePath } from '@/utils/path_helper';
import { connect } from 'react-redux';
import { get } from 'lodash-es';
import { noop } from 'lodash-es';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import rgba from 'color-rgba';

const BOX_SIZE = 100;
const BOX_BORDER = 50;
const mapStateToProps = (state) => {
  const me = get(state.global,"me",[]);
  console.log(me)
  return {
    me: me,
  }
};

@connect(mapStateToProps)
class avatorChange extends React.PureComponent {
  static propTypes = {
    image: PropTypes.string,
    // 最大放大倍数（x10）
    max: PropTypes.number,
    // 最小缩放倍数（x10）
    min: PropTypes.number,
    // 截图区域实际宽度
    width: PropTypes.number,
    // 截图区域实际高度
    height: PropTypes.number,
    // 边缘区域宽度
    borderWidth: PropTypes.number,
    // 边缘区域高度
    borderHeight: PropTypes.number,
    quality: PropTypes.number,
    onUpload: PropTypes.func,
    mimeType: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  };

  static defaultProps = {
    image: '',
    min: 10,
    max: 50,
    quality: 0.92,
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: BOX_BORDER,
    borderHeight: BOX_BORDER,
    onUpload: noop,
    mimeType: 'image/jpeg',
    style: {},
  };

  state = {
    uploading: false,
    scale: 12,
    image: this.props.image,
  };

  editor = React.createRef();

  handleFileSelect = (file) => {
    this.setState({
      image: file,
    });
  };

  handleSave = () => {
    this.setState({
      uploading: true,
    }, () => {
      const imageData = this.editor.current.getImageScaledToCanvas().toDataURL(
        this.props.mimeType,
        this.props.quality
      );
      this.props.onUpload(imageData);
      this.setState({
        uploading: false,
      });
    });
  };

  render() {
    return (<div
      className="avatar-editor"
      style={{
        width: this.props.width + this.props.borderWidth + this.props.borderWidth,
        height: this.props.height + this.props.borderWidth + this.props.borderHeight,
        ...this.props.style,
      }}
    >
      {this.state.image ? <AvatarEditor
        ref={this.editor}
        image={this.state.image}
        width={this.props.width}
        height={this.props.height}
        border={this.props.borderWidth}
        color={rgba('rgba(0,0,0,0.8)')} // RGBA
        scale={this.state.scale / 10 } // eslint-disable-line
        rotate={0}
      /> : <div
        className="select-cover"
        style={{
          backgroundImage:"url("+(get(this.state.global,"me.avator",[]) ? buildResourcePath(get(this.props.me, 'avator')) : null)+")",
          width: this.props.width + this.props.borderWidth + this.props.borderWidth,
          height: this.props.height + this.props.borderWidth + this.props.borderHeight,
        }}
      >
        <Upload beforeUpload={this.handleFileSelect} >
          <Button type="primary" style={{ opacity:'0.8'}}>
            <Icon type="upload" /> 选择图片
          </Button>
        </Upload>
      </div>}
      <div className="control-bar">
        <Slider
          accept="image/*"
          min={this.props.min}
          max={this.props.max}
          value={this.state.scale}
          tipFormatter={value => value / 10}  // eslint-disable-line
          onChange={(value) => { this.setState({ scale: value }); }}
          disabled={!this.state.image}
        />
        <Row>
          <Col span={12}>
            <Button
              type="primary"
              loading={this.state.uploading}
              disabled={!this.state.image && !this.props.disabled}
              onClick={this.handleSave}
            >
              {!this.state.uploading && <Icon type="check" />} 确定
            </Button>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Upload
              beforeUpload={this.handleFileSelect}
              showUploadList={false}
            >
              <Button
                type="default"
                disabled={!this.state.image}
              >
                <Icon type="reload" /> 重新选择
              </Button>
            </Upload>
          </Col>
        </Row>
      </div>
    </div>);
  }
}
export default avatorChange;