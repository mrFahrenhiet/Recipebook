import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';
import Swal from 'sweetalert2';
import { DataStorageService } from 'src/app/sharedmodel/data-storage.service';
@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  name: string;
  isEdit = false;
  newRecipe: FormGroup;
  recipeEdit: Recipe;
  id: number;
  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router, private dataService: DataStorageService) { }

  ngOnInit() {

    const recipeIngred = new FormArray([]);
    this.route.params.subscribe((param: Params) => {
      this.name = param.name;
      console.log(this.name);
      this.recipeEdit = this.recipeService.getRecipeByName(this.name);
      this.id = this.recipeService.getId(this.name);
      console.log(this.id);
      this.isEdit = this.name !== undefined ? true : false;
      console.log(this.isEdit);
    });
    if (!this.isEdit) {
      this.newRecipe = new FormGroup({
      recipeName: new FormControl(null, [Validators.required]),
      recipeDescription: new FormControl(null, [Validators.required]),
      recipeImage: new FormControl(null, [Validators.required]),
      recipeIngredients: recipeIngred
    });
  } else {
      this.newRecipe = new FormGroup({
      recipeName: new FormControl(this.name, [Validators.required]),
      recipeDescription: new FormControl(this.recipeEdit.description, [Validators.required]),
      recipeImage: new FormControl(this.recipeEdit.image, [Validators.required]),
      recipeIngredients: recipeIngred
    });
      if (this.recipeEdit.ingredients) {
        console.log(this.recipeEdit.ingredients);
        for (const ingred of this.recipeEdit.ingredients) {
          console.log(ingred.item);
          recipeIngred.push(
           new FormGroup({
             item: new FormControl(ingred.item),
             amount: new FormControl(ingred.amount, [Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)])
           })
         );
        }
    }
  }
  }
  onSubmit() {
    console.log(this.newRecipe.value.recipeName);
    const recipenew = new Recipe(
      this.newRecipe.value.recipeName,
      this.newRecipe.value.recipeDescription,
      this.newRecipe.value.recipeImage,
      this.newRecipe.value.recipeIngredients);
    if (this.isEdit) {
      this.recipeService.updateRecipe(this.id, recipenew);
      this.dataService.storeRecipes();
      Swal.fire(
        'Updated!',
        'Your recipe was updated!',
        'success'
      );
    } else {
      this.recipeService.addRecipe(recipenew);
      this.dataService.storeRecipes();
      Swal.fire(
        'Added!',
        'Your recipe was added!',
        'success'
      );
    }
    this.router.navigate(['/recipes']);
  }
  get recipeIngredients() {
    const controlName = new FormControl(null, [Validators.required]);
    const controlAmount = new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]);
    return this.newRecipe.get('recipeIngredients') as FormArray;
  }
  onAddIngredient() {
    const controlName = new FormControl(null, [Validators.required]);
    const controlAmount = new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]);
    // (<FormArray>this.newRecipe.get('recipeIngredients')).push(control);
    ( this.recipeIngredients.push(
      new FormGroup({
        item: controlName,
        amount: controlAmount
      })
    ));
  }
  onDeleteIngredient(i: number) {
    ( this.newRecipe.get('recipeIngredients') as FormArray).removeAt(i);
  }
}
