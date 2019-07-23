import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../services/recipe.service';
import { Subject } from 'rxjs';
import { Recipe } from '../Recipe/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  error = new Subject<string>();
  constructor(private http: HttpClient, private recipes: RecipeService, private authService: AuthService) { }
  storeRecipes() {
    const recipes = this.recipes.getRecipe();
    this.http.put<{name: string}>('https://recipebook-95966.firebaseio.com/recipe.json', recipes)
    .subscribe((responseData) => {
      console.log(responseData);
    }, error => {
      this.error.next(error.message);
    });
  }
  fetchRecipes() {
    this.http.get<Recipe[]>('https://recipebook-95966.firebaseio.com/recipe.json').pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      })
    ).subscribe(recipes => {
      console.log(recipes);
      this.recipes.setRecipe(recipes);
    });
  }
}
