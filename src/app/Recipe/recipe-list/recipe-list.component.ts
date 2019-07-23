import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { DataStorageService } from 'src/app/sharedmodel/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  recipes: Recipe[];

  constructor(private recipeService: RecipeService, private dataService: DataStorageService) { }

  ngOnInit() {
    this.recipeService.changeRecipe.subscribe( (recipe: Recipe[]) => {
      this.recipes = recipe;
    });
    this.recipes  = this.recipeService.getRecipe();
    this.recipeService.SeeRecipe.subscribe( (recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
    this.dataService.fetchRecipes();
  }
  ngOnDestroy() {
   // this.recipeService.changeRecipe.unsubscribe();
  }

}
