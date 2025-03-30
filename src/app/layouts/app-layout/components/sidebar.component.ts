import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { Mode, Side, SidebarService, Variant } from '../sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  template: `
    <div
      class="relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[collapsible=offcanvas]:w-0 group-data-[mode=overlay]:fixed group-data-[side=right]:rotate-180"
    ></div>
    <div
      class="fixed top-0 bottom-0 left-0 z-10 h-svh w-[var(--sidebar-width)] transition-[left,right,width,padding] duration-200 ease-linear *:overflow-hidden group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] group-data-[layout=col]:top-[var(--topbar-height)] group-data-[layout=col]:h-[calc(100svh-var(--topbar-height))] group-data-[mode=overlay]:top-0 group-data-[mode=overlay]:h-full group-data-[side=left]:border-r group-data-[side=right]:border-l group-data-[layout=row]:group-data-[variant=floating]:group-data-[state=expanded]:group-data-[side=left]:border-r-0 group-data-[layout=row]:group-data-[variant=inset]:border-none group-data-[layout=col]:md:!p-0 group-data-[mode=overlay]:md:!p-0 group-data-[state=collapsed]:md:!p-0 md:group-data-[state=expanded]:group-data-[variant=floating]:p-2 group-data-[variant=inset]:md:p-2"
    >
      <div
        data-sidebar="sidebar"
        class="bg-sidebar flex h-full w-full flex-col group-data-[layout=row]:group-data-[variant=floating]:shadow group-data-[layout=row]:group-data-[mode=static]:group-data-[state=expanded]:group-data-[variant=floating]:rounded-lg group-data-[layout=row]:group-data-[mode=static]:group-data-[state=expanded]:group-data-[variant=floating]:border"
      >
        <header data-sidebar="header" class="flex flex-col gap-2 bg-green-200 p-2">
          HEADER
        </header>
        <nav
          data-sidebar="content"
          class="flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden"
        >
          <button class="m-2 cursor-pointer border bg-yellow-500 p-4 shadow-md">
            Hola
          </button>
          <a href="https://www.google.com" target="_blank">Google</a>
        </nav>

        <!-- OVERLAY BUTTON -->
        <button
          data-sidebar="overlay"
          aria-label="Close sidebar"
          tabindex="-1"
          title="Close sidebar"
          class="fixed -z-10 bg-black/20 group-data-[mode=overlay]:inset-0 group-data-[state=collapsed]:hidden"
          (click)="toggleSidebar()"
        ></button>

        <!-- RAIL BUTTON -->
        <button
          data-sidebar="rail"
          aria-label="Toggle sidebar"
          tabindex="-1"
          title="Toggle sidebar"
          class="hover:after:bg-sidebar-border group-data-[collapsible=offcanvas]:hover:bg-sidebar absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[collapsible=offcanvas]:translate-x-0 group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[collapsible=offcanvas]:after:left-full sm:flex [[data-side=left]_&]:cursor-w-resize [[data-side=left][data-collapsible=offcanvas]_&]:-right-2 [[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right]_&]:cursor-e-resize [[data-side=right][data-collapsible=offcanvas]_&]:-left-2 [[data-side=right][data-state=collapsed]_&]:cursor-w-resize"
          (click)="toggleSidebar()"
        ></button>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'group peer text-foreground',
    '[attr.data-variant]': 'dataVariant()',
    '[attr.data-mode]': 'dataMode()',
    '[attr.data-side]': 'dataSide()',
    '[attr.data-state]': 'dataState()',
    '[attr.data-collapsible]': 'dataCollapsible()',
  },
})
export class SidebarComponent {
  private sidebarService = inject(SidebarService);

  // TODO: INCLUIR LOGICA PARA CONTROLAR ESTO DINAMICAMENTE
  dataVariant = computed<Variant>(() => {
    return 'floating';
  });

  // TODO: INCLUIR LOGICA PARA CONTROLAR ESTO DINAMICAMENTE
  dataSide = computed<Side>(() => {
    return 'left';
  });

  dataMode = computed<Mode | ''>(() => {
    if (this.sidebarService.isOverlay()) return 'overlay';
    if (this.sidebarService.isStatic()) return 'static';

    return '';
  });

  dataState = computed(() => {
    const isExpanded =
      this.sidebarService.isStaticActive() || this.sidebarService.isOverlayActive();

    return isExpanded ? 'expanded' : 'collapsed';
  });

  // TODO: TIPAR TODO
  dataCollapsible = computed(() => {
    if (this.sidebarService.isStaticCollapsed()) return 'icon';

    if (
      this.sidebarService.isStaticOffCanvas() ||
      this.sidebarService.isOverlayOffCanvas()
    ) {
      return 'offcanvas';
    }

    return '';
  });

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
