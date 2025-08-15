import { Component, signal } from "@angular/core";

import { Card } from "./card/card";
import { CommonModule } from "@angular/common";
import { DataService } from "./data";
import { Job } from "./job";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Card, CommonModule],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("job-listing");
  list: Job[] = [];
  filterList: Job[] = [];
  selectedItems: any[] = [];
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.list = this.dataService.getJobs(); // Call service method
    this.filterList = this.list;
  }

  updateSelectedItems(items: any) {
    // this.filterList = this.list.filter(
    //   (itm) => itm.level === items || itm.role === items
    // );

    this.filterList = this.list.filter((job) => {
      if (!this.selectedItems.includes(items)) {
        this.selectedItems.push(items);
      }

      // Check if every selected item matches any of the job's properties
      return this.selectedItems.every(
        (selected) =>
          job.role === selected ||
          job.level === selected ||
          job.languages.includes(selected) ||
          job.tools.includes(selected)
      );
    });
  }

  removeItem(item: string) {
    this.selectedItems = this.selectedItems.filter((i) => i !== item);
  }
}
