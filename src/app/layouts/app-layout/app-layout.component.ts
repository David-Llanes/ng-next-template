import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarInsetComponent } from './components/sidebar-inset.component';
import { SidebarComponent } from './components/sidebar.component';
import { TopbarComponent } from './components/topbar.component';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, SidebarInsetComponent],
  template: `
    <app-topbar class="topbar-area" />
    <app-sidebar class="sidebar-area" />
    <app-sidebar-inset class="main-area">
      <main class="flex min-h-full flex-col">
        <router-outlet />
      </main>
    </app-sidebar-inset>
  `,
  styleUrl: './app-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-layout h-svh max-h-svh overflow-hidden' },
})
export class AppLayoutComponent {}

// ? SIEMPRE QUE SE USA <router-outlet/>, si el padre tiene flex, debe de ser flex-col.
// ? ¿POR QUE?. Porque RouterOurlet renderiza un elemento vacio y como hermano renderiza el contenido del slot.
// ? Ademas, se recomienza que el componente que se renderizara en el routerOutlet tenga en host: "{ class: 'grow' }" o "{ class: 'flex-1' }"
