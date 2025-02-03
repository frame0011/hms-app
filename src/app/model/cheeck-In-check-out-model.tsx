// src/models/CheckInCheckOut.model.ts

export class CheckInCheckOut {
  id: number;
  userName: string;
  date: Date;
  startTime: string;
  endTime: string;
  isHoliday?: boolean;
  isleave?: boolean;
  project: string;
  workingHours: number;
  reason?: string;

  constructor(
    id: number,
    userName: string,
    date: Date,
    startTime: string,
    endTime: string,
    isHoliday: boolean,
    isleave: boolean,
    project: string,
    workingHours: number,
    reason?: string
  ) {
    this.id = id;

    this.userName = userName;
    this.project = project;
    this.startTime = startTime;
    this.endTime = endTime;
    this.isHoliday = isHoliday;
    this.isleave = isleave;
    this.workingHours = workingHours;
    this.date = date;
    this.reason = reason;
  }
}
