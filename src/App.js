import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Card, Typography, Alert, Spin, Layout, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError('Không thể tải danh sách người dùng!');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '70px',
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <span>
          <Avatar icon={<UserOutlined />} />
          {text}
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Công ty',
      dataIndex: 'company',
      key: 'company',
      render: (company) => company.name,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (text) => <a href={`https://${text}`} target="_blank" rel="noreferrer">{text}</a>,
    },
  ];

  return (
    <Layout>
      <Header>
        <Title>User Management System</Title>
      </Header>

      <Content>
        <Card>
          {error && (
            <Alert
              message="Lỗi"
              description={error}
              type="error"
              showIcon
            />
          )}

          {loading ? (
            <div>
              <Spin size="large" tip="Đang tải dữ liệu..." />
            </div>
          ) : (
            <Table
              dataSource={users}
              columns={columns}
              rowKey="id"
              bordered
              pagination={{ pageSize: 5 }}
            />
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default UserList;