import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-general',
  imports: [],
  template: `
    <div class="wrapper mb-4 grid grow content-start gap-4">
      @for (item of [1, 2, 3, 4, 5]; track $index) {
        <div class="bg-card h-64 rounded-xl border"></div>
      }
    </div>

    <footer class="bg-background sticky bottom-0 h-12 w-full border-t">a</footer>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page grow' },
})
export class GeneralComponent {}
