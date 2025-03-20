import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-general',
  imports: [],
  template: ` <p>general works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralComponent {}
