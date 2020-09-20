import { Component } from '@angular/core';
import { ModelRunnerService } from './model-runner.service';
import { InitialValues } from 'ngx-abm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'prisoners-dilemma';

  public params: InitialValues;
  public results: any;

  constructor(private readonly runner: ModelRunnerService) {}

  configurationChanged(evnt: InitialValues) {
    this.params = {
      bothCoopPayoff: 2,
      bothBetrayPayoff: 1,
      betryedPayoff: 0,
      betrayerPayoff: 3,
      maxRounds: evnt.maxRounds,
      strategies: evnt.strategies,
    };
    this.results = this.runner.run(this.params);
  }
}
