import React, { PureComponent, createElement } from 'react';
import { Button } from 'antd';
import styles from './index.less';
import router from 'umi/router'

class EditableLinkGroup extends PureComponent {
  static defaultProps = {
    links: [],
  };

  render() {
    const { links } = this.props;
    return (
      <div className={styles.linkGroup}>
        {links.map(link =>
          <a onClick={() => router.push(link.url)}>{link.title}</a>
        )}
      </div>
    );
  }
}

export default EditableLinkGroup;
