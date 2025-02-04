import React, { useState } from 'react';
import { Layout, InputNumber, Button, Typography, Space, Form } from 'antd';

const { Title, Text } = Typography;

const Recharge = () => {
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(0);
  
  const handleChange = (value) => {
    setValue(value);
  };

  const handleSubmit = () => {
    // Process the recharge amount here
    console.log("Recharge amount:", value);
  };

  return (
    <Layout style={{ padding: '50px' }}>
      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', width: '400px', margin: 'auto' }}>
        <Title level={3} style={{ textAlign: 'center' }}>充值</Title>
        <div style={{ marginBottom: '20px' }}>
          <Text>账户余额: 100</Text>
        </div>

        <Form onFinish={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <Text>请选择充值金额</Text>
            <InputNumber 
              style={{ width: '100%' }} 
              value={value}
              onChange={handleChange}
              placeholder="请输入金额"
              min={10}
              max={200}
            />
          </div>

          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Button type="default" onClick={() => setValue(10)}>10</Button>
            <Button type="default" onClick={() => setValue(30)}>30</Button>
            <Button type="default" onClick={() => setValue(50)}>50</Button>
            <Button type="default" onClick={() => setValue(100)}>100</Button>
            <Button type="default" onClick={() => setValue(200)}>200</Button>
            <Button type="default" onClick={() => setValue(amount)}>自定义</Button>
          </Space>

          <div style={{ marginTop: '20px' }}>
            <Button 
              type="primary" 
              block 
              htmlType="submit"
            >
              确定支付
            </Button>
          </div>

          <div style={{ marginTop: '20px', fontSize: '12px' }}>
            <Text type="secondary">
              如遇充值高峰，到账可能延迟，请耐心等待，勿重复充值。如充值后超过两小时未到账，请联系我们123-456-789
            </Text>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Recharge;
