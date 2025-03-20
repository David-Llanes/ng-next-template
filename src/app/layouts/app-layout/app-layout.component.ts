import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet],
  template: `
    <header class="topbar-area bg-red-200">a</header>
    <aside class="sidebar-area bg-blue-200">sidebar</aside>
    <div class="main-area scrollbar-thin relative bg-green-300">
      <div class="size-full">
        <router-outlet />
      </div>
    </div>
  `,
  styles: `
    .app-layout {
      display: grid;
      grid-template-areas:
        'sidebar topbar'
        'sidebar main';
      grid-template-rows: 80px 1fr;
      grid-template-columns: auto 1fr;
    }

    .sidebar-area {
      grid-area: sidebar;
    }

    .topbar-area {
      grid-area: topbar;
    }

    .main-area {
      grid-area: main;
      overflow-x: hidden;
      overflow-y: auto;
    }

    @media (width < 48rem) {
      .app-layout {
        grid-template-areas:
          'topbar'
          'sidebar'
          'main';
        grid-template-rows: 80px auto 1fr;
        grid-template-columns: unset;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-layout h-svh max-h-svh overflow-hidden relative' },
})
export class AppLayoutComponent {}
