import { ElementRef } from "@angular/core";

export interface Form {
    checkErrors(): boolean;
    resetErrors(): void;
    onSubmit(): void;
}