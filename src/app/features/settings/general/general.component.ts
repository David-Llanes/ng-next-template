import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-general',
  imports: [],
  template: `
    <div class="wrapper grid grow content-start gap-4">
      @for (item of [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]; track $index) {
        <div class="bg-card h-64 rounded-xl border"></div>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page grow' },
})
export class GeneralComponent {}
