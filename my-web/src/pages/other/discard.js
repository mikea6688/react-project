import React from "react";
import { Button, Space, Typography, Row, Col, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Text } = Typography;

function Discard() {
    const navigate = useNavigate();
    const location = useLocation(); // 获取当前的 URL location
    const queryParams = new URLSearchParams(location.search); // 获取查询字符串
    const source = queryParams.get('source');

    const handleCancel = () => {
        if (source == "logistics") {
            navigate('/logisticsInfo')
        }
        else if (source == "order"){
            navigate('/other/pageTwo')
        }
    };

    const handleConfirm = () => {
        if (source == "logistics") {
            navigate('/logisticsInfo')
        }
        else if (source == "order"){
            navigate('/other/pageTwo')
        }
        console.log("操作已终止");
    };

    return (
        <div style={{ background: "#f5f5f5", minHeight: "100vh", padding: "40px 0" }}>
            <Row justify="center">
                <Col xs={24} sm={20} md={16} lg={12}>
                    <div
                        style={{
                            background: "#fff",
                            padding: "40px 20px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                        }}
                    >
                        <Text style={{ fontSize: "18px", color: "#333" }}>
                            是否丢弃，丢弃后有关物品产生的问题和责任与巴拉巴拉机场无关
                        </Text>

                        <div style={{ marginTop: "30px" }}>
                            <Space size="large">
                                <Button
                                    type="default"
                                    size="large"
                                    style={{
                                        borderRadius: "4px",
                                        padding: "10px 30px",
                                        fontSize: "16px",
                                        backgroundColor: "#f5f5f5",
                                    }}
                                    onClick={handleCancel}
                                >
                                    取消
                                </Button>
                                <Button
                                    type="primary"
                                    size="large"
                                    style={{
                                        borderRadius: "4px",
                                        padding: "10px 30px",
                                        fontSize: "16px",
                                        backgroundColor: "#1890ff",
                                        borderColor: "#1890ff",
                                    }}
                                    onClick={handleConfirm}
                                >
                                    确定丢弃
                                </Button>
                            </Space>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Discard;
