import { bindable, inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from 'aurelia-router'; 

@inject(Router, Service)
export class Create {
  @bindable data;
  @bindable error;

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  created(owner, self) {
    this.data = {}
  }

  cancelCallback(event) {
    this.__goToList();
  }

  saveCallback(event) {  
    this.service.create(this.data)
      .then(result => {
        this.__goToList();
      }) 
      .catch(error => { 
        this.error = error;
      });
  }
 
  __goToList() {
    this.router.navigateToRoute('list');
  }
}