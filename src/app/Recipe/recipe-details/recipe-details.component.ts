import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-repice-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
 recipe: Recipe;
 name: string;
 id: number;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.name = params.name;
      this.recipe = this.recipeService.getRecipeByName(this.name);
    });
  }
  toAddTolist() {
    Swal.fire(
      'Added!',
      'All the ingredients were added to your shopping list!',
      'success'
    );
    this.recipeService.addToshopinglist(this.recipe.ingredients);
    this.router.navigate(['/shopping-list']);

  }
  rEdit() {
    this.router.navigate(['/recipes', this.recipe.name, 'edit']);
  }
  delete() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-3'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      // tslint:disable-next-line: quotemark
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.id = this.recipeService.getId(this.name);
        this.recipeService.delete(this.id);
        this.router.navigate(['/recipes']);
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your Recipe has been deleted.',
          'success'
        );
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your Recipe is safe :)',
          'error'
        );
      }
    });
  }
}
