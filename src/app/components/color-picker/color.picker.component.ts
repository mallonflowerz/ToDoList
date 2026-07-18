import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color.picker.component.html',
  styleUrls: ['./color.picker.component.scss'],
  standalone: true,
})
export class ColorPickerComponent {

  @Input() value = 'primary';

  @Output() valueChange = new EventEmitter<string>();

  readonly colors = [
    { name: 'primary', color: '#0054e9' },
    { name: 'secondary', color: '#0163aa' },
    { name: 'tertiary', color: '#6030ff' },
    { name: 'success', color: '#2dd55b' },
    { name: 'warning', color: '#ffc409' },
    { name: 'danger', color: '#c5000f' },
    { name: 'dark', color: '#2f2f2f' },
    { name: 'medium', color: '#5f5f5f' },
    { name: 'light', color: '#f4f5f8' }
  ];

  select(color: string) {
    this.value = color;
    this.valueChange.emit(color);
  }

}
