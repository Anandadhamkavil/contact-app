import { Component, OnInit } from '@angular/core';
import { MyContact } from 'src/models/myContact';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  allcontacts:MyContact[]=[]

  searchKey:string=''
  
    constructor(private api:ApiService){ }

    ngOnInit(): void {
     this.getallContacts()
    }

//get all contact
 getallContacts(){
  this.api.getallContacts()
   .subscribe((data:any)=>{
    console.log(data);
    this.allcontacts = data
   })
 }

// search
search(event:any){
  console.log(event.target.value);
  this.searchKey = event.target.value
  
}

// delete
 deleteContact(contactId:any){
  this.api.deleteContact(contactId)
  .subscribe((data:any)=>{
    // to get all contacts from api
     this.getallContacts()
    
})
}
}


