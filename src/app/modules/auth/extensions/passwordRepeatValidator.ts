import { AbstractControl, ValidatorFn } from "@angular/forms";

export function equalFieldsValidator(fieldToCompare: any): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value === control.parent?.get(fieldToCompare)?.value) {
      return null;
    }

    return { equalFileds: false };
  };
}