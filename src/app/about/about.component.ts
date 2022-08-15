import { LeaderService } from './../services/leader.service';
import { Component, Inject, OnInit } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { Leader } from '../shared/leader';
import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  leader!: Leader;
  leaders!: Leader[];


  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') protected baseURL:any) { }

  ngOnInit(): void {
    this.leaderService.getLeaders().subscribe((leaders) => this.leaders = leaders);
  }

  getLeader(){
    return this.leader;
  }

  getLeaders(){
    return this.leaders;
  }

}
