import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class UIButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() href?: string;
  @Input() routerLink?: string | any[];
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
