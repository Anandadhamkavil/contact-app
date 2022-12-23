import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyContact } from 'src/models/myContact';
import { MyGroup } from 'src/models/myGroup';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit{

  contactId:string=''
  contact:MyContact = {} as MyContact
  group:MyGroup[] = [] as MyGroup[]
  constructor(private activateRoute:ActivatedRoute,private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    // get contact id from url parameter using ActivateRoute class
    this.activateRoute.params
    .subscribe((data)=>{
      console.log(data['contactId']);
      this.contactId = data['contactId']
    })

    // call api for getting particular contact detail
    this.api.viewContact(this.contactId)
    .subscribe((data:any)=>{
      this.contact = data
    })

    // call api for getting all group from service class
    this.api.getAllGroups()
    .subscribe((data:any)=>{
      console.log(data);
      this.group = data
    })
  }


  // updateContact
  updateContact(){
    // api call for updating the existing contact, arg:update contactId,contact
    this.api.updateContact(this.contactId,this.contact)
    .subscribe((data:any)=>{
      this.router.navigateByUrl('')
    })
  }
}
