import { Button } from 'antd';
import React from 'react';
const { useState } = React;

export default function () {
  const [ count, setCount ] = useState(0)
  return(
    <div>
      点击次数: { count }
      <Button onClick={() => {setCount(count + 1)}}>点击</Button>
    </div>
  )
}

