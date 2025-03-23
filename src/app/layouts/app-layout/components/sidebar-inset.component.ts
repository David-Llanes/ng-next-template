import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-inset',
  imports: [],
  template: ` <ng-content></ng-content> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarInsetComponent {}
