import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShopingListComponent } from '../Shoping-List/shoping-list/shoping-list.component';
import { RecipeListComponent } from '../Recipe/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from '../Recipe/recipe-details/recipe-details.component';
import { RecipeStartComponent } from '../Recipe/recipe-start/recipe-start.component';
import { EditRecipeComponent } from '../Recipe/edit-recipe/edit-recipe.component';
import { AuthComponent } from '../auth/auth.component';
import { AuthGuard } from '../auth/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'shopping-list', component: ShopingListComponent },
  {
    path: 'recipes',
    component: RecipeListComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: RecipeStartComponent},
      { path: 'new', component: EditRecipeComponent },
      {path: ':name' , component: RecipeDetailsComponent},
      { path: ':name/edit', component: EditRecipeComponent }
    ]
  },
  { path: 'auth' , component: AuthComponent }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
