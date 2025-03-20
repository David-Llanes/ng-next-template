import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings-layout',
  imports: [RouterOutlet],
  template: `
    <div class="h-20 shrink-0 bg-black text-white">THIS CAN BE STICKY</div>
    <div class="grow">
      <router-outlet />
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col' },
})
export class SettingsLayoutComponent {}
