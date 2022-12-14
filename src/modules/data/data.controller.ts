import { Controller, Get } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('/schools')
  getAllSchools() {
    return this.dataService.getAllSchools();
  }

  @Get('/subjects')
  getAllSubjects() {
    return this.dataService.getAllSubjects();
  }
}
