import { useState, useEffect } from "react"
import { Layout, Form, Radio, Input, Checkbox, Button, Typography, Space } from "antd"
import "./pageOne.css"

const { Header, Content } = Layout
const { Title } = Typography

function PageOne() {
  const [form] = Form.useForm()
  const [customDuration, setCustomDuration] = useState(false)
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [isVip, setIsVip] = useState(false)  // 添加一个状态来判断是否是VIP

  // 模拟接口调用获取用户状态
  const fetchUserStatus = async () => {
    try {
      // 假设你会从接口获取一个响应，其中包含用户的VIP状态
      const response = await fetch("/api/user/status") // 假设接口路径
      const data = await response.json()
      setIsVip(data.isVip)  // 根据返回的数据设置是否是VIP
    } catch (error) {
      console.error("获取用户状态失败:", error)
    }
  }

  useEffect(() => {
    fetchUserStatus()  // 获取用户状态
  }, [])

  useEffect(() => {
    calculatePrice(form.getFieldsValue())
  }, [form.getFieldsValue])

  const handleDurationChange = (e) => {
    setCustomDuration(e.target.value === "custom")
    calculatePrice(form.getFieldsValue())
  }

  const calculatePrice = (values) => {
    let basePrice = 0
    switch (values.lockerType) {
      case "small":
        basePrice = 20
        break
      case "medium":
        basePrice = 30
        break
      case "large":
        basePrice = 40
        break
      default:
        basePrice = 0
    }

    let duration = 0
    switch (values.duration) {
      case "3days":
        duration = 3
        break
      case "1week":
        duration = 7
        break
      case "1month":
        duration = 30
        break
      case "custom":
        duration = values.customMonths * 30 || 0
        break
      default:
        duration = 0
    }

    const total = (basePrice * duration) / 30
    setEstimatedPrice(total.toFixed(2))
  }

  const onFinish = (values) => {
    console.log("提交的表单数据:", values)
  }

  const onValuesChange = (changedValues, allValues) => {
    calculatePrice(allValues)
  }

  return (
    <Layout className="layout">
      <Header className="header">
        <Title level={2} style={{ color: "white", margin: "16px 0" }}>
          欢迎使用XX存储，请填写以下信息
        </Title>
      </Header>
      <Content className="content">
        <div className="form-container">
          <Form
            form={form}
            name="storage_form"
            onFinish={onFinish}
            onValuesChange={onValuesChange}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              label="请选择存储柜子类型"
              name="lockerType"
              rules={[{ required: true, message: "请选择柜子类型" }]}
            >
              <Radio.Group>
                <Radio value="small">小</Radio>
                <Radio value="medium">中</Radio>
                <Radio value="large">大</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="请选择存储时间" name="duration" rules={[{ required: true, message: "请选择存储时间" }]}>
              <Radio.Group onChange={handleDurationChange}>
                <Radio value="3days">三天</Radio>
                <Radio value="1week">一周</Radio>
                <Radio value="1month">一个月</Radio>
                <Radio value="custom">
                  <Space>
                    <Form.Item name="customMonths" noStyle>
                      <Input style={{ width: 100 }} disabled={!customDuration} placeholder="请输入" />
                    </Form.Item>
                    月
                  </Space>
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="物品名称" name="itemName" rules={[{ required: true, message: "请输入物品名称" }]}>
              <Input placeholder="请输入物品名称" />
            </Form.Item>

            <Form.Item name="isValuable" valuePropName="checked">
              <Checkbox>是否有贵重物</Checkbox>
            </Form.Item>

            {isVip && (  // 只有VIP用户才显示此项
              <Form.Item name="useVipService" valuePropName="checked">
                <Checkbox>是否使用Vip免费延期服务</Checkbox>
              </Form.Item>
            )}

            <div className="notice-section">
              <p style={{ color: 'red' }}>告知:到期后一个星期内未取走或者续期将由管理员处理丢弃</p>
              <Space align="center">
                <span>预估总价￥</span>
                <Input value={estimatedPrice} style={{ width: 120 }} readOnly />
                <span>元</span>
              </Space>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error("请确认服务条款"))),
                  },
                ]}
              >
                <Checkbox>确认商家服务条款</Checkbox>
              </Form.Item>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                确定
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  )
}

export default PageOne
