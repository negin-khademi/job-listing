import { Component, Input } from "@angular/core";

import { Job } from "../job";

@Component({
  selector: "app-card",
  imports: [],
  templateUrl: "./card.html",
  styleUrl: "./card.scss",
})
export class Card {
  @Input({ required: true }) jobItems!: Job;
}
