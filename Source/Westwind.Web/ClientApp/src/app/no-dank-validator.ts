import { FormControl } from "@angular/forms";

export function noDankValidator(control: FormControl) {

  if (control && control.value && control.value.indexOf("dank") != -1) {
    return { "nodank": true };
  }
  return null;
}
