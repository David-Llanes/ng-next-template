import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { LayoutService } from '@core/services/layout.service';
import {
  DataCollapsible,
  DataState,
  Mode,
  SidebarService,
  Variant,
} from '@core/services/sidebar.service';
import { SidebarContentComponent } from './sidebar-content.component';
import { SidebarFooterComponent } from './sidebar-footer.component';
import { SidebarHeaderComponent } from './sidebar-header.component';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-sidebar-container',
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarContentComponent,
    SidebarFooterComponent,
  ],
  template: `
    <app-sidebar>
      <app-sidebar-header>
        <header class="flex flex-col gap-2 p-2">HEADER</header>
      </app-sidebar-header>

      <app-sidebar-content>
        @for (item of [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; track $index) {
          <nav class="flex flex-col gap-1 bg-green-200">
            <button class="m-2 cursor-pointer border bg-yellow-500 p-4 shadow-md">
              Hola
            </button>
            <a href="https://www.google.com" target="_blank">Google</a>
          </nav>
        }
      </app-sidebar-content>

      <app-sidebar-footer>
        <footer class="h-16 bg-red-300">FOOTER</footer>
      </app-sidebar-footer>
    </app-sidebar>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'group peer text-foreground',
    '[attr.data-side]': '"left"',
    '[attr.data-variant]': 'dataVariant()',
    '[attr.data-mode]': 'dataMode()',
    '[attr.data-state]': 'dataState()',
    '[attr.data-collapsible]': 'dataCollapsible()',
    '[attr.data-layout]': 'dataLayout()',
  },
})
export class SidebarContainerComponent {
  private sidebarService = inject(SidebarService);
  private layoutService = inject(LayoutService);

  dataLayout = this.layoutService.layoutMode;

  dataVariant = computed<Variant | ''>(() => {
    return this.sidebarService.variant() ?? '';
  });

  dataMode = computed<Mode | ''>(() => {
    if (this.sidebarService.isOverlay()) return 'overlay';
    if (this.sidebarService.isStatic()) return 'static';

    return '';
  });

  dataState = computed<DataState>(() => {
    const isExpanded =
      this.sidebarService.isStaticActive() || this.sidebarService.isOverlayActive();

    return isExpanded ? 'expanded' : 'collapsed';
  });

  dataCollapsible = computed<DataCollapsible>(() => {
    if (this.sidebarService.isStaticCollapsed()) return 'icon';

    if (
      this.sidebarService.isStaticOffCanvas() ||
      this.sidebarService.isOverlayOffCanvas()
    ) {
      return 'offcanvas';
    }

    return '';
  });

  data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
    teams: [
      {
        name: 'Acme Inc',
        logo: '',
        plan: 'Enterprise',
      },
      {
        name: 'Acme Corp.',
        logo: '',
        plan: 'Startup',
      },
      {
        name: 'Evil Corp.',
        logo: '',
        plan: 'Free',
      },
    ],
    navMain: [
      {
        title: 'Playground',
        url: '#',
        icon: '',
        isActive: true,
        items: [
          {
            title: 'History',
            url: '#',
          },
          {
            title: 'Starred',
            url: '#',
          },
          {
            title: 'Settings',
            url: '#',
          },
        ],
      },
      {
        title: 'Models',
        url: '#',
        icon: '',
        items: [
          {
            title: 'Genesis',
            url: '#',
          },
          {
            title: 'Explorer',
            url: '#',
          },
          {
            title: 'Quantum',
            url: '#',
          },
        ],
      },
      {
        title: 'Documentation',
        url: '#',
        icon: '',
        items: [
          {
            title: 'Introduction',
            url: '#',
          },
          {
            title: 'Get Started',
            url: '#',
          },
          {
            title: 'Tutorials',
            url: '#',
          },
          {
            title: 'Changelog',
            url: '#',
          },
        ],
      },
      {
        title: 'Settings',
        url: '#',
        icon: '',
        items: [
          {
            title: 'General',
            url: '#',
          },
          {
            title: 'Team',
            url: '#',
          },
          {
            title: 'Billing',
            url: '#',
          },
          {
            title: 'Limits',
            url: '#',
          },
        ],
      },
    ],
    projects: [
      {
        name: 'Design Engineering',
        url: '#',
        icon: '',
      },
      {
        name: 'Sales & Marketing',
        url: '#',
        icon: '',
      },
      {
        name: 'Travel',
        url: '#',
        icon: '',
      },
    ],
  };
}
