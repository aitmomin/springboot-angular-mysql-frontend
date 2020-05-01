import { Component, OnInit } from '@angular/core';
import {Contact} from '../model/contact.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ContactService} from '../service/contact.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  contact: Contact;
  editForm: FormGroup;
  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(private formBuilder: FormBuilder,private router: Router, private contactService: ContactService) { }

  ngOnInit() {
    let contactId = localStorage.getItem("editContactId");
    if(!contactId) {
      alert("Invalid action.")
      this.router.navigate(['list']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      photo: ['', Validators.required]
    });
    this.contactService.getContact(+contactId)
      .subscribe( data => {
        this.editForm.setValue({id:data.id, nom:data.nom, prenom:data.prenom, dateNaissance:data.dateNaissance, photo:data.photo});
      });
  }

  /*selectFile(event) {
    //const file = event.target.files.item(0);
    this.selectedFiles = event.target.files;
    //console.log(this.addForm.get("photo"));
  }*/

  onSubmit() {
    //this.currentFileUpload = this.selectedFiles.item(0);
    this.contactService.updateContact1(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list']);
        },
        error => {
          console.log(error);
        });
  }
}
