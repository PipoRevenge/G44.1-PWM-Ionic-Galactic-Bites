import { ElementRef } from "@angular/core";

export interface Form {
    onError(input: ElementRef): void;
    checkErrors(): boolean;
    resetErrors(): void;
    onSubmit(): void;
}