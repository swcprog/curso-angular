import { Component, Inject, OnInit, ViewChild} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlider } from '@angular/material/slider';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Comment } from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective: { resetForm: () => void; };


  dish!: Dish;
  id!: string;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: Comment;
  feedbackForm: FormGroup;
  date: Date;
  dishErrMsg: string;
  dishcopy: Dish;

  validationMessages: { [ key: string ]: any } = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'message': {
      'required':      'Message is required.'
    }
  }

  formErrors: { [char: string]: string } = {
    'firstname': '',
    'message': ''
  };


  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') protected baseURL: any) {
      this.createForm();
    }

  ngOnInit(): void {
    this.route.params
    .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id);
      (errmess: any) => this.dishErrMsg = <any>errmess;})
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      message: ['',Validators.required],
      date: new Date,
      rate: 5,
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(): void{
    this.commentForm = this.feedbackForm.value;
    console.log(this.commentForm);
    this.dishcopy.comments.push({
      rating: this.feedbackForm.value.rate,
      comment: this.feedbackForm.value.message,
      author: this.feedbackForm.value.firstname,
      date: this.feedbackForm.value.date
    })

    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      (errmess: any) => { this.dishErrMsg = <any>errmess; }})

    this.feedbackForm.reset({
      firstname: '',
      message: '',
      rate: 5
    });
    this.feedbackFormDirective.resetForm();
  }
}
