'use client';

import { Badge, Card } from 'shared/ui';

// Mock data for orders
const orders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    email: 'john.doe@example.com',
    status: 'pending',
    total: 299.99,
    items: 3,
    date: '2024-01-15',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'shipped',
    total: 149.5,
    items: 2,
    date: '2024-01-14',
  },
  {
    id: 'ORD-003',
    customer: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    status: 'delivered',
    total: 89.99,
    items: 1,
    date: '2024-01-13',
  },
  {
    id: 'ORD-004',
    customer: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    status: 'pending',
    total: 449.99,
    items: 5,
    date: '2024-01-12',
  },
  {
    id: 'ORD-005',
    customer: 'David Brown',
    email: 'david.brown@example.com',
    status: 'cancelled',
    total: 199.99,
    items: 2,
    date: '2024-01-11',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';

    case 'shipped':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';

    case 'delivered':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';

    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';

    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

export default function OrdersPage() {
  return (
    <section className="space-y-6 p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold">{orders.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {orders.filter(order => order.status === 'pending').length}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-500">Shipped</h3>
          <p className="text-2xl font-bold text-blue-600">
            {orders.filter(order => order.status === 'shipped').length}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-500">Delivered</h3>
          <p className="text-2xl font-bold text-green-600">
            {orders.filter(order => order.status === 'delivered').length}
          </p>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                  Order ID
                </th>
                <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                  Customer
                </th>
                <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                  Items
                </th>
                <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                  Total
                </th>
                <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="p-4">{order.items}</td>
                  <td className="p-4 font-medium">${order.total}</td>
                  <td className="p-4 text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}
