import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/serivces/product.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories:ProductCategory[];

  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.listProductCategories();
  }
  listProductCategories() {
   this.productService.getProductCategories().subscribe(
       data=>{
      console.log('Product Categories=' + JSON.stringify(data));
      this.productCategories=data;

        }

   )
  }

}
