import { Leader } from './../shared/leader';
import { LeaderService } from './../services/leader.service';
import { DishService } from './../services/dish.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  featuredLeader: Leader;
  dishErrMsg: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') protected baseURL:any) { }

  ngOnInit(): void {

    this.dishservice.getFeaturedDish().subscribe((dish) => this.dish = dish), (errmess:any) => this.dishErrMsg = errmess;
    this.promotionservice.getFeaturedPromotion().subscribe((promotion) => this.promotion = promotion);
    this.leaderService.getFeaturedLeader().subscribe((leader) => this.featuredLeader = leader);

  }

}
