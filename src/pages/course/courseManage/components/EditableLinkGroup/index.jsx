import React, { PureComponent, createElement } from 'react';
import { Button } from 'antd';
import styles from './index.less';

class EditableLinkGroup extends PureComponent {
  static defaultProps = {
    links: [],
    linkElement: 'a',
  };

  render() {
    const { links, linkElement } = this.props;
    return (
      <div className={styles.linkGroup}>
        {links.map(link =>
          <a onClick={() => router.push()}>link.title,</a>
        )}
      </div>
    );
  }
}

export default EditableLinkGroup;
