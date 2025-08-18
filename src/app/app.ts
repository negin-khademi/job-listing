import { Component, signal } from "@angular/core";

import { CommonModule } from "@angular/common";
import { Card } from "./card/card";
import { DataService } from "./data";
import { Job } from "./job";

@Component({
  selector: "app-root",
  imports: [Card, CommonModule],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("job-listing");
  list: Job[] = [];
  filterList: Job[] = [];
  selectedItems: any[] = [];
  constructor(private dataService: DataService) {
    // Check if the user prefers dark mode
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Apply the 'dark' class to <html> or <body> based on system preference
    if (prefersDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
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

  clearAll() {
    this.selectedItems = [];
    this.applyFilter();
  }
}
