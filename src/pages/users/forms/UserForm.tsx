import { Card, Col, Form, Input, Row, Select, Space } from "antd"
import { getTenants } from "../../../http/api";
import { useQuery } from "@tanstack/react-query";
import type { Tenant } from "../../../types";

const UserForm = () => {
const {data: tenants} = useQuery({
    queryKey: ['tenants'], 
    queryFn: () => {
        return getTenants().then((res) => res.data)
    }
});
  return (
    <Row>
        <Col span={24}>
            <Space direction="vertical" size="large">
                <Card title="Basic Info" variant="borderless">
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item label="First Name" name="firstName" rules={[
                                {
                                    required: true,
                                    message: 'First name is required'
                                }
                            ]}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Last Name" name="lastName" rules={[
                                {
                                    required: true,
                                    message: 'Last name is required'
                                }
                            ]}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Email" name="email" rules={[
                                {
                                    required: true,
                                    message: 'Email is required'
                                },
                                {
                                    type: 'email',
                                    message: 'Email is not valid'
                                }
                            ]}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
                <Card title="Security Info" variant="borderless">
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item label="Password" name="password" rules={[
                                {
                                    required: true,
                                    message: 'Password is required'
                                }
                            ]}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                <Card title="Roles" variant="borderless">
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item label="Role" name="role" rules={[
                                {
                                    required: true,
                                    message: 'Role is required'
                                }
                            ]}>
                                <Select size="large" style={{width: '100%'}} allowClear={true} onChange={() => {}} placeholder="Select Role">
                                    <Select.Option value="admin">Admin</Select.Option>
                                    <Select.Option value="manager">Manager</Select.Option>
                                    <Select.Option value="customer">Customer</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Restaurant" name="tenantId" rules={[
                                {
                                    required: true,
                                    message: 'Restaurant is required'
                                }
                            ]}>
                                <Select size="large" style={{width: '100%'}} allowClear={true} onChange={() => {}} placeholder="Select Restaurant">
                                    {
                                        tenants?.map((tenant: Tenant) => (
                                            <Select.Option value={tenant.id} key={tenant.id}>{tenant.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
            </Space>
            
        </Col>
    </Row>
  )
}

export default UserForm