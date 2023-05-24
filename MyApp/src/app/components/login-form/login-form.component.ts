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
export class LoginFormComponent implements Form, AfterViewInit {
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

	onError(input: HTMLElement): void {
		input.style.boxShadow = '0px 0px 10px rgb(255, 70, 92)';
	}
	
	checkErrors(): boolean {
		let errors: boolean = false;

		const controlEmail = this.loginForm.controls[Object.keys(this.loginForm.controls)[0]];
		const controlPassword = this.loginForm.controls[Object.keys(this.loginForm.controls)[1]];

		if (controlEmail.errors || controlPassword.errors) {
			errors = true;
			if (controlEmail.errors) this.onError(this.email);
			if (controlPassword.errors) this.onError(this.password);
		}

		return errors;
	}

	resetErrors(): void {
		document.getElementById('email').style.boxShadow = 'none';
		document.getElementById('password').style.boxShadow = 'none';
	}

	signUp(): void {
		this.router.navigate(['/signup']);
	}

	async onSubmit(): Promise<void> { 
		console.log(this.loginForm.value);

		this.resetErrors();
		if (!this.checkErrors()) {
			
			let email: string = this.loginForm.value.email;
			let password: string = this.loginForm.value.password;

			try {
				await this.userService.login(email, password).then(
					async (booleano) => {
						if (booleano) {
							await Swal.fire({
								title: '¡Inicio de sesión exitoso!',
								text: 'Bienvenido de vuelta.',
								icon: 'success'
							});
							this.router.navigate(['/profile']);
						} else await Swal.fire({
							title: '¡Opss.. Parece que no estas registrado!',
							text: 'O te habras equivocado',
							icon: 'error'
						});
					}
				);
			
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
		}
	}
}