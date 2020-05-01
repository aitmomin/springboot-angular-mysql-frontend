import { Component, OnInit } from '@angular/core';
import {Contact} from '../model/contact.model';
import {Router} from '@angular/router';
import {ContactService} from '../service/contact.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  contacts: Contact[];
  mc:string="";
  p:number=0;
  s:number=5;
  tab:Array<number>;

  constructor(private router: Router, private contactService: ContactService) {
  }

  ngOnInit() {
    this.charger();
  }

  deleteContact(c: Contact): void {
    this.contactService.deleteContact(c.id)
      .subscribe(data => {
        //this.contacts = this.contacts.filter(u => u.id !== c.id);
        this.charger();
      });
  };

  editContact(c: Contact): void {
    localStorage.removeItem("editContactId");
    localStorage.setItem("editContactId", c.id.toString());
    this.router.navigate(['edit']);
  };

  editContactImg(c: Contact): void {
    localStorage.removeItem("editContactImgId");
    localStorage.setItem("editContactImgId", c.id.toString());
    //console.log(c.id.toString());
    this.router.navigate(['edit-img']);
  };

  addContact(): void {
    this.router.navigate(['add']);
  };

  home(): void {
    this.router.navigate(['home']);
  }

  charger(){
    this.contactService.getPages(this.mc, this.p, this.s)
      .subscribe(data => {
        this.contacts = data;
        this.tab = new Array(this.contacts.length);
      });
  }

  chercher(){
    this.charger();
  }

  go(i){
    this.p=i;
    this.charger();
  }

}
