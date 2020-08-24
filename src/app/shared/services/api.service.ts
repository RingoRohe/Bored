import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serviceUrl: string = 'https://www.boredapi.com/api/activity';

  constructor(private alertController: AlertController, private http: HttpClient) {
  }

  /**
   * Sends a GET Request to the bored-API.
   * @param p An Object of GET Parameters to send with the Request
   */
  request(p?: Object): Observable<any> {
    const params = { ...p };
    let httpParams: HttpParams = new HttpParams();
    Object.keys(params).map(key => {
      if (params[key]) {
        httpParams = httpParams.set(key, params[key]);
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
    // TODO: "this.presentAlert is not a Function"
    // this.presentAlert(errorMessage);
    return throwError(errorMessage);
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
