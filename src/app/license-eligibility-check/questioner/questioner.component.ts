import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-questioner',
  templateUrl: './questioner.component.html',
  styleUrls: ['./questioner.component.css']
})
export class QuestionerComponent implements OnInit {

  questionerForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.questionerForm = this.buildQuestionerForm();

  }

  submitForm() {

  }


  buildQuestionerForm(): FormGroup {

    return this.fb.group({
      musclePain: ['', [Validators.required]],
      eye: ['', [Validators.required]],
      poorDriving: ['', [Validators.required]],
      cardiacProblem: ['', [Validators.required]],
      respiratoryProblem: ['', [Validators.required]],
      hospitalized: ['', [Validators.required]],
    });


  }

}
