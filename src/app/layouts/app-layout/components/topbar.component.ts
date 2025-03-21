import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarTogglerComponent } from './sidebar-toggler.component';

@Component({
  selector: 'app-topbar',
  imports: [SidebarTogglerComponent],
  template: `
    <header class="flex h-full items-center justify-end px-4 py-2">
      <app-sidebar-toggler />
    </header>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {}
