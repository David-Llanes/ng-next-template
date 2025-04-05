import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { LayoutMode } from '@layouts/app-layout/app-layout.service';
import {
  DataCollapsible,
  DataState,
  Mode,
  SidebarService,
  Variant,
} from '@layouts/app-layout/sidebar.service';
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
        <header class="flex bg-green-200 p-2">HEADER</header>
      </app-sidebar-header>

      <app-sidebar-content class="grow">
        <nav
          class="flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden"
        >
          <button class="m-2 cursor-pointer border bg-yellow-500 p-4 shadow-md">
            Hola
          </button>
          <a href="https://www.google.com" target="_blank">Google</a>
        </nav>
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
    '[attr.data-layout]': 'layoutMode()',
  },
})
export class SidebarContainerComponent {
  private sidebarService = inject(SidebarService);

  layoutMode = input.required<LayoutMode | undefined>();

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
