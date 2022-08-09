import { LeaderService } from './../services/leader.service';
import { Component, OnInit } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leader!: Leader;
  leaders!: Leader[];


  constructor(private leaderService: LeaderService) { }

  ngOnInit(): void {
    this.leaderService.getLeaders().then((leaders) => this.leaders = leaders);
  }

  getLeader(){
    return this.leader;
  }

  getLeaders(){
    return this.leaders;
  }

}
