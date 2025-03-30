import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarTogglerComponent } from './sidebar-toggler.component';

@Component({
  selector: 'app-topbar',
  imports: [SidebarTogglerComponent],
  template: `
    <header
      class="bg-background flex h-full items-center justify-between gap-4 px-4 py-2"
    >
      <app-sidebar-toggler />
    </header>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'bg-background flex h-[var(--topbar-height)] w-full shrink-0 items-center border-b',
  },
})
export class TopbarComponent {}
