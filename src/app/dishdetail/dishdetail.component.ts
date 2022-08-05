import { Component, OnInit} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {


  dish!: Dish;
  id!: string;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.dish = this.dishservice.getDish(this.id);
  }

  goBack(): void {
    this.location.back();
  }

}

