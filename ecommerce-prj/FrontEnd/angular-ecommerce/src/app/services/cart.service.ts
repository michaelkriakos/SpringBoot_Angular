import { Injectable } from "@angular/core";
import { CartItem } from "../common/cart-item";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex((i) => i.id === theCartItem.id);
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
  cartItems: CartItem[] = [];
  totalPrices: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  constructor() {}

  addToCart(cartitem: CartItem) {
    let isExistInCart: boolean = false;
    let existingItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      existingItem = this.cartItems.find((x) => x.id === cartitem.id);

      isExistInCart = existingItem != undefined;
    }

    if (isExistInCart) {
      existingItem.quantity++;
    } else {
      this.cartItems.push(cartitem);
    }
    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let item of this.cartItems) {
      totalPriceValue += item.unitPrice * item.quantity;
      totalQuantityValue += item.quantity;
    }
    this.totalPrices.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
