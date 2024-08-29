import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: "app-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
})
export class SelectComponent {
  @Input() options: { key: string; value: string }[] = [];
  @Input() optionsWithIcons: { key: string; value: string; icon: IconProp }[] =
    [];
  @Input() label = "";
  @Input() controllerName!: string;
  @Input() form!: FormGroup;
}
