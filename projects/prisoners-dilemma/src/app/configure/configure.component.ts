import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { allStrategies, Strategy, InitialValues } from 'ngx-abm';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss'],
})
export class ConfigureComponent implements OnInit {
  public allStrategies = allStrategies;
  // public prisoner1Strategy = new FormControl();
  // public prisoner2Strategy = new FormControl();
  public configurationForm = this.fb.group({
    // prisoner1Strategy: this.prisoner1Strategy,
    // prisoner2Strategy: this.prisoner2Strategy,
    numberOfRounds: this.fb.control(''),
    strategies: this.fb.array([]),
  });

  @Output() configuration = new EventEmitter<Partial<InitialValues>>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addStrategiesToFormArray();
  }

  public onSubmit() {
    // console.log(this.configurationForm);
    const checked = this.configurationForm.controls.strategies.value.map(
      (v) => !!v
    );
    const checkedStrategies = this.allStrategies.filter((s, i) => !!checked[i]);
    const params: Partial<InitialValues> = {
      maxRounds: this.configurationForm.controls.numberOfRounds.value,
      strategies: checkedStrategies,
    };
    this.configuration.emit(params);
  }

  private addStrategiesToFormArray() {
    for (const s of this.allStrategies) {
      (this.configurationForm.controls.strategies as FormArray).push(
        this.fb.control('')
      );
    }
  }
}
