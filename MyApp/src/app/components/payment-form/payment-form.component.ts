import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Form } from 'src/app/models/form';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { UserService } from 'src/app/services/user/user.service';
import { CreditCardValidator } from 'src/app/validators/credit-card.validator';

@Component({
    selector: 'app-payment-form',
    templateUrl: './payment-form.component.html',
    styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements Form {
    paymentForm: FormGroup;

    @ViewChildren('input') inputs!: QueryList<ElementRef>; 
        
    constructor(private router: Router, private fb: FormBuilder, private shoopingServices:ShoppingCartService,private  userservices:UserService) {
        this.paymentForm = this.fb.group({
            num: ['', [Validators.required, CreditCardValidator.number()]],
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40), CreditCardValidator.nameOnCard()]],
            date: ['', [Validators.required, CreditCardValidator.date()]],
            cvv: ['', [Validators.required, CreditCardValidator.cvv()]],
            address: ['', [Validators.required, Validators.minLength(4)]]
        })
    } 

    onError(input: ElementRef): void {
        input.nativeElement.style.boxShadow = '0px 0px 10px rgb(255, 70, 92)';
    }
    
    checkErrors(): boolean {
        let errors: boolean = false;

		this.inputs.forEach((input, index) => {
			const control = this.paymentForm.controls[Object.keys(this.paymentForm.controls)[index]];

			if (control.errors) {
				this.onError(input);
				errors = true;
			}
		});

		return errors;
    }

    resetErrors(): void {
        this.inputs.forEach((input) => {
			input.nativeElement.style.boxShadow = 'none';
		});
    }

    onSubmit(): void {
        console.log(this.paymentForm.value);
        if ((this.userservices.getUserPoints() - this.shoopingServices.getTotalPoints()) > 0) {
            this.userservices.setPoints(this.shoopingServices.getPoints()).then(() => {
             Swal.fire({
                title: '¡Compra realizada con éxito!',
                text: 'Has ganado ' + this.shoopingServices.getPoints() + ' puntos',
                icon: 'success'
             })
             this.shoopingServices.clear();
             this.router.navigate(['']);
        })

        }else {
            Swal.fire({
                title: 'Puntos insuficientes',
                text: 'No tienes suficientes puntos para completar la compra.',
                icon: 'error'
            });
        }
    }
}