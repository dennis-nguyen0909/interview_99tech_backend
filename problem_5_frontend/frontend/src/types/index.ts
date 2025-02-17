export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    isAvailable: boolean;
    sizes: string[];
    colors: string[];
    userId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Meta {
    count: number;
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  }
  

  export interface UserState {
    id: string | null;
    fullName: string | null;
    email: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    phone: string | null;
    avatar: string;
    isActive: boolean;
    role: 'user' | 'admin' | '';
  }