import { Component } from '@angular/core';

@Component({
  selector: 'app-examens-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  model = {
    nom: ''
  };

  submitForm() {
    console.log('Formulaire soumis pour examens :', this.model);
  }
}