import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings-layout',
  imports: [RouterOutlet],
  template: `
    <div class="sticky top-0 h-20 shrink-0 place-content-center bg-blue-200 text-center">
      THIS CAN BE STICKY
    </div>
    <div class="flex grow flex-col">
      <router-outlet />
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col grow' },
})
export class SettingsLayoutComponent {}
