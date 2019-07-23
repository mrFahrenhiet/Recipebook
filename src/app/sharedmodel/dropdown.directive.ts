import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.active') isOpen:boolean=false;
  @HostListener('click') open(){
    this.isOpen=!this.isOpen;
  }
  constructor() { }

}
