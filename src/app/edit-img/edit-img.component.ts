import { Component, OnInit } from '@angular/core';
import {Contact} from '../model/contact.model';
//import {FormGroup} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ContactService} from '../service/contact.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-img',
  templateUrl: './edit-img.component.html',
  styleUrls: ['./edit-img.component.css']
})
export class EditImgComponent implements OnInit {

  contact: Contact;
  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {
    let contactId = localStorage.getItem("editContactImgId");
    this.currentFileUpload = this.selectedFiles.item(0);
    this.contactService.updateContact2(this.currentFileUpload, contactId)
      //.pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list']);
        },
        error => {
          console.log(error);
        });
  }
}
