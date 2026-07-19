import { inject, Injectable } from '@angular/core';
import { fetchAndActivate, getValue, RemoteConfig } from '@angular/fire/remote-config';

@Injectable({
  providedIn: 'root',
})
export class FirebaseConfigService {

  private remoteConfig = inject(RemoteConfig);

  constructor() {
    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 60000,
      fetchTimeoutMillis: 10000
    };
  }

  async loadInit() {
    await fetchAndActivate(this.remoteConfig);
  }

  getCategoryActive() {
    return getValue(this.remoteConfig, "activeCategory").asBoolean();
  }
}
