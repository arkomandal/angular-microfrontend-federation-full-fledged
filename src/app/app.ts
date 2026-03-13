import { Component, signal, Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, NgComponentOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-microfrontend-federation-full-fledged');

  // holds a dynamically loaded component from a remote
  remoteComp = signal<Type<any> | null>(null);

  async openRemote(name: 'remote1' | 'remote2') {
    try {
      // The remote name is constrained to a known union, so dynamic import is safe.
      const m = await import(/* @vite-ignore */ `${name}/Component`);
      this.remoteComp.set(m.App);
    } catch (e) {
      console.error('failed to load remote', e);
    }
  }

  close() {
    this.remoteComp.set(null);
  }
}
