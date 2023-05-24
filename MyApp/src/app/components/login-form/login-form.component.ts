import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/validators/password.validator';
// import { AuthService } from 'src/app/services/database/firebase-auth.service';
import { UserService } from 'src/app/services/user/user.service';
// import Swal from 'sweetalert2';

@Component({
  	selector: 'app-login-form',
  	templateUrl: './login-form.component.html',
  	styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
	loginForm: FormGroup;
	
	constructor(private router: Router, private fb: FormBuilder,private userService: UserService) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, PasswordValidator.strong()]]
		});
	}
	
	checkErrors(): boolean {
		let errors: boolean = false;

		const controlEmail = this.loginForm.controls[Object.keys(this.loginForm.controls)[0]];
		const controlPassword = this.loginForm.controls[Object.keys(this.loginForm.controls)[1]];

		if (controlEmail.errors || controlPassword.errors) errors = true;

		return errors;
	}


	signUp(): void {
		this.router.navigate(['/signup']);
	}

	onSubmit(): void { 
		console.log(this.loginForm.value);
		if (this.checkErrors()) return;
			
		let email: string = this.loginForm.value.email;
		let password: string = this.loginForm.value.password;

		try {
			this.userService.login(email, password).then(
				(booleano) => {
					if (booleano) this.router.navigate(['/profile']);
				}	
			);
		} catch (error) {
			if (!this.userService.emailExists(email)) console.log('email doesn\'t exists');
			else console.log('password does not match');
		}
	}
}