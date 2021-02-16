import { CartProduct } from './cartProduct';

export interface Order {
  customerId?: string;
  cartProducts?: Array<CartProduct>;
  totalBill?: number;
  /**
   * Order Status
   */
  status?: status;
}

export enum status {
  PaymentConfirmed = 'payment confirmed',
  PaymentFalied = 'payment falied',
  OrderPlaced = 'order placed',
  Delivered = 'delivered'
}
