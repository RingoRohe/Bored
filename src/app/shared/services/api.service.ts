import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serviceUrl: string = 'http://www.boredapi.com/api/activity';
  private params: object = {
    participants: 4,
    price: null
  }

  constructor(private alertController: AlertController, private http: HttpClient) {
  }

  request(): Observable<any> {
    let httpParams: HttpParams = new HttpParams();
    Object.keys(this.params).map(key => {
      if (this.params[key]) {
        httpParams = httpParams.set(key, this.params[key]);
      }
    })
    return this.http.get(this.serviceUrl, {params: httpParams}).pipe(retry(3), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.presentAlert(errorMessage);
    return throwError(errorMessage);
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
