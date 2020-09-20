import { Component, Input, OnInit } from '@angular/core';
import { DilemmaResult, InitialValues } from 'ngx-abm';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss'],
})
export class AnalyzeComponent implements OnInit {
  public numberOfCols = 0;
  public scores: string[];
  public playedStrategies: string[];


  @Input() set params(value: InitialValues) {
    if (value) {
      this.playedStrategies = value.strategies.map((s) => s.name);
    }
  }

  @Input() set results(value: DilemmaResult) {
    console.log(value);
    if (value) {
      this.numberOfCols = Math.floor(Math.sqrt(value.length));
      this.calculateScores(value);
    }
  }

  constructor() {}

  ngOnInit(): void {}

  private calculateScores(res: DilemmaResult) {
    const scores = [];
    for (let i = 0; i < res.length; i++) {
      if (i % this.numberOfCols === 0) {
        const rowLabel = this.playedStrategies[
          Math.floor(i / this.numberOfCols)
        ];
        scores.push(rowLabel);
      }
      const score = `${res[i][0].reward.pastValues.reduce(
        (a, b) => a + b
      )} : ${res[i][1].reward.pastValues.reduce((a, b) => a + b)}`;
      scores.push(score);
    }
    // scores.push('sum');
    // for (let i = 0; i < this.numberOfCols; i++) {
    //   scores.push('?');
    // }
    this.scores = scores;
  }
}
