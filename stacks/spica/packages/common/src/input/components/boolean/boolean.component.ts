import {Component, forwardRef, HostListener, Inject} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

import {INPUT_SCHEMA, InputSchema} from "../../input";

@Component({
  templateUrl: "./boolean.component.html",
  styleUrls: ["./boolean.component.scss"],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => BooleanComponent)}]
})
export class BooleanComponent implements ControlValueAccessor {
  value: boolean;
  disabled: boolean = false;
  _onChangeFn: any;
  _onTouchedFn: any;

  constructor(@Inject(INPUT_SCHEMA) public schema: InputSchema) {}

  @HostListener("click")
  callOnTouched(): void {
    if (this._onTouchedFn) {
      this._onTouchedFn();
    }
  }

  callOnChange() {
    if (this._onChangeFn) {
      this._onChangeFn(this.value);
    }
  }

  writeValue(val: boolean): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this._onChangeFn = fn;
    if (this.value == null) {
      this._onChangeFn(false);
    }
  }

  registerOnTouched(fn: any): void {
    this._onTouchedFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
