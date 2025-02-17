import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ProductServiceApi } from "../api/modules/ProductService";
import { Meta, Product } from "../types";
import { AuthServieApi } from "../api/modules/AuthService";
import { UserServiceApi } from "../api/modules/UserService";
import { handleDecoded } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/userSlice";
import { toast } from "react-toastify";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta,setMeta]=useState<Meta>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userDetail = useSelector(state=>state.user)
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const {decoded} = handleDecoded(accessToken);
    console.log("decoded",decoded)
    if(decoded?.id){
      handleGetDetailUser(decoded?.id)
    }
    if (!accessToken) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    handleGetList();
  }, []);

  const handleGetDetailUser = async(idUser:string)=>{
    try {
      const response = await UserServiceApi.getDetail(idUser);
      if(response.data){
        dispatch(updateUser({...response?.data?.data}))
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleGetList = async () => {
    try {
      const response = await ProductServiceApi.getAllLists();
      if (response?.data) {
        setProducts(response?.data?.items); // Set products data
        setMeta(response?.data?.meta)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createProduct = async (values: Omit<Product, "_id">) => {
    try {
      const {name,description,price,category,stock}=values
      const response = await ProductServiceApi.create(name,description,price,category,stock,userDetail?._id);
      if(response.data){
        toast.success("Create products successfully!")
        setIsModalVisible(false);
        handleGetList()
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.error(error)
    }
  };

  const updateProduct = async (_id: string, values: Omit<Product, "_id">) => {
    try {
      const response = await ProductServiceApi.update({...values},_id);
      if(response.data){
        toast.success("Updated products successfully!")
        setIsModalVisible(false);
        handleGetList()
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.error(error)
    }
  };

  const deleteProduct = async (ids: [string]) => {
    try {
      const response = await ProductServiceApi.delete(ids);
      if(response.data){
        toast.success("Deleted products successfully!")
        setIsModalVisible(false);
        handleGetList()
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.error(error)
    }
  };

  const showModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      form.setFieldsValue(product);
    } else {
      setEditingProduct(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingProduct) {
        updateProduct(editingProduct._id, values);
      } else {
        createProduct(values);
      }
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => deleteProduct([record._id])}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
console.log("products",products)
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Add Product
        </Button>
      </div>

      <Table columns={columns} dataSource={products} rowKey="_id" />

      <Modal
        title={editingProduct ? "Edit Product" : "Add New Product"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input the description!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true, message: "Please input the category!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true, message: "Please input the category!" }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
