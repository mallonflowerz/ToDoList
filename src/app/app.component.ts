import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { FirebaseConfigService } from './services/firebase.config.service';

@Component({
  selector: 'app-root',
  imports: [IonApp, IonRouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private configService: FirebaseConfigService) { }

  ngOnInit(): void {
    this.configService.loadInit();
  }

}
