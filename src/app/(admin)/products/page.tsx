'use client';

import Link from 'next/link';

import { ShoppingCart } from 'lucide-react';

import { useTranslation } from 'shared/i18n/hooks';
import { useOrdersStore } from 'shared/stores';
import { Badge, Button, Card } from 'shared/ui';

import { useProducts } from '../../../entities/products';

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
  const { t } = useTranslation();
  const { data, isLoading, error } = useProducts();
  const { addToCart, removeFromCart, currentCart } = useOrdersStore();

  if (isLoading) {
    return (
      <section className="m-4 h-full space-y-6 rounded-lg bg-gray-50 p-6">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-gray-500">{t('products.loading')}</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="m-4 h-full space-y-6 rounded-lg bg-gray-50 p-6">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-red-500">
            {t('products.errorLoading')}: {error.message}
          </div>
        </div>
      </section>
    );
  }

  const products = data?.products || [];

  const isInCart = (productId: number) => {
    return currentCart.some(cartItem => cartItem.product.id === productId);
  };

  const getCartQuantity = (productId: number) => {
    const cartItem = currentCart.find(
      cartItem => cartItem.product.id === productId,
    );

    return cartItem?.quantity || 0;
  };

  const getStockStatusLabel = (status: string) => {
    switch (status) {
      case 'in-stock':
        return t('products.stockStatus.inStock');

      case 'low-stock':
        return t('products.stockStatus.lowStock');

      case 'out-of-stock':
        return t('products.stockStatus.outOfStock');

      default:
        return status;
    }
  };

  return (
    <section className="m-4 h-full space-y-6 rounded-lg bg-gray-50 p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-500">
            {t('products.totalProducts')}
          </h3>
          <p className="text-2xl font-bold">{products.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-500">
            {t('products.inStock')}
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {products.filter(product => product.status === 'in-stock').length}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-500">
            {t('products.lowStock')}
          </h3>
          <p className="text-2xl font-bold text-yellow-600">
            {products.filter(product => product.status === 'low-stock').length}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-500">
            {t('products.outOfStock')}
          </h3>
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
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="cursor-pointer overflow-hidden transition-shadow hover:shadow-lg">
              <div className="flex aspect-video items-center justify-center bg-gray-100 dark:bg-gray-700">
                <div className="flex h-16 w-16 min-w-fit items-center justify-center rounded-lg bg-gray-300 p-2 dark:bg-gray-600">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {t('products.imagePlaceholder')}
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
                    {getStockStatusLabel(product.status)}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    {t('products.stockLabel')}: {product.stock}{' '}
                    {t('products.units')}
                  </span>
                  <span>
                    {t('products.idLabel')}: {product.id}
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    className="w-full"
                    disabled={product.status === 'out-of-stock'}
                    onClick={event => {
                      event.preventDefault();
                      event.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {isInCart(product.id)
                      ? `${t('products.inCart')} (${getCartQuantity(product.id)})`
                      : t('products.addToOrder')}
                  </Button>
                  {isInCart(product.id) && (
                    <Button
                      variant="outline"
                      className="flex-1 rounded-lg px-6 py-3 font-semibold transition-colors"
                      onClick={event => {
                        event.preventDefault();
                        event.stopPropagation();
                        removeFromCart(product.id);
                      }}
                    >
                      {t('products.remove')}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
