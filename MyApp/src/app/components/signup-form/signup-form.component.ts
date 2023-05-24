import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/validators/password.validator';
import { PhoneValidator } from 'src/app/validators/phone.validator';
import { Form } from 'src/app/models/form';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements AfterViewInit {
	signupForm: FormGroup;

	name: HTMLElement;
	email: HTMLElement;
	tel: HTMLElement;
	password: HTMLElement;
	confirmPassword: HTMLElement;

	constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
		this.signupForm = this.fb.group ({
			name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
			email: ['', [Validators.required, Validators.email]],
			tel: ['', [Validators.required, PhoneValidator.validPhoneNumber()]],
			password: ['', [Validators.required, PasswordValidator.strong()]],
			confirmPassword: ['', [Validators.required, PasswordValidator.strong()]]
		});
	}

	ngAfterViewInit(): void {
		this.name = document.getElementById('name');
		this.email = document.getElementById('email');
		this.tel = document.getElementById('tel');
		this.password = document.getElementById('password');
		this.confirmPassword = document.getElementById('confirm-password');
	}

	checkErrors(): boolean {
		let errors: boolean = false;

		const controlName = this.signupForm.controls[Object.keys(this.signupForm.controls)[0]];
		const controlEmail = this.signupForm.controls[Object.keys(this.signupForm.controls)[1]];
		const controlTel = this.signupForm.controls[Object.keys(this.signupForm.controls)[2]];
		const controlPassword = this.signupForm.controls[Object.keys(this.signupForm.controls)[3]];
		const controlConfirmPassword = this.signupForm.controls[Object.keys(this.signupForm.controls)[4]];

		if (controlName.errors || controlEmail.errors || controlTel.errors || controlPassword.errors || controlConfirmPassword.errors) errors = true;
		return errors;
	}

	checkPasswords(): boolean {
		let match: boolean = false;

		if (this.signupForm.get('password')?.value == this.signupForm.get('confirmPassword')?.value) match = true;

		return match;
	}
	
	onSubmit() { 
		console.log(this.signupForm.value);
		let match: boolean = this.checkPasswords();
		if (this.checkErrors() || !match) return;
		
		let name: string = this.signupForm.value.name; 
		let email: string = this.signupForm.value.email;
		let password: string = this.signupForm.value.password;
		let tel: string = this.signupForm.value.tel;
		
		console.log('form:', name, email, password, tel);
		this.userService.signup(name, email, password, tel).then(
			(value: boolean) => {
				if (value) this.router.navigate(['/profile']);
			}
		);
	}	
}