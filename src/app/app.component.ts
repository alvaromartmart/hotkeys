import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotkeysHelpComponent, HotkeysService } from '@ngneat/hotkeys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('input') input: ElementRef<HTMLElement>;
  @ViewChild('input2') input2: ElementRef<HTMLElement>;

  constructor(private hotkeys: HotkeysService, private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    const unsubscribe = this.hotkeys.onShortcut((event, keys, t) => console.log(keys));

    const helpFcn: () => void = () => {
      const ref = this.dialog.open(HotkeysHelpComponent, { width: '500px' });
      ref.componentInstance.title = 'Custom Shortcuts Title';
      ref.componentInstance.dimiss.subscribe(() => ref.close());
    };

    this.hotkeys.registerHelpModal(helpFcn);

    this.hotkeys
      .addShortcut({
        keys: 'meta.g',
        element: this.input.nativeElement,
        description: 'Go to Code',
        group: 'Repositories'
      })
      .subscribe(e => console.log('Go to Code', e));

    this.hotkeys
      .addShortcut({
        keys: 'control.f',
        element: this.input2.nativeElement,
        description: 'Go to Issues',
        group: 'Repositories'
      })
      .subscribe(e => console.log('Go to Issues', e));

    this.hotkeys
      .addShortcut({
        keys: 'shift.r',
        description: 'Jump to line',
        group: 'Source code browsing'
      })
      .subscribe(e => console.log('Source code browsing', e));

    this.hotkeys
      .addShortcut({
        keys: 'meta.k',
        description: 'Go to notifications',
        group: 'Site-wide shortcuts'
      })
      .subscribe(e => console.log('Go to notifications', e));
  }

  handleHotkey(e: KeyboardEvent) {
    console.log('New document hotkey', e);
  }
}
