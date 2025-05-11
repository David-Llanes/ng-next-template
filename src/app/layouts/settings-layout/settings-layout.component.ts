import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings-layout',
  imports: [RouterOutlet],
  template: `
    <div
      class="bg-background sticky top-0 h-20 shrink-0 place-content-center text-center"
    >
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

// LO DE ABAJO ES PARA PODER UNA SIDEBAR FIXED PARA LAS "TABS"
// <div class="flex grow">
//   <div
//     class="bg-background fixed hidden h-full w-20 shrink-0 place-content-center border-r text-center md:block"
//   >
//     THIS CAN BE STICKY
//   </div>
//   <div class="flex grow flex-col md:ml-20">
//     <p class="sticky top-0 h-12 bg-red-950">Settings</p>
//     <router-outlet />
//   </div>
// </div>
