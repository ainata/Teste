import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { log } from 'console';
import { AuthService } from '../auth.service';
import { NotificationService } from '../../core/service/notification/notification.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { catchError, EMPTY, of } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  singInForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router,
  ){
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.singInForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  signIn() {
    if (this.singInForm.valid) {
      const formValues = this.singInForm.getRawValue();
      this.authService.signIn(formValues)
      .pipe(
        catchError(error => {
          this.notification.error('Error signing in');
          return EMPTY;
        })
      )
      .subscribe(data => {
        this.notification.success('sign in successful');
        console.log('Attempting to navigate to /dashboard');
        this.router.navigate(['/dashboard']);
        sessionStorage.setItem('token', data['token']);
      })

    }
    else {
      console.log('form not valid');

    }
  }

}
