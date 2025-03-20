import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-general',
  imports: [],
  template: `
    <div class="wrapper grid gap-6">
      @for (item of [1, 2, 3, 4, 5, 6, 7, 8, 9]; track $index) {
        <div class="h-40 bg-gray-300">{{ item }}</div>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page' },
})
export class GeneralComponent {}
