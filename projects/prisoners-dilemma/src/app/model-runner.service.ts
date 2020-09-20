import { Injectable } from '@angular/core';
import { DilemmaABM, DilemmaResult, InitialValues } from 'ngx-abm';

@Injectable({
  providedIn: 'root',
})
export class ModelRunnerService {
  private modelInstance: DilemmaABM;

  public run(params: InitialValues): DilemmaResult {
    this.modelInstance = new DilemmaABM(params);
    this.modelInstance.run();
    return this.modelInstance.getResults();
  }
}
