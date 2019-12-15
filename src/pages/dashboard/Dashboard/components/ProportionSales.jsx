import { Card, Radio } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { Pie } from './Charts';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const ProportionSales = ({
  dropdownGroup,
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title={
      <FormattedMessage
        id="dashboardanddashboard.analysis.the-proportion-of-sales"
        defaultMessage="The Proportion of Sales"
      />
    }
    style={{
      height: '100%',
    }}
    // extra={
    //   <div className={styles.salesCardExtra}>
    //     {dropdownGroup}
    //     <div className={styles.salesTypeRadio}>
    //       <Radio.Group value={salesType} onChange={handleChangeSalesType}>
    //         <Radio.Button value="all">
    //           <FormattedMessage id="dashboardanddashboard.channel.all" defaultMessage="ALL" />
    //         </Radio.Button>
    //         <Radio.Button value="online">
    //           <FormattedMessage id="dashboardanddashboard.channel.online" defaultMessage="Online" />
    //         </Radio.Button>
    //         <Radio.Button value="stores">
    //           <FormattedMessage id="dashboardanddashboard.channel.stores" defaultMessage="Stores" />
    //         </Radio.Button>
    //       </Radio.Group>
    //     </div>
    //   </div>
    // }
  >
    <div>

      <Pie
        hasLegend
        // data={salesPieData}
        valueFormat={value => <Yuan>{value}</Yuan>}
        height={248}
        lineWidth={4}

      />
    </div>
  </Card>
);

export default ProportionSales;
