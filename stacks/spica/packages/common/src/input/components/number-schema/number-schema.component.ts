import {Component, Inject} from "@angular/core";

import {INPUT_SCHEMA, InputSchema} from "../../input";

@Component({
  templateUrl: "./number-schema.component.html",
  styleUrls: ["./number-schema.component.scss"]
})
export class NumberSchemaComponent {
  constructor(@Inject(INPUT_SCHEMA) public schema: InputSchema) {
    this.schema.minimum = this.schema.minimum || undefined;
    this.schema.maximum = this.schema.maximum || undefined;
  }
}
