import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import { ShopingListComponent } from './Shoping-List/shoping-list/shoping-list.component';
import { ShopingListEditComponent } from './Shoping-List/shoping-list-edit/shoping-list-edit.component';
import { RecipeListComponent } from './Recipe/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './Recipe/recipe-item/recipe-item.component';
import {RecipeDetailsComponent} from './Recipe/recipe-details/recipe-details.component';
import { DropdownDirective } from './sharedmodel/dropdown.directive';
import { RecipeService } from './services/recipe.service';
import { ShopiingListService } from './services/shopiing-list.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RecipeStartComponent } from './Recipe/recipe-start/recipe-start.component';
import { EditRecipeComponent } from './Recipe/edit-recipe/edit-recipe.component';
import { ListEditComponent } from './Shoping-List/list-edit/list-edit.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataStorageService } from './sharedmodel/data-storage.service';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShopingListComponent,
    ShopingListEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailsComponent,
    DropdownDirective,
    RecipeStartComponent,
    EditRecipeComponent,
    ListEditComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RecipeService, ShopiingListService, DataStorageService,
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
