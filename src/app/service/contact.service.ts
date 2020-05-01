import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Contact} from '../model/contact.model';
import {Validators} from '@angular/forms';
// import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {}
  url: string ='http://localhost:8080/contacts';
  urladd: string ='http://localhost:8080/add/contact';
  urlupdate: string ='http://localhost:8080/contact/update';
  url1: string ='http://localhost:8080/contact';
  pagesUrl: string='http://localhost:8080/chercher?mc=';

  getPages(mc:string, p:number, s:number){
    return this.http.get<Contact[]>(this.pagesUrl+mc+"&p="+p+"&s="+s);
  }

  getContacts(){
    return this.http.get<Contact[]>(this.url);
  }

  createContact(c: Contact, file: File){
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('nom', c.nom);
    formdata.append('prenom', c.prenom);
    formdata.append('date', c.dateNaissance.toString());

    const req1 = new HttpRequest('POST', this.urladd, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req1);

    //return this.http.post(this.urladd, c);
  }

  getContact(id: number){
    return this.http.get<Contact>(this.url1+'/'+id);
  }

  updateContact1(c: Contact){
    return this.http.put(this.urlupdate+'1/'+c.id, c);
  }

  updateContact2(file: File, id: string){
    let formdata2: FormData = new FormData();
    formdata2.append('ufile', file);
    formdata2.append('cle', id);
    console.log(id);
    const requ = new HttpRequest('PUT', this.urlupdate+'2/'+id, formdata2, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(requ);
  }

  deleteContact(id: number){
    return this.http.delete(this.url+'/'+id);
  }
}
