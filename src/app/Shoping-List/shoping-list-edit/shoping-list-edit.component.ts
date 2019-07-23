import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import {Ingredient} from '../../sharedmodel/ingredients.model';
import { ShopiingListService } from 'src/app/services/shopiing-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-shoping-list-edit',
  templateUrl: './shoping-list-edit.component.html',
  styleUrls: ['./shoping-list-edit.component.css']
})
export class ShopingListEditComponent implements OnInit, OnDestroy {
  subs: Subscription;
  editMode = false;
  index: number;
  editItem: Ingredient;
  @ViewChild('form', {static: true}) form: NgForm;
  @Output() SendList = new EventEmitter<Ingredient>();
  constructor(private shopinglistService: ShopiingListService) { }
  ngOnInit() {
    this.subs = this.shopinglistService.startEditing.subscribe((id: number) => {
      this.editMode = true;
      this.index = id;
      this.editItem = this.shopinglistService.getIngredientsById(id);
      this.form.setValue({
        item: this.editItem.item,
        amount: this.editItem.amount
      });
    });
  }
  onAddItem() {
    const name  = this.form.value.item;
    const amount  = this.form.value.amount;
    const newIngredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.shopinglistService.UpdateIngredients(this.index, newIngredient);
      this.form.reset();
      this.editMode = false;
      Swal.fire(
        'Updated!',
        'Your item was updated!',
        'success'
      );
    } else {
      this.shopinglistService.AddIngredients(newIngredient);
      Swal.fire(
        'Added!',
        'Your item was added!',
        'success'
      );
    }
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
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your item has been deleted.',
          'success'
        );
        this.shopinglistService.Delete(this.index);
        this.editMode = false;
        this.form.reset();
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your item is safe :)',
          'error'
        );
      }
    });
  }
  clear() {
    this.form.reset();
    this.editMode = false;
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
