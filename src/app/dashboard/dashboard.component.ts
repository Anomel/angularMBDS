import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {Assignment} from '../assignment/assignment.model';
import {AssignmentService} from '../shared/assignment.service';
import {AuthService} from '../shared/auth.service';
import {SidebarComponent} from '../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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

    loggedIn = false;

    username = '';
    password = '';

    constructor(
        private assignmentsService: AssignmentService,
        public authService: AuthService
        ) {
        // console.log("dans le constructeur")
    }

    ngOnInit(): void {
        this.getAssignments();
        this.isLoggedIn();
    }

    isLoggedIn() {
        if (this.authService.loggedIn) {
            this.loggedIn = true;
        }
    }

    login() {
        this.loggedIn = this.authService.logIn(this.username, this.password);
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

                this.assignmentsService.getAssignments(this.page, data.totalDocs)
                    .subscribe((res) => {
                        for (let i = 0; i < res.docs.length; i++) {
                            if (res.docs[i].rendu) {
                                this.totalRendu++;
                            } else {
                                this.totalNonRendu++;
                            }
                        }
                    });
                // console.log("Données arrivées");
            });
    }

}
