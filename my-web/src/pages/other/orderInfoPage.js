import React, { useState } from 'react';
import { Layout, Input, Button, Table, Typography, Space, Tag } from 'antd';
import './orderInfoPage.css'; // Import the custom CSS file

const { Title, Text } = Typography;

const OrderInfoPage = () => {
  // Sample data
  const [orders] = useState([
    {
      key: '1',
      orderNumber: 'A123456',
      cabinetNumber: 'C01',
      customerName: '张三',
      storageTime: '2025-02-01 08:00',
      storedDuration: '2 hours',
      voucher: '1234-5678-9012',
      cost: '50元',
      status: '未取出',
    },
    {
      key: '2',
      orderNumber: 'B987654',
      cabinetNumber: 'C02',
      customerName: '李四',
      storageTime: '2025-02-02 09:30',
      storedDuration: '3 hours',
      voucher: '9876-5432-1098',
      cost: '70元',
      status: '已取出',
    },
    {
      key: '3',
      orderNumber: 'C112233',
      cabinetNumber: 'C03',
      customerName: '王五',
      storageTime: '2025-02-03 10:00',
      storedDuration: '1 hour',
      voucher: '1122-3344-5566',
      cost: '30元',
      status: '已寄件',
    },
  ]);

  const [orderQuery, setOrderQuery] = useState('');
  const [statusQuery, setStatusQuery] = useState('');

  // Handle search query change
  const handleOrderQueryChange = (e) => {
    setOrderQuery(e.target.value);
  };

  const handleStatusQueryChange = (e) => {
    setStatusQuery(e.target.value);
  };

  // Filtered data based on queries
  const filteredOrders = orders.filter(
    (order) =>
      (order.orderNumber.includes(orderQuery) || orderQuery === '') &&
      (order.status.includes(statusQuery) || statusQuery === '')
  );

  const columns = [
    {
      title: '柜子编号',
      dataIndex: 'cabinetNumber',
      key: 'cabinetNumber',
    },
    {
      title: '存储时间',
      dataIndex: 'storageTime',
      key: 'storageTime',
    },
    {
      title: '已存时间',
      dataIndex: 'storedDuration',
      key: 'storedDuration',
    },
    {
      title: '暂存凭证',
      dataIndex: 'voucher',
      key: 'voucher',
      render: (text, record) => {
        const isExtracted = record.status === '已取出';
        return (
          <Text
            className={isExtracted ? 'voucher-text-extracted' : ''}
          >
            {text}
          </Text>
        );
      },
    },
    {
      title: '花费',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        const statusClass = 
          text === '已取出' ? 'status-tag-green' : 
          text === '未取出' ? 'status-tag-orange' : 
          'status-tag-blue';
          
        return <Tag className={`status-tag ${statusClass}`}>{text}</Tag>;
      },
    },
  ];

  return (
    <Layout className="order-info-page">
      <Layout.Content style={{ padding: '50px 20px' }}>
        <div className="order-info-container">
          {/* Top Search Section */}
          <div className="search-section">
            <Space>
              <Input
                className="search-input"
                placeholder="输入订单编号查询"
                value={orderQuery}
                onChange={handleOrderQueryChange}
              />
              <Input
                className="search-input"
                placeholder="选择订单状态查询"
                value={statusQuery}
                onChange={handleStatusQueryChange}
              />
              <Button type="primary" onClick={() => {}}>
                查询
              </Button>
            </Space>
          </div>

          {/* Orders Table */}
          <Table
            columns={columns}
            dataSource={filteredOrders}
            pagination={false}
            rowKey="key"
            className="table-container"
          />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default OrderInfoPage;
