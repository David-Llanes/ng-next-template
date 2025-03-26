import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general',
  imports: [],
  template: `
    <div class="wrapper grid grow content-start gap-4">
      @for (item of [1, 2, 3, 4, 5, 6]; track $index) {
        <div class="bg-card h-40 rounded-xl border"></div>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page grow' },
})
export class GeneralComponent implements OnInit {
  ngOnInit(): void {
    console.log('GeneralComponent initialized');
  }
}
