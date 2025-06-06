'use client';

import { useState } from 'react';

import { ChevronDown, ChevronRight, Trash2 } from 'lucide-react';

import { useTranslation } from 'shared/i18n/hooks';
import { useOrdersStore } from 'shared/stores';
import { Badge, Button, Card } from 'shared/ui';

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
  const { t } = useTranslation();
  const { orders, updateOrderStatus, getOrdersByStatus, clearOrders } =
    useOrdersStore();
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const handleStatusChange = (
    orderId: string,
    newStatus: 'pending' | 'shipped' | 'delivered' | 'cancelled',
  ) => {
    updateOrderStatus(orderId, newStatus);
  };

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);

    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }

    setExpandedOrders(newExpanded);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return t('orders.status.pending');

      case 'shipped':
        return t('orders.status.shipped');

      case 'delivered':
        return t('orders.status.delivered');

      case 'cancelled':
        return t('orders.status.cancelled');

      default:
        return status;
    }
  };

  return (
    <section className="m-4 h-full space-y-6 rounded-lg bg-gray-50 p-6">
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-gray-500">
              {t('orders.summary.totalOrders')}
            </h3>
            <p className="text-2xl font-bold">{orders.length}</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-gray-500">
              {t('orders.summary.pending')}
            </h3>
            <p className="text-2xl font-bold text-yellow-600">
              {getOrdersByStatus('pending').length}
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-gray-500">
              {t('orders.summary.shipped')}
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {getOrdersByStatus('shipped').length}
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-gray-500">
              {t('orders.summary.delivered')}
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {getOrdersByStatus('delivered').length}
            </p>
          </Card>
        </div>

        {orders.length > 0 && (
          <Button
            variant="outline"
            onClick={clearOrders}
            className="ml-4 text-red-600 hover:text-red-700"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {t('orders.clearAllOrders')}
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <Card key={order.id} className="overflow-hidden">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleOrderExpansion(order.id)}
                  className="p-1"
                >
                  {expandedOrders.has(order.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
                <div>
                  <h3 className="font-semibold">{order.id}</h3>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.email}</p>
                </div>

                <Badge className={getStatusColor(order.status)}>
                  {getStatusLabel(order.status)}
                </Badge>

                <div className="text-right">
                  <p className="font-semibold">${order.total.toFixed()}</p>
                  <p className="text-sm text-gray-500">
                    {order.itemCount} {t('orders.items')}
                  </p>
                </div>

                <div className="flex gap-2">
                  {order.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(order.id, 'shipped')}
                      >
                        {t('orders.actions.ship')}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleStatusChange(order.id, 'cancelled')
                        }
                      >
                        {t('orders.actions.cancel')}
                      </Button>
                    </>
                  )}
                  {order.status === 'shipped' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange(order.id, 'delivered')}
                    >
                      {t('orders.actions.deliver')}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {expandedOrders.has(order.id) && order.items.length > 0 && (
              <div className="bg-gray-50 p-4 dark:bg-gray-800/50">
                <h4 className="mb-3 font-semibold text-gray-700 dark:text-gray-300">
                  {t('orders.orderItems')}
                </h4>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {order.items.map(orderItem => (
                    <Card key={orderItem.product.id} className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-200 dark:bg-gray-600">
                          <span className="text-xs text-gray-500">
                            {t('orders.imagePlaceholder')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium">
                            {orderItem.product.name}
                          </h5>
                          <p className="text-sm text-gray-500">
                            ${orderItem.product.price} × {orderItem.quantity}
                          </p>
                          <p className="text-sm font-semibold">
                            $
                            {(
                              orderItem.product.price * orderItem.quantity
                            ).toFixed()}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {expandedOrders.has(order.id) && order.items.length === 0 && (
              <div className="bg-gray-50 p-4 text-center dark:bg-gray-800/50">
                <p className="text-gray-500">{t('orders.empty.noItems')}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {orders.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">{t('orders.empty.noOrders')}</p>
        </Card>
      )}
    </section>
  );
}
