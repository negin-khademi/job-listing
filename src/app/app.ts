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
    if (!this.selectedItems.includes(items)) {
      this.selectedItems.push(items);
    }

    this.applyFilter();
  }

  removeItem(item: string) {
    this.selectedItems = this.selectedItems.filter((i) => i !== item);

    this.applyFilter(); // Reapply the filter after removing an item
  }

  applyFilter() {
    this.filterList = this.list.filter((job) => {
      // If no items are selected, return all jobs
      if (this.selectedItems.length === 0) return true;

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
}
