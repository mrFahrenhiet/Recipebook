import { Injectable, EventEmitter } from '@angular/core';
import {Recipe} from '../Recipe/recipe.model';
import { Ingredient } from '../sharedmodel/ingredients.model';
import { ShopiingListService } from './shopiing-list.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  changeRecipe = new Subject<Recipe[]>();
  SeeRecipe = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    // tslint:disable-next-line: max-line-length
    ];

  setRecipe(recipes: Recipe[]) {
    this.recipes  = recipes;
    this.changeRecipe.next(this.recipes.slice());
    }
  getRecipe() {
    return this.recipes.slice();
  }

  getRecipeByName(name: string) {
    const recipe = this.recipes.find( (s) => {
      return s.name === name;
      }
    );
    return recipe;
  }
  addRecipe(r: Recipe) {
    this.recipes.push(r);
    this.changeRecipe.next(this.recipes.slice());
  }
  updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe ;
    this.changeRecipe.next(this.recipes.slice());
  }

  constructor(private slService: ShopiingListService, private router: Router) { }
  addToshopinglist(ingerds: Ingredient[]) {
    this.slService.AddIngredientsToList(ingerds);
  }
  getId(name: string) {
    for (let i = 0; i < this.recipes.length; i++) {
      if (name === this.recipes[i].name) {
        return i;
      }
    }
  }
  delete(id: number) {
    this.recipes.splice(id, 1);
    this.changeRecipe.next(this.recipes.slice());
  }
}
