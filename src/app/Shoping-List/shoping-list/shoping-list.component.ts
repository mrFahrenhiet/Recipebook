import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../sharedmodel/ingredients.model';
import { ShopiingListService } from 'src/app/services/shopiing-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShopingListComponent implements OnInit, OnDestroy {
  subsc: Subscription;
  constructor(private shopinglistService: ShopiingListService) { }
  ingredients: Ingredient[];

  ngOnInit() {
    this.ingredients = this.shopinglistService.getIngredients();
    this.subsc = this.shopinglistService.emitIngredients.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }
  onEdit(id: number) {
    this.shopinglistService.startEditing.next(id);
  }
  ngOnDestroy() {
    this.subsc.unsubscribe();
  }

}
