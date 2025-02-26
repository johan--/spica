import {TemplateRef} from "@angular/core";

export interface MatAwareDialogOptions {
  title: string;
  templateOrDescription: TemplateRef<any> | string;
  answer: string;
  answerHint?: string;
  confirmText?: string;
  cancelText?: string;
}
