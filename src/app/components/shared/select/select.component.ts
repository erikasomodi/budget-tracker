// import { Component, Input } from "@angular/core";
// import { FormGroup } from "@angular/forms";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";

// @Component({
//   selector: "app-select",
//   templateUrl: "./select.component.html",
//   styleUrls: ["./select.component.scss"],
// })
// export class SelectComponent {
//   @Input() options: { key: string; value: string }[] = [];
//   @Input() optionsWithIcons: { key: string; value: string; icon: IconProp }[] =
//     [];
//   @Input() label = "";
//   @Input() controllerName!: string;
//   @Input() form!: FormGroup;
// }

import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
})
export class SelectComponent implements OnInit, OnDestroy {
  @Input() options: { key: string; value: string }[] = [];
  @Input() optionsWithIcons: { key: string; value: string; icon: IconProp }[] =
    [];
  @Input() label = "";
  @Input() controllerName!: string;
  @Input() form!: FormGroup;

  selectedIcon: IconProp | null = null;
  selectChangesSubscription?: Subscription;

  ngOnInit(): void {
    this.selectChangesSubscription = this.form
      .get(this.controllerName)
      ?.valueChanges.subscribe((value) => {
        const selectedOption = this.optionsWithIcons.find(
          (option) => option.key === value
        );
        this.selectedIcon = selectedOption ? selectedOption.icon : null;
      });
  }

  ngOnDestroy(): void {
    if (this.selectChangesSubscription) {
      this.selectChangesSubscription.unsubscribe();
    }
  }
}
