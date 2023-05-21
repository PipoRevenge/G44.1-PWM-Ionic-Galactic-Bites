import { ElementRef, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";

export interface MultiForm {
    onError(input: ElementRef): void;
    checkErrors(form: FormGroup, inputs: QueryList<ElementRef>): boolean;
    resetErrors(): void;
}