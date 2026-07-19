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
  ];

  select(color: string) {
    this.value = color;
    this.valueChange.emit(color);
  }

}
