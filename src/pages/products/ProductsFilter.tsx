import { Card, Col, Row, Form, Input, Select, Switch, Typography, Space } from "antd";

type ProductsFilterProps = {
    children?: React.ReactNode;
};

const ProductsFilter = ({children}: ProductsFilterProps) => {
  return (
    <Card>
        <Row justify="space-between">
            <Col span={16}>
                <Row gutter={20}>
                <Col span={6}>
                    <Form.Item name="q">
                    <Input.Search placeholder="Search" allowClear={true}/>
                    </Form.Item>
                </Col>
                <Col span={6}>
                <Form.Item name="role"> 
                    <Select style={{width: '100%'}} allowClear={true} placeholder="Select Category">
                        <Select.Option value="pizza">Pizza</Select.Option>
                        <Select.Option value="beverages">Beverages</Select.Option>
                    </Select>
                </Form.Item>
                    
                </Col>
                <Col span={6}>
                <Form.Item name="role"> 
                    <Select style={{width: '100%'}} allowClear={true} placeholder="Select restaurant">
                        <Select.Option value="pizza-hub">Pizza Hub</Select.Option>
                        <Select.Option value="softy-corner">Softy corner</Select.Option>
                    </Select>
                </Form.Item>
                    
                </Col>
                <Col span={6}>
                    <Space>
                        <Switch defaultChecked onChange={() => {}} />
                        <Typography.Text>Show only published</Typography.Text>
                    </Space>
                </Col>
            </Row>
            </Col>
            <Col span={8} style={{display: 'flex', justifyContent: 'end'}}>
            {children}
            </Col>
        </Row>
    </Card>
  ) 
}

export default ProductsFilter