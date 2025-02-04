import React, { useState } from 'react';
import { Table, Button, Tag, Switch, message, Space } from 'antd';
import { useNavigate } from "react-router-dom";

const LogisticsInfo = () => {
    const navigate = useNavigate();
  // 初始化物流信息列表
  const [logisticsData, setLogisticsData] = useState([
    {
      key: '1',
      cabinetNumber: 'C01',
      paymentAmount: '50元',
      storageTime: '2025-02-01 08:00',
      isExtracted: false,
      logisticsStatus: '在途',
    },
    {
      key: '2',
      cabinetNumber: 'C02',
      paymentAmount: '70元',
      storageTime: '2025-02-02 09:30',
      isExtracted: true,
      logisticsStatus: '已送达',
    },
    {
      key: '3',
      cabinetNumber: 'C03',
      paymentAmount: '30元',
      storageTime: '2025-02-03 10:00',
      isExtracted: false,
      logisticsStatus: '已寄件',
    },
  ]);

  // 丢弃操作
  const handleDiscard = (key) => {
    setLogisticsData(logisticsData.filter(item => item.key !== key));
    navigate('/discard?source=logistics')
    // message.success('丢弃成功！');
  };

  // 表格列定义
  const columns = [
    {
      title: '柜子编号',
      dataIndex: 'cabinetNumber',
      key: 'cabinetNumber',
    },
    {
      title: '支付金额',
      dataIndex: 'paymentAmount',
      key: 'paymentAmount',
    },
    {
      title: '存入时间',
      dataIndex: 'storageTime',
      key: 'storageTime',
    },
    {
      title: '是否取出',
      dataIndex: 'isExtracted',
      key: 'isExtracted',
      render: (text) => (
        <Switch
          checked={text}
          disabled
          checkedChildren="已取出"
          unCheckedChildren="未取出"
        />
      ),
    },
    {
      title: '物流状态',
      dataIndex: 'logisticsStatus',
      key: 'logisticsStatus',
      render: (status) => {
        let color;
        switch (status) {
          case '在途':
            color = 'orange';
            break;
          case '已送达':
            color = 'green';
            break;
          case '已寄件':
            color = 'blue';
            break;
          default:
            color = 'default';
            break;
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary" danger
            onClick={() => handleDiscard(record.key)}
          >
            丢弃
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Table
        columns={columns}
        dataSource={logisticsData}
        pagination={false}
        rowKey="key"
      />
    </div>
  );
};

export default LogisticsInfo;
