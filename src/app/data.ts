import { Injectable } from "@angular/core";
import { Job } from "./job";
import data from "../data.json";

@Injectable({
  providedIn: "root",
})
export class DataService {
  jobList: Job[] = data;
  getJobs(): Job[] {
    return this.jobList;
  }
}
