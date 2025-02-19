import { useState, useEffect, useCallback } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
  Spin,
  Select,
} from "antd";
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
import debounce from "lodash.debounce";

const { Option } = Select;

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<Meta>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [priceFilter, setPriceFilter] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const { decoded } = handleDecoded(accessToken);

      if (decoded?.id) {
        await handleGetDetailUser(decoded?.id);
      }

      if (!accessToken) {
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (userDetail?._id) {
      handleGetList();
    }
  }, [userDetail]); // Dependency on userDetail

  const handleGetDetailUser = async (idUser: string) => {
    try {
      setLoading(true);
      const response = await UserServiceApi.getDetail(idUser);
      if (response.data) {
        dispatch(updateUser({ ...response?.data?.data }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetList = async (page = 1, limit = 5, query?: any,userId?:string,priceFilter?:string) => {
    try {
      setLoading(true);
      const response = await ProductServiceApi.getAllLists(
        page,
        limit,
        query,
        userDetail?._id,
        priceFilter
      );
      if (response?.data) {
        setProducts(response?.data?.items);
        setMeta(response?.data?.meta);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (values: Omit<Product, "_id">) => {
    try {
      setLoading(true);
      const { name, description, price, category, stock } = values;
      const response = await ProductServiceApi.create(
        name,
        description,
        price,
        category,
        stock,
        userDetail?._id
      );
      if (response.data) {
        toast.success("Create products successfully!");
        setIsModalVisible(false);
        handleGetList();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (_id: string, values: Omit<Product, "_id">) => {
    try {
      setLoading(true);
      const response = await ProductServiceApi.update({ ...values }, _id);
      if (response.data) {
        toast.success("Updated products successfully!");
        setIsModalVisible(false);
        handleGetList();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (ids: string[]) => {
    try {
      setLoading(true);
      const response = await ProductServiceApi.delete(ids);
      if (response.data) {
        toast.success("Product deleted successfully!");
        handleGetList();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(error);
    } finally {
      setLoading(false);
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

  const handleSearch = useCallback(
    debounce(async (value: string) => {
      await handleGetList(1, 5, value);
    }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    handleSearch(value);
  };

  const handlePriceFilterChange = (value: string) => {
    setPriceFilter(value);
    handleGetList(1, 5, searchValue, userDetail?._id, value);
  };


  const deleteAllProducts = async () => {
    const ids = products.map((product) => product._id);
    await deleteProduct(ids);
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 gap-5">
        <h1 className="text-2xl font-bold">Products ({products.length})</h1>
        <Input
          value={searchValue}
          onChange={handleSearchChange}
          type="text"
          style={{ width: "30%" }}
          placeholder="Search products...."
        />
        <Select
          value={priceFilter}
          onChange={handlePriceFilterChange}
          style={{ width: "20%" }}
          placeholder="Chọn giá"
        >
          <Option value="highest">Giá cao nhất</Option>
          <Option value="lowest">Giá thấp nhất</Option>
        </Select>
        <div className="flex flex-col gap-2">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            Add Product
          </Button>
          <Button
            type="default"
            className="!bg-red-400 !text-white"
            icon={<DeleteOutlined />}
          >
            <Popconfirm
              title="Are you sure you want to delete all products?"
              onConfirm={deleteAllProducts} // Call deleteAllProducts on confirm
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              Delete All
            </Popconfirm>
          </Button>
        </div>
      </div>

      <Spin spinning={loading}>
        {" "}
        {/* Show spinner while loading */}
        <Table
          columns={columns}
          dataSource={products}
          rowKey="_id"
          pagination={{
            current: meta?.current_page || 1,
            pageSize: meta?.per_page || 5,
            total: meta?.total || 0,
            onChange: (page, pageSize) => {
              // Gọi lại API khi thay đổi trang hoặc số lượng item trên trang
              handleGetList(page, pageSize, searchValue);
            },
          }}
        />
      </Spin>

      <Modal
        title={editingProduct ? "Edit Product" : "Add New Product"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
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
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input the category!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: "Please input the category!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
