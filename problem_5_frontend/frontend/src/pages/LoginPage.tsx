import { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthServieApi } from "../api/modules/AuthService";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()
  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    await handleLogin(email, password);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await AuthServieApi.login(email, password);

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        toast.success("Login successfully!");
        navigate('/')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error from server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-8 space-y-6">
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email", message: "Please enter a valid email address!" }]}
          >
            <Input placeholder="Email address" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            {loading ? (
              <Spin />
            ) : (
              <Button type="primary" htmlType="submit" className="group w-full flex justify-center py-3">
                Sign in
              </Button>
            )}
          </Form.Item>
        </Form>
        <div className="text-center">
          Or{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-800">
            register now!
          </Link>
        </div>
      </div>
    </div>
  );
}
