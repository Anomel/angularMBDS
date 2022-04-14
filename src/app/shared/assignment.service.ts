import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import {LoggingService} from './logging.service';
import {bdInitialAssignments} from './data';
import {Assignment} from '../assignment/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  assignments: Assignment[] = [];

  constructor(
      private loggingService: LoggingService,
      private http: HttpClient
  ) {
    this.loggingService.setLoggingLevel(1);
  }

  url = 'http://localhost:8010/api/assignments';
  // url = 'https://apimbds2022.herokuapp.com/api/assignments';

  getAssignments(page: number, limit: number): Observable<any> {
    // return of(this.assignments);
    return this.http.get<any>(`${this.url}?page=${page}&limit=${limit}`);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    // on doit mettre | undefined si jamais l'élément n'existe pas
    // let a:Assignment|undefined = this.assignments.find(a => a.id === id);

    // return of(a);

    return this.http.get<Assignment>(this.url + '/' + id).pipe(
        tap((a) => {
          console.log(a.nom + ' avant modification');
          return a;
        }),
        map((a) => {
          a.nom += ' MODIFIE PAR LE PIPE';
          return a;
        }),
        catchError(
            this.handleError<any>(
                '### catchError: getAssignments by id avec id=' + id
            )
        )
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  addAssignment(assignment: Assignment): Observable<any> {
    //this.assignments.push(assignment);

    this.loggingService.log(assignment, 'ajouté');
    //return of("Assignment ajouté");
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    // pour le moment rien besoin de faire... ca marche tel quel
    // plus tard envoyer requête HTTP PUT sur web service pour update d'une base de données...

    this.loggingService.log(assignment, 'modifié');

    return this.http.put<Assignment>(this.url, assignment);

    // return of("Assignment Modifié");
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    /*
    const pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);*/

    this.loggingService.log(assignment, 'supprimé');

    // return of("Assignment Supprimé");

    return this.http.delete(this.url + '/' + assignment._id);
  }

  peuplerBD() {
    bdInitialAssignments.forEach((a) => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      this.addAssignment(nouvelAssignment).subscribe((reponse) => {
        console.log(reponse.message);
      });
    });
  }

  // moins naive, permet d'attendre qu'elle ait terminé ses 1000 requêtes
  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment: any[] = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment: any = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }
}
