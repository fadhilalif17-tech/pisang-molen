'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ShoppingCart,
  Users,
  Package,
  MessageSquare,
  TrendingUp,
  LogOut,
  Home,
  UserCheck,
  DollarSign,
  Clock,
} from 'lucide-react';

interface DashboardStats {
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  totalMessages: number;
  pendingOrders: number;
  totalRevenue: number;
}

interface Order {
  id: string;
  total: number;
  status: string;
  name: string;
  phone: string;
  address: string;
  createdAt: string;
  orderItems: {
    product: {
      name: string;
    };
    quantity: number;
  }[];
}

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  createdAt: string;
  _count: {
    orders: number;
    messages: number;
  };
}

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalMessages: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in as admin
    const adminUser = localStorage.getItem('adminUser');
    if (!adminUser) {
      router.push('/admin');
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      // Fetch all data
      const [ordersRes, usersRes, productsRes, messagesRes] = await Promise.all(
        [
          fetch('/api/orders'),
          fetch('/api/users'),
          fetch('/api/products'),
          fetch('/api/messages'),
        ]
      );

      const ordersData = await ordersRes.json();
      const usersData = await usersRes.json();
      const productsData = await productsRes.json();
      const messagesData = await messagesRes.json();

      // Calculate stats
      const pendingOrders = ordersData.filter(
        (order: Order) => order.status === 'pending'
      ).length;
      const totalRevenue = ordersData
        .filter((order: Order) => order.status === 'completed')
        .reduce((sum: number, order: Order) => sum + order.total, 0);

      setStats({
        totalOrders: ordersData.length,
        totalUsers: usersData.length,
        totalProducts: productsData.length,
        totalMessages: messagesData.length,
        pendingOrders,
        totalRevenue,
      });

      setOrders(ordersData);
      setUsers(usersData);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    router.push('/admin');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="/logo.jpg"
                alt="Molen Logo"
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-orange-600">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">MOLEN Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.push('/')}>
                <Home className="w-4 h-4 mr-2" />
                Website
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalOrders}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalUsers}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Products</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalProducts}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Messages</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalMessages}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <MessageSquare className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Orders
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.pendingOrders}
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(stats.totalRevenue)}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Admin Users
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {users.filter(user => user.role === 'admin').length}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Order ID</th>
                        <th className="px-6 py-3">Customer</th>
                        <th className="px-6 py-3">Phone</th>
                        <th className="px-6 py-3">Total</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 10).map(order => (
                        <tr
                          key={order.id}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 font-medium">
                            {order.id.slice(0, 8)}...
                          </td>
                          <td className="px-6 py-4">{order.name}</td>
                          <td className="px-6 py-4">{order.phone}</td>
                          <td className="px-6 py-4">
                            {formatCurrency(order.total)}
                          </td>
                          <td className="px-6 py-4">
                            <Badge
                              variant={
                                order.status === 'completed'
                                  ? 'default'
                                  : order.status === 'pending'
                                  ? 'secondary'
                                  : order.status === 'processing'
                                  ? 'outline'
                                  : 'destructive'
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            {formatDate(order.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Phone</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3">Orders</th>
                        <th className="px-6 py-3">Messages</th>
                        <th className="px-6 py-3">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr
                          key={user.id}
                          className="bg-white border-b hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 font-medium">
                            {user.name || 'N/A'}
                          </td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">{user.phone || 'N/A'}</td>
                          <td className="px-6 py-4">
                            <Badge
                              variant={
                                user.role === 'admin' ? 'default' : 'secondary'
                              }
                            >
                              {user.role}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">{user._count.orders}</td>
                          <td className="px-6 py-4">{user._count.messages}</td>
                          <td className="px-6 py-4">
                            {formatDate(user.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Customer Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{message.name}</h4>
                          <p className="text-sm text-gray-600">
                            {message.email}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                      <h5 className="font-medium text-sm mb-1">
                        {message.subject}
                      </h5>
                      <p className="text-sm text-gray-700">{message.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-6 py-3">Product Name</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Stock</th>
                        <th className="px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length > 0 && (
                        <tr className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">
                            Pisang Molen (1 bungkus)
                          </td>
                          <td className="px-6 py-4">Makanan Ringan</td>
                          <td className="px-6 py-4">{formatCurrency(5000)}</td>
                          <td className="px-6 py-4">112</td>
                          <td className="px-6 py-4">
                            <Badge variant="default">In Stock</Badge>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
