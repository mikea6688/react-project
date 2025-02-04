import React from "react";
import { Button, Card, Space, Typography, Row, Col } from "antd";
import { useLocation } from "react-router-dom";

const { Text } = Typography;

function PaymentPage() {
  // 从路由中获取传递的存储信息
  const location = useLocation();
  const { storageDuration, totalCost } = location.state || {
    storageDuration: "3天", // 默认值
    totalCost: "50元", // 默认值
  };

  const handlePayment = () => {
    // 处理支付逻辑
    console.log("支付成功");
  };

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", padding: "40px 0" }}>
      <Row justify="center">
        <Col xs={24} sm={18} md={12} lg={8}>
          <Card
            bordered={false}
            style={{
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <Text style={{ fontSize: "18px", color: "#555" }}>
                您的存放时间为{" "}
                <Text strong style={{ fontSize: "20px", color: "#1890ff" }}>
                  {storageDuration}
                </Text>
                ，请支付所需费用为{" "}
                <Text strong style={{ fontSize: "20px", color: "#1890ff" }}>
                  {totalCost}
                </Text>
              </Text>
            </div>

            <Space direction="vertical" style={{ width: "100%" }}>
              <Button
                type="primary"
                size="large"
                block
                style={{
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                  fontSize: "18px",
                  height: "50px",
                }}
                onClick={handlePayment}
              >
                立即支付
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PaymentPage;
