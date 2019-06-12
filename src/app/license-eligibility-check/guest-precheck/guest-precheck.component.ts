import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-guest-precheck',
  templateUrl: './guest-precheck.component.html',
  styleUrls: ['./guest-precheck.component.css']
})
export class GuestPrecheckComponent implements OnInit {

  guestForm: FormGroup;

  @Output()
  doPreCheck = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.guestForm = this.initGuestForm();
  }

  submitForm() {

    console.log(' *** form submitted', this.guestForm.value);

    this.doPreCheck.emit(this.guestForm.value);

  }


  private initGuestForm(): FormGroup {

    return this.fb.group({
      dlNumber:  ['', [Validators.required, Validators.minLength(2)]],
      triulliumNumber: ['', [Validators.required, Validators.minLength(2)]],
      postalCode: ['', [Validators.required]],
      dob: ['', [Validators.required]]
    });

  }

  get dlNumber(): AbstractControl { 
    return this.guestForm.get('dlNumber'); 
  }

  get triulliumNumber(): AbstractControl { 
    return this.guestForm.get('triulliumNumber'); 
  }

  get postalCode(): AbstractControl { 
    return this.guestForm.get('postalCode'); 
  }

  get dob(): AbstractControl { 
    return this.guestForm.get('dob'); 
  }

}
