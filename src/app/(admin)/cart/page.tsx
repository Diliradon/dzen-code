'use client';

import { useState } from 'react';

import { Minus, Package, Plus, ShoppingCart, Trash2 } from 'lucide-react';

import { useTranslation } from 'shared/i18n/hooks';
import { useOrdersStore } from 'shared/stores';
import { Badge, Button, Card, Input } from 'shared/ui';

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

export default function CartPage() {
  const { t } = useTranslation();
  const {
    currentCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    createOrder,
  } = useOrdersStore();

  const [customer, setCustomer] = useState('');
  const [email, setEmail] = useState('');
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const total = getCartTotal();
  const itemCount = getCartItemCount();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const handleCreateOrder = () => {
    if (!customer.trim() || !email.trim()) {
      return;
    }

    setIsCreatingOrder(true);

    try {
      createOrder(customer, email);
      setCustomer('');
      setEmail('');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating order:', error);
    } finally {
      setIsCreatingOrder(false);
    }
  };

  if (currentCart.length === 0) {
    return (
      <section className="m-4 h-full space-y-6 rounded-lg bg-gray-50 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{t('cart.title')}</h1>
          <p className="text-gray-600">{t('cart.description')}</p>
        </div>

        <div className="flex h-64 flex-col items-center justify-center space-y-4">
          <Package className="h-16 w-16 text-gray-400" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('cart.empty.title')}
            </h3>
            <p className="text-gray-500">{t('cart.empty.description')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="m-4 h-full space-y-6 rounded-lg bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('cart.title')}</h1>
        <p className="text-gray-600">
          {itemCount}{' '}
          {itemCount === 1
            ? t('cart.itemCount.item')
            : t('cart.itemCount.items')}{' '}
          {t('cart.itemCount.selected')}
        </p>
      </div>

      {/* Cart Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-500">
            {t('cart.summary.totalItems')}
          </h3>
          <p className="text-2xl font-bold">{itemCount}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-500">
            {t('cart.summary.totalValue')}
          </h3>
          <p className="text-2xl font-bold text-green-600">
            ${total.toFixed()}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-gray-500">
            {t('cart.summary.products')}
          </h3>
          <p className="text-2xl font-bold">{currentCart.length}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{t('cart.cartItems')}</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {t('cart.clearCart')}
              </Button>
            </div>

            <div className="space-y-4">
              {currentCart.map(cartItem => (
                <div
                  key={cartItem.product.id}
                  className="flex items-center space-x-4 rounded-lg border p-4"
                >
                  {/* Product Image Placeholder */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {t('cart.imagePlaceholder')}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold">{cartItem.product.name}</h3>
                      <Badge
                        className={getCategoryColor(cartItem.product.category)}
                      >
                        {cartItem.product.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {cartItem.product.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>
                        {t('cart.price')}: ${cartItem.product.price}
                      </span>
                      <span>
                        {t('cart.stock')}: {cartItem.product.stock}
                      </span>
                      <span>
                        {t('cart.added')}:{' '}
                        {new Date(cartItem.addedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleQuantityChange(
                          cartItem.product.id,
                          cartItem.quantity - 1,
                        )
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={cartItem.quantity}
                      onChange={event =>
                        handleQuantityChange(
                          cartItem.product.id,
                          Number(event.target.value) || 1,
                        )
                      }
                      className="w-16 text-center"
                      min="1"
                      max={cartItem.product.stock}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleQuantityChange(
                          cartItem.product.id,
                          cartItem.quantity + 1,
                        )
                      }
                      disabled={cartItem.quantity >= cartItem.product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(cartItem.product.price * cartItem.quantity).toFixed()}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(cartItem.product.id)}
                      className="mt-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Order Creation */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">
              {t('cart.order.create')}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('cart.order.customerName')}
                </label>
                <Input
                  type="text"
                  value={customer}
                  onChange={event => setCustomer(event.target.value)}
                  placeholder={t('cart.order.customerNamePlaceholder')}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('cart.order.email')}
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder={t('cart.order.emailPlaceholder')}
                  className="mt-1"
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span>{t('cart.order.subtotal')}:</span>
                  <span>${total.toFixed()}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>{t('cart.order.total')}:</span>
                  <span>${total.toFixed()}</span>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleCreateOrder}
                disabled={!customer.trim() || !email.trim() || isCreatingOrder}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isCreatingOrder
                  ? t('cart.order.creating')
                  : t('cart.order.createButton')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
