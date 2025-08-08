import { Component, signal } from "@angular/core";

import { Card } from "./card/card";
import { DataService } from "./data";
import { Job } from "./job";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Card],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("job-listing");
  list: Job[] = [];
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.list = this.dataService.getJobs(); // Call service method
  }
}
