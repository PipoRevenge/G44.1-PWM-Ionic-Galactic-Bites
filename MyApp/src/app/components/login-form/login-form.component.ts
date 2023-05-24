import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/validators/password.validator';
import { Form } from 'src/app/models/form';
// import { AuthService } from 'src/app/services/database/firebase-auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  	selector: 'app-login-form',
  	templateUrl: './login-form.component.html',
  	styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements AfterViewInit {
	loginForm: FormGroup;

	email: HTMLElement;
	password: HTMLElement;
	
	constructor(private router: Router, private fb: FormBuilder,private userService: UserService) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, PasswordValidator.strong()]]
		});
	}

	ngAfterViewInit() {
		this.email = document.getElementById('email');
		this.password = document.getElementById('password');
		console.log(this.email);
		console.log(this.password);
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
				await this.userService.login(email, password).then(async (booleano) => {
					if (booleano) {
					await Swal.fire({
					title: '¡Inicio de sesión exitoso!',
					text: 'Bienvenido de vuelta.',
					icon: 'success'
				});
					} else {
					await Swal.fire({
					title: '¡Opss.. Parece que no estas registrado!',
					text: 'O te habras equivocado',
					icon: 'error'
				});
						
					}
				});
				
				this.router.navigate(['profile']);
			} catch (error) {
				if (!this.userService.emailExists(email)) {
					console.log('email doesn\'t exists');
					this.onError(this.email);
					await Swal.fire({
						title: 'Error',
						text: 'El correo electrónico no existe.',
						icon: 'error'
					});
				} else {
					console.log('password does not match');
					this.onError(this.password);
					await Swal.fire({
						title: 'Error',
						text: 'La contraseña no coincide.',
						icon: 'error'
					});
				}
			}

		let email: string = this.loginForm.value.email;
		let password: string = this.loginForm.value.password;
		try {
			this.userService.login(email, password).then(
				async (booleano) => {
					if (booleano) this.router.navigate(['/profile']);
				}
			);
		} catch (error) {
			if (!this.userService.emailExists(email)) console.log('email doesn\'t exists');
			else console.log('password does not match');

		}
	}
}