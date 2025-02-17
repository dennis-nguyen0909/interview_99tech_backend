import { useState } from "react";
import { Form, Input, Button, Typography, notification, Spin, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthServieApi } from "../api/modules/AuthService";
import { toast } from "react-toastify";

const { Title } = Typography;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const { fullName, email, password } = values;
    await handleRegister(email, password, fullName);
  };

  const handleRegister = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      const response = await AuthServieApi.register(email, password, fullName);
      
      if (response.status === 201) {
        toast.success('You have registered successfully.')
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Error from server";
      toast.error(errorMessage)
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Title
            level={2}
            className="mt-6 text-center text-3xl font-extrabold text-gray-900"
          >
            Create your account
          </Title>
        </div>
        <Form
          name="register"
          className="mt-8 space-y-6"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="fullName"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Full Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
           {loading ? (<Spin />):(
             <Button
             type="primary"
             htmlType="submit"
             className="w-full"
             loading={loading}
           >
             Register
           </Button>
           )}
          </Form.Item>
        </Form>
        <div className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
