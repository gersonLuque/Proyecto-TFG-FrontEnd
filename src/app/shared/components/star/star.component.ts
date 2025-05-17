import {Component, Input, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SolutionService} from '@core/services/solution.service';
import {lastValueFrom} from 'rxjs';

@Component({
  selector: 'app-star',
  imports: [
    FormsModule
  ],
  templateUrl: './star.component.html',
  styleUrl: './star.component.css'
})
export class StarComponent implements OnInit {
  @Input() sizeStar: string = '64px';
  @Input({required:true}) star:boolean = false;
  @Input({required:true}) solutionId:number;
  isStarSelected: boolean;
  @Input() rol: string;
  constructor(private solutionService: SolutionService) {
  }
   ngOnInit() {
    this.isStarSelected = this.star;
  }
   async toggleStar() {
    this.isStarSelected = !this.isStarSelected;
    await lastValueFrom(this.solutionService.updateStar(this.solutionId, this.isStarSelected));
  }
}
