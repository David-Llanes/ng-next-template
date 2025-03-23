import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-general',
  imports: [],
  template: `
    <div class="wrapper grid grow content-start gap-4">
      @for (item of [1, 2, 3, 4, 5]; track $index) {
        <div class="h-40 bg-gray-300">{{ item }}</div>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page grow' },
})
export class GeneralComponent {}
