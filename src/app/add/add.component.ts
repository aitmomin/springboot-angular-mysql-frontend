import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ContactService} from '../service/contact.service';
import {Contact} from '../model/contact.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addForm: FormGroup;
  selectedFiles: FileList;
  currentFileUpload: File;
  constructor(private formBuilder: FormBuilder,private router: Router, private contactService: ContactService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      photo: ['', Validators.required]
    });
  }

  selectFile(event) {
    //const file = event.target.files.item(0);
    this.selectedFiles = event.target.files;
    //console.log(this.addForm.get("photo"));
  }

  onSubmit() {
    this.currentFileUpload = this.selectedFiles.item(0);
    //this.addForm.setValue({"photo":this.currentFileUpload});

    this.contactService.createContact(this.addForm.value, this.currentFileUpload)
      .subscribe( data => {
        this.router.navigate(['list']);
      });
  }

  onFileChanged(event) {
    //this.selectedFile = event.target.files[0];
    //console.log(this.selectedFile);
  }

  onUpload() {
    // this.http is the injected HttpClient
    /*this.http.post('my-backend.com/file-upload', this.selectedFile).subscribe(...);*/
  }

}
