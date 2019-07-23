import { Injectable } from '@angular/core';
import { Ingredient } from '../sharedmodel/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopiingListService {
  constructor() { }
  emitIngredients = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();
  // private ingredients: Ingredient[] = [new Ingredient('Cheeze', 500), new Ingredient('Apple', 4), new Ingredient('Tomato', 10)];
  private ingredients: Ingredient[] = [];
  getIngredientsById(id: number) {
    return this.ingredients[id];
  }
  getIngredients() {
    return this.ingredients.slice();
  }
  AddIngredients(ingred: Ingredient) {
    this.ingredients.push(ingred);
    this.emitIngredients.next(this.ingredients.slice());
  }
  AddIngredientsToList(ingred: Ingredient[]) {
    this.ingredients.push(...ingred);
    this.emitIngredients.next(this.ingredients.slice());
  }
  UpdateIngredients(index: number, newIngredient: Ingredient) {
    this.ingredients[index]  = newIngredient;
    this.emitIngredients.next(this.ingredients.slice());
  }
  Delete(index: number) {
    this.ingredients.splice(index, 1);
    this.emitIngredients.next(this.ingredients.slice());
  }
}
