import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonFab,
    IonFabButton,
    IonIcon,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonText,
    IonButton
} from '@ionic/angular/standalone';

@NgModule({
    declarations: [],
    imports: [
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonFab,
        IonFabButton,
        IonIcon,
        IonItemSliding,
        IonItemOptions,
        IonItemOption,
        IonText,
        IonButton
    ],
    exports: [
        CommonModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonFab,
        IonFabButton,
        IonIcon,
        IonItemSliding,
        IonItemOptions,
        IonItemOption,
        IonText,
        IonButton
    ]
})
export class IonicComponentsModule { }
