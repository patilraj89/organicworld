import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/modals/cartProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartProduct[] = [];
  total = 0;
  subTotal = 0;
  totalItems = 0;
  emptyCartErrorMsg = false;
  @Output() productCntEmitter: EventEmitter<number> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
    this.cartItems = JSON.parse(sessionStorage.getItem('cart'));
    console.log('cart item=',this.cartItems);
		this.getCart();
  }

  getCart(): void {
	  if ( this.cartItems != null) {
      if (this.cartItems.length !== 0) {
        for (let i = 0; i < this.cartItems.length; i++) {
          if (this.cartItems[i].quantity === 0) {
            this.cartItems.splice(i, 1);
            if (this.cartItems.length == 0) {
              this.emptyCartErrorMsg = true;
            }
          }
        }
        this.total = this.calculateTotal();
        this.subTotal = this.calculateSubTotal();
        console.log('Total=',this.totalItems);
      console.log('Sub Total=',this.subTotal);
      } else {
        this.emptyCartErrorMsg = true;
      }
      this.totalItems = this.cartItems.length;
      this.productCntEmitter.emit(this.totalItems);
      
    }
  }

  calculateTotal(): number {
    let cartTotalAmount = 0;
    // tslint:disable-next-line:prefer-for-of
    if (this.cartItems != null) {
      for (let i = 0; i < this.cartItems.length; i++) {
        cartTotalAmount += this.cartItems[i].price;
      }
    }
    return cartTotalAmount;
  }
  calculateSubTotal(): number {
    let cartTotalAmount: number = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      cartTotalAmount += this.cartItems[i].price * this.cartItems[i].quantity;
    }
    return cartTotalAmount;
  }

  removeProduct(index: number): void {
    console.log(index);
    this.cartItems.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
    // tslint:disable-next-line:triple-equals
    if (this.cartItems.length == 0) {
      this.emptyCartErrorMsg = true;
    }
    this.getCart();
  }

  updateQuantity(id: string, action: string) {
    alert('Update Quantity called');
    if (this.cartItems && this.cartItems.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.cartItems.length; i++) {
        // tslint:disable-next-line:triple-equals
        if (this.cartItems[i].productId == id) {
          if (action === 'add') {
            this.cartItems[i].quantity++;
            break;
          } else if (action === 'sub') {
            this.cartItems[i].quantity--;
            break;
          }
        }
      }
      this.getCart();
    }
  }


  checkOut(): void {
    if (localStorage.getItem('orderHistory') == null) {
      const orderDetailsArr: any = [];
      const orderDetailsNumber = 0;
      const orderDetailsObj = {
        orderNumber: orderDetailsNumber + 1,
        orderDetails: this.cartItems,
        totalAmount: this.total
      };
      orderDetailsArr.push(orderDetailsObj);
      sessionStorage.set('orderHistory', JSON.stringify(orderDetailsArr));
    } else {
      const orderDetailsArr: any = JSON.parse(sessionStorage.get('orderHistory'));
      const orderDetailsNumber: number = orderDetailsArr.length;
      const orderDetailsObj = {
        orderNumber: orderDetailsNumber + 1,
        orderDetails: this.cartItems,
        totalAmount: this.total
      };
      orderDetailsArr.push(orderDetailsObj);
      sessionStorage.set('orderHistory', JSON.stringify(orderDetailsArr));
    }
    this.router.navigate(['/orderHistory', this.cartItems.length ]);
  }

}
