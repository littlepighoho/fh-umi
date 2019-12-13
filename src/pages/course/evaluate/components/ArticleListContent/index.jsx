import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

const ArticleListContent = ({ data }) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{data.message}</div>
    <div className={styles.extra}>
      <Avatar src={data.avatar} size="small" />
      发布在
      <em>{moment(data.update_time * 1000).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
