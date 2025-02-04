import React, { useState } from "react";
import { Table, Button, Modal, Input, Select, Space, message } from "antd";
import { useNavigate } from "react-router-dom"; // 引入useHistory钩子

const { Option } = Select;

function PageTwo() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchLockerId, setSearchLockerId] = useState(""); // 存储编号查询的值
  const [searchStatus, setSearchStatus] = useState(""); // 存储状态查询的值
  const [action, setSelectedAction] = useState("");

  const navigate = useNavigate(); // 获取历史对象，用于页面跳转

  // 假设存储订单信息数据
  const dataSource = [
    {
      key: "1",
      lockerId: "A001",
      name: "张三",
      storageTime: "2025-01-01",
      storedDuration: "5天",
      cost: "50元",
      status: "已取出",
    },
    {
      key: "2",
      lockerId: "A002",
      name: "李四",
      storageTime: "2025-01-10",
      storedDuration: "3天",
      cost: "30元",
      status: "未取出",
    },
  ];

  // 筛选数据
  const filteredDataSource = dataSource.filter((item) => {
    return (
      (searchLockerId ? item.lockerId.includes(searchLockerId) : true) &&
      (searchStatus ? item.status === searchStatus : true)
    );
  });

  const columns = [
    {
      title: "框子编号",
      dataIndex: "lockerId",
    },
    {
      title: "存储人名称",
      dataIndex: "name",
    },
    {
      title: "存储时间",
      dataIndex: "storageTime",
    },
    {
      title: "已存时间",
      dataIndex: "storedDuration",
    },
    {
      title: "花费",
      dataIndex: "cost",
    },
    {
      title: "状态",
      dataIndex: "status",
    },
    {
      title: "操作",
      render: (_, record) => (
        <Space>
          <Button
            disabled={record.status !== "未取出"}
            onClick={() => handleOperation("取出", record)}
          >
            取出
          </Button>
          <Button
            type="primary"
            onClick={() => handleOperation("寄快递", record)}
          >
            寄快递
          </Button>
          <Button
            type="primary" danger
            onClick={() => handleOperation("丢弃", record)}
          >
            丢弃
          </Button>
        </Space>
      ),
    },
  ];

  const handleOperation = (action, record) => {
    setSelectedRow(record);
    setSelectedAction(action);

    setIsModalVisible(true);
  };

  const handleOk = () => {
    // 提交凭证逻辑
    console.log("凭证信息已提交");
    setIsModalVisible(false);
    if(action === "取出")
        navigate("/payment");
    if(action === "寄快递")
        navigate("/delivery")
    if(action === "丢弃")
        navigate("/discard?source=order")
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h2>存储订单信息查询</h2>

      {/* 查询区域 */}
      <Space style={{ marginBottom: 20 }}>
        <Input
          placeholder="请输入框子编号查询"
          value={searchLockerId}
          onChange={(e) => setSearchLockerId(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="选择状态"
          value={searchStatus}
          onChange={(value) => setSearchStatus(value)}
          style={{ width: 200 }}
        >
          <Option value="">所有</Option>
          <Option value="已取出">已取出</Option>
          <Option value="未取出">未取出</Option>
        </Select>
        <Button
          type="primary"
          onClick={() => console.log("执行查询")}
        >
          查询
        </Button>
      </Space>

      {/* 存储订单信息表格 */}
      <Table dataSource={filteredDataSource} columns={columns} rowKey="key" />

      {/* 凭证输入弹窗 */}
      <Modal
        title="请输入凭证"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input placeholder="请输入凭证号码" />
      </Modal>
    </div>
  );
}

export default PageTwo;
