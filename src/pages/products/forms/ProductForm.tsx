import { useQuery } from '@tanstack/react-query'
import { Col, Row, Space, Card, Form, Input, Select, Upload, Typography, Switch, type UploadProps, message } from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import { getCategories, getTenants } from '../../../http/api';
import type { Category, Tenant } from '../../../types';
import Pricing from './Pricing';
import Attributes from './Attributes';
import { useState } from 'react';

const ProductForm = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    
    const selectedCategory = Form.useWatch('categoryId');
    
  const {data: categories} = useQuery({
      queryKey: ['categories'],
      queryFn: () => {
          return getCategories()
      }
  });
    const {data: restaurants} = useQuery({
        queryKey: ['restaurants'],
        queryFn: () => {return getTenants(`perPage=100&currentPage=1`)}
    })

    const uploaderConfig: UploadProps = {
        name: 'file',
        multiple: false,
        showUploadList: false,
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if(!isJpgOrPng) {
                console.error('You can only upload JPG/PNG file');
                messageApi.error('You can only upload JPG/PNG file');
            }

            setImageUrl(URL.createObjectURL(file));
            return false;
        }
    }

  return (
    <Row>
            <Col span={24}>
                <Space direction="vertical" size="large">
                    <Card title="Product Info" variant="borderless">
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item label="Product Name" name="name" rules={[
                                    {
                                        required: true,
                                        message: 'Product name is required'
                                    }
                                ]}>
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Category" name="categoryId" rules={[
                                    {
                                        required: true,
                                        message: 'Category is required'
                                    }
                                ]}>
                                    <Select size="large" style={{width: '100%'}} allowClear={true} onChange={() => {}} placeholder="Select Category">
                                        {
                                            categories?.data.map((category: Category) => (
                                                <Select.Option value={JSON.stringify(category)} key={category._id}>{category.name}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Description" name="description" rules={[
                                    {
                                        required: true,
                                        message: 'Description is required'
                                    },
                                ]}>
                                    <Input.TextArea rows={3} maxLength={100} style={{resize: 'none'}} size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card title="Product Image" variant="borderless">
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item label="" name="image" rules={[
                                    {
                                        required: true,
                                        message: 'Please upload a product image'
                                    }
                                ]}>
                                    {contextHolder}
                                   <Upload listType="picture-card" {...uploaderConfig}>
                                        {imageUrl ? <img src={imageUrl} alt='avatar' style={{width: '100%'}}/> : (
                                            <Space direction='vertical'>   
                                                <PlusOutlined/>
                                                <Typography.Text>Upload</Typography.Text>
                                            </Space>
                                        )}
                                   </Upload>
                                </Form.Item>
                            </Col>
                            
                        </Row>
                    </Card>
                    <Card title="Tenant Info" variant="borderless">
                        <Row gutter={24}>
                           <Col span={24}>
                                <Form.Item label="Select Tenant" name="tenantId" rules={[
                                    {
                                        required: true,
                                        message: 'Restaurant is required'
                                    }
                                ]}>
                                    <Select size="large" style={{width: '100%'}} allowClear={true} onChange={() => {}} placeholder="Select Restaurant">
                                        {
                                            restaurants?.data.data.map((tenant: Tenant) => (
                                                <Select.Option value={tenant.id} key={tenant.id}>{tenant.name}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            
                        </Row>
                    </Card>
                    {
                        selectedCategory && <Pricing selectedCategory={selectedCategory}/>
                    }
                    {
                        selectedCategory && <Attributes selectedCategory={selectedCategory}/>
                    }
                    <Card title="Other properties" variant="borderless">
                        <Row gutter={24}>
                           <Col span={24}>
                                
                                <Space>
                                    <Form.Item name='isPublish'>
                                    <Switch defaultChecked={false} onChange={() => {}} checkedChildren="Yes" unCheckedChildren="No" />
                                    </Form.Item>
                                    <Typography.Text style={{marginBottom: 22, display: 'block'}}>Published</Typography.Text>
                                </Space>
                            </Col>
                            
                        </Row>
                    </Card>
                </Space>
                
            </Col>
        </Row>
  )
}

export default ProductForm