import { Component, OnInit } from '@angular/core';
import {Assignment} from '../assignment.model';
import {AssignmentService} from '../../shared/assignment.service';

@Component({
  selector: 'app-rendu-assignment',
  templateUrl: './rendu-assignment.component.html',
  styleUrls: ['./rendu-assignment.component.scss']
})
export class RenduAssignmentComponent implements OnInit {
  titre = 'Application de gestion des assignments !';
  assignments: Assignment[] = [];
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu'];

  // pour la pagination
  page = 1;
  limit = 5;
  totalDocs = 0;
  totalPages = 0;
  hasPrevPage?: boolean;
  prevPage?: number;
  hasNextPage?: boolean;
  nextPage?: number;
  totalRendu = 0;
  totalNonRendu = 0;
  totalDelai = 0;
  dateToDay = new Date();

  constructor(private assignmentsService: AssignmentService) {
    // console.log("dans le constructeur")
  }

  ngOnInit(): void {
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentsService.getAssignments(this.page, this.limit)
        .subscribe((data) => {
          this.assignments = data.docs;
          this.page = data.page;
          this.totalDocs = data.totalDocs;
          this.totalPages = data.totalPages;
          this.hasPrevPage = data.hasPrevPage;
          this.prevPage = data.prevPage;
          this.hasNextPage = data.hasNextPage;
          this.nextPage = data.nextPage;

          console.log();
          // console.log("Données arrivées");
        });
  }

  OnPageChange(event) {
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAssignments();
    console.log(event);
  }
}
