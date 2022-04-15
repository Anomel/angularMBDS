import { Component, OnInit } from '@angular/core';
import {AssignmentService} from '../../shared/assignment.service';
import {Router} from '@angular/router';
import {Assignment} from '../assignment.model';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnInit {
  // Champs du formulaire
  nomAssignment = "";
  msg = "";
  isAddded = false;
  peupler = false;
  dateDeRenduAssignment!: Date;

  constructor(
      private assignmentsService: AssignmentService,
      public authService: AuthService,
      private router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.authService.loggedIn) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    console.log(this.nomAssignment);
    console.log(this.dateDeRenduAssignment);

    let newAssignment = new Assignment();
    newAssignment.id = Math.round(Math.random() * 1000000); // id entier entre 0 et 1M
    newAssignment.nom = this.nomAssignment;
    newAssignment.dateDeRendu = this.dateDeRenduAssignment;
    newAssignment.rendu = false;

    this.assignmentsService.addAssignment(newAssignment)
        .subscribe(reponse => {
          console.log(reponse);
          this.isAddded = true
          // on doit naviguer vers l'URL qui affiche la liste ("" ou "/home")
          // on doit naviguer par programme
          // on retourne à la page d'accueil
        })
  }

  peuplerBD() {
    this.assignmentsService.peuplerBDAvecForkJoin()
        .subscribe(() => {
          // on peut alors afficher la liste
          this.peupler = true;
        })
  }
}
