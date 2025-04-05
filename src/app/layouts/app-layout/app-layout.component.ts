import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutService } from '@core/services/layout.service';
import { SidebarContainerComponent } from './components/sidebar/sidebar-container.component';
import { TopbarComponent } from './components/topbar.component';

@Component({
  selector: 'app-app-layout',
  imports: [
    RouterOutlet,
    TopbarComponent,
    NgTemplateOutlet,
    NgClass,
    SidebarContainerComponent,
  ],
  template: `
    <ng-template #topbar>
      <app-topbar [class]="layoutMode() === 'col' ? 'border-b' : ''" />
    </ng-template>

    <ng-template #sidebar>
      <app-sidebar-container [layoutMode]="layoutMode()" />
    </ng-template>

    <ng-template #main>
      <main class="bg-background flex h-full grow flex-col overflow-auto">
        <router-outlet />
      </main>
    </ng-template>

    @defer (when layoutReady()) {
      <div
        style="--sidebar-width:16rem; --sidebar-width-icon:3rem; --topbar-height:4rem;"
        class="group/sidebar-wrapper has-[[data-variant=inset]]:bg-sidebar flex h-svh w-full overflow-hidden"
        [ngClass]="{ 'flex-col': layoutMode() === 'col' }"
      >
        <ng-container [ngTemplateOutlet]="outerComponent()!" />

        <div
          class="bg-background relative flex w-full flex-1 overflow-hidden transition-[margin,padding] duration-200 md:peer-data-[variant=inset]:ml-2 md:peer-data-[layout=row]:peer-data-[variant=inset]:m-2 md:peer-data-[layout=row]:peer-data-[variant=inset]:rounded-xl md:peer-data-[layout=row]:peer-data-[variant=inset]:shadow-sm"
          [ngClass]="{ 'flex-col': layoutMode() !== 'col' }"
        >
          <ng-container [ngTemplateOutlet]="innerComponent()!" />
          <ng-container [ngTemplateOutlet]="content()" />
        </div>
      </div>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent {
  private layoutService = inject(LayoutService);

  layoutMode = this.layoutService.layoutMode;

  sidebar = viewChild.required<TemplateRef<unknown>>('sidebar');
  topbar = viewChild.required<TemplateRef<unknown>>('topbar');
  content = viewChild.required<TemplateRef<unknown>>('main');

  outerComponent = computed(() => {
    if (this.layoutMode() === undefined) return undefined;

    if (this.layoutMode() === 'col') {
      return this.topbar();
    } else {
      return this.sidebar();
    }
  });

  innerComponent = computed(() => {
    if (this.layoutMode() === undefined) return undefined;

    if (this.layoutMode() === 'col') {
      return this.sidebar();
    } else {
      return this.topbar();
    }
  });

  layoutReady = computed(() => {
    if (
      this.layoutService.layoutConfig() &&
      this.innerComponent() &&
      this.outerComponent()
    ) {
      return true;
    }

    return false;
  });
}

// ? SIEMPRE QUE SE USA <router-outlet/>, si el padre tiene flex, debe de ser flex-col.
// ? ¿POR QUE?. Porque RouterOurlet renderiza un elemento vacio y como hermano renderiza el contenido del slot.
// ? Ademas, se recomienza que el componente que se renderizara en el routerOutlet tenga en host: "{ class: 'grow' }" o "{ class: 'flex-1' }"
