'use client';

import { Badge, Card } from 'shared/ui';

// Mock data for products
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    category: 'Electronics',
    stock: 25,
    status: 'in-stock',
    image: '/api/placeholder/300/200',
    description: 'High-quality wireless headphones with noise cancellation',
  },
  {
    id: 2,
    name: 'Smartphone Case',
    price: 24.99,
    category: 'Accessories',
    stock: 0,
    status: 'out-of-stock',
    image: '/api/placeholder/300/200',
    description: 'Durable protective case for smartphones',
  },
  {
    id: 3,
    name: 'Laptop Stand',
    price: 49.99,
    category: 'Office',
    stock: 12,
    status: 'in-stock',
    image: '/api/placeholder/300/200',
    description: 'Adjustable aluminum laptop stand for better ergonomics',
  },
  {
    id: 4,
    name: 'USB-C Cable',
    price: 19.99,
    category: 'Accessories',
    stock: 5,
    status: 'low-stock',
    image: '/api/placeholder/300/200',
    description: 'Fast charging USB-C cable - 6ft length',
  },
  {
    id: 5,
    name: 'Mechanical Keyboard',
    price: 149.99,
    category: 'Electronics',
    stock: 8,
    status: 'in-stock',
    image: '/api/placeholder/300/200',
    description: 'RGB mechanical keyboard with tactile switches',
  },
  {
    id: 6,
    name: 'Desk Organizer',
    price: 34.99,
    category: 'Office',
    stock: 15,
    status: 'in-stock',
    image: '/api/placeholder/300/200',
    description: 'Bamboo desk organizer with multiple compartments',
  },
];

const getStockStatusColor = (status: string) => {
  switch (status) {
    case 'in-stock':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';

    case 'low-stock':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';

    case 'out-of-stock':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';

    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'electronics':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';

    case 'accessories':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';

    case 'office':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';

    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

export default function ProductsPage() {
  return (
    <section className="m-4 h-full space-y-6 rounded-lg bg-gray-50 p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-500">
            Total Products
          </h3>
          <p className="text-2xl font-bold">{products.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-500">In Stock</h3>
          <p className="text-2xl font-bold text-green-600">
            {products.filter(product => product.status === 'in-stock').length}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-500">Low Stock</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {products.filter(product => product.status === 'low-stock').length}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-500">Out of Stock</h3>
          <p className="text-2xl font-bold text-red-600">
            {
              products.filter(product => product.status === 'out-of-stock')
                .length
            }
          </p>
        </Card>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <Card
            key={product.id}
            className="overflow-hidden transition-shadow hover:shadow-lg"
          >
            <div className="flex aspect-video items-center justify-center bg-gray-100 dark:bg-gray-700">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-600">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Image
                </span>
              </div>
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <Badge className={getCategoryColor(product.category)}>
                  {product.category}
                </Badge>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">${product.price}</span>
                <Badge className={getStockStatusColor(product.status)}>
                  {product.status === 'in-stock' ? 'In Stock' : 'Out of Stock'}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Stock: {product.stock} units</span>
                <span>ID: {product.id}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
