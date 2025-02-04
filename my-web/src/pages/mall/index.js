import React, { useRef, useEffect, useState } from 'react';
import { Layout, Typography, Table, Card, List } from 'antd';
import './index.css';

const { Header, Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

const Mall = () => {
    const [scrollY, setScrollY] = useState(0); // 记录滚动距离
    // 表格列定义
    const columns = [
        {
            title: "柜子类型",
            dataIndex: "type",
            key: "type",
            rowSpan: 3,
            render: (text, record, index) => {
                const obj = {
                    children: text,
                    props: {},
                }
                if (index % 3 === 0) {
                    obj.props.rowSpan = 3
                } else {
                    obj.props.rowSpan = 0
                }
                return obj
            },
        },
        {
            title: "柜子规模",
            dataIndex: "size",
            key: "size",
            rowSpan: 3,
            render: (text, record, index) => {
                const obj = {
                    children: text,
                    props: {},
                }
                if (index % 3 === 0) {
                    obj.props.rowSpan = 3
                } else {
                    obj.props.rowSpan = 0
                }
                return obj
            },
        },
        {
            title: "存放时间",
            dataIndex: "duration",
            key: "duration",
        },
        {
            title: "价格",
            dataIndex: "price",
            key: "price",
        },
    ]

    // 表格数据
    const data = [
        {
            key: "1-1",
            type: "小",
            size: "30x30x50cm",
            duration: "三天",
            price: "¥60",
        },
        {
            key: "1-2",
            type: "小",
            size: "30x30x50cm",
            duration: "一周",
            price: "¥120",
        },
        {
            key: "1-3",
            type: "小",
            size: "30x30x50cm",
            duration: "一个月",
            price: "¥450",
        },
        {
            key: "2-1",
            type: "中",
            size: "40x40x60cm",
            duration: "三天",
            price: "¥90",
        },
        {
            key: "2-2",
            type: "中",
            size: "40x40x60cm",
            duration: "一周",
            price: "¥180",
        },
        {
            key: "2-3",
            type: "中",
            size: "40x40x60cm",
            duration: "一个月",
            price: "¥680",
        },
        {
            key: "3-1",
            type: "大",
            size: "50x50x80cm",
            duration: "三天",
            price: "¥120",
        },
        {
            key: "3-2",
            type: "大",
            size: "50x50x80cm",
            duration: "一周",
            price: "¥240",
        },
        {
            key: "3-3",
            type: "大",
            size: "50x50x80cm",
            duration: "一个月",
            price: "¥900",
        },
    ]

    // 公告数据（模拟从后台获取）
    const announcements = [
        {
            title: "存储教程",
            content: "如何使用机场储物柜的详细步骤说明",
        },
        {
            title: "存储须知",
            content: "储物柜使用的安全提示和注意事项",
        },
        {
            title: "福利介绍",
            content: "会员专享优惠和特别服务介绍",
        },
    ]

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []);

    return (
        <Layout className="layout">
            <Header className="header">
                <Title level={1} style={{ color: 'black', margin: 0 }}>欢迎来到XX机场</Title>
            </Header>
            <Layout className="main-layout">
                <Content className="content">
                    <Card className="intro-card">
                        <Title level={3}>机场介绍</Title>
                        <img
                            src={require("../../assets/images/airport.png")}
                            alt="Airport"
                            className="airport-image"
                        />
                        <Paragraph>
                            XX机场是一座现代化的国际机场，为旅客提供便捷的行李寄存服务。
                            我们的智能储物柜系统全天24小时开放，位置便利，使用方便。
                        </Paragraph>
                    </Card>
                    <Card className="price-card">
                        <Title level={3}>柜子价格介绍</Title>
                        <Table columns={columns} dataSource={data} pagination={false} bordered className="price-table" />
                    </Card>
                </Content>
                <Sider
                    width={400}
                    className="sider"
                    style={{ position: 'sticky', top: '20px', maxHeight: '90vh', overflowY: 'auto' }}
                >
                    <Card className="sidebar-card" title={<Title level={3} className="announcement-title">公告</Title>}>
                        <List
                            itemLayout="vertical"
                            dataSource={announcements}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<strong>{item.title}</strong>}
                                        description={item.content}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Sider>
            </Layout>
        </Layout>
    );
};

export default Mall;
