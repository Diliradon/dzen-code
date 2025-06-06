'use client';

import React from 'react';

import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { useTranslation } from 'shared/i18n/hooks';
import { useOrdersStore } from 'shared/stores';
import { Badge, Button, Card } from 'shared/ui';

import { useProducts } from '../../../../entities/products';

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

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { t } = useTranslation();
  const { data, isLoading, error } = useProducts();
  const { addToCart, removeFromCart, currentCart } = useOrdersStore();

  const { id } = React.use(params);

  if (isLoading) {
    return (
      <section className="m-4 h-full space-y-6 rounded-lg bg-gray-50 p-6">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-gray-500">
            {t('products.detail.loading')}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="m-4 h-full space-y-6 rounded-lg bg-gray-50 p-6">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-red-500">
            {t('products.detail.errorLoading')}: {error.message}
          </div>
        </div>
      </section>
    );
  }

  const products = data?.products || [];
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <section className="m-4 h-full space-y-6 rounded-lg bg-gray-50 p-6">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-red-500">
            {t('products.detail.notFound')}
          </div>
        </div>
      </section>
    );
  }

  const isInCart = currentCart.some(
    cartItem => cartItem.product.id === product.id,
  );
  const cartQuantity =
    currentCart.find(cartItem => cartItem.product.id === product.id)
      ?.quantity || 0;

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
      <div className="flex items-center gap-4">
        <Link
          href="/products"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={20} />
          {t('products.detail.backToProducts')}
        </Link>
      </div>

      <Card className="overflow-hidden">
        <div className="flex aspect-video items-center justify-center bg-gray-100 dark:bg-gray-700">
          <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-600">
            <span className="text-lg text-gray-500 dark:text-gray-400">
              {t('products.imagePlaceholder')}
            </span>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                {product.description}
              </p>
            </div>
            <Badge className={getCategoryColor(product.category)}>
              {product.category}
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  {t('products.detail.price')}
                </h3>
                <p className="text-4xl font-bold">${product.price}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  {t('products.detail.status')}
                </h3>
                <Badge className={getStockStatusColor(product.status)}>
                  {getStockStatusLabel(product.status)}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  {t('products.detail.stockQuantity')}
                </h3>
                <p className="text-2xl font-bold">
                  {product.stock} {t('products.units')}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  {t('products.detail.productId')}
                </h3>
                <p className="font-mono text-lg">{product.id}</p>
              </div>
            </div>
          </div>

          {isInCart && (
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="text-blue-800 dark:text-blue-200">
                <strong>{cartQuantity}</strong>{' '}
                {cartQuantity === 1
                  ? t('products.detail.unit')
                  : t('products.units')}{' '}
                {t('products.detail.unitsInCart')}
              </p>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button
              className="flex-1 rounded-lg px-6 py-3 font-semibold text-white transition-colors"
              disabled={product.status === 'out-of-stock'}
              onClick={() => addToCart(product)}
            >
              {isInCart
                ? t('products.detail.addMoreToCart')
                : t('products.addToOrder')}
            </Button>
            {isInCart && (
              <Button
                variant="outline"
                className="flex-1 rounded-lg px-6 py-3 font-semibold transition-colors"
                onClick={() => removeFromCart(product.id)}
              >
                {t('products.detail.removeFromCart')}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </section>
  );
}
