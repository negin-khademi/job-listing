import { Component, EventEmitter, Input, Output } from "@angular/core";

import { CommonModule } from "@angular/common";
import { Job } from "../job";

@Component({
  selector: "app-card",
  imports: [CommonModule],
  templateUrl: "./card.html",
  styleUrl: "./card.scss",
})
export class Card {
  @Input({ required: true }) jobItems!: Job;
  @Output() selectedItemChange = new EventEmitter<any[]>();

  selectItems(e: any) {
    this.selectedItemChange.emit(e);
  }
}
