import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { parseString } from 'xml2js'; // библиотека для парсинга xml

import { Hosts } from './config/hosts';

@Injectable()
export class DataService{
  private hostings = (new Hosts).host;
  private i: number = 0;

  constructor(
    private http: HttpClient
  ){}

  private getItems(responseType): Observable<any> {
    return this.http.get<any>('https://cors-anywhere.herokuapp.com/'+this.hostings[this.i].name, { responseType: responseType});
  }

  getXml(xml): number {
    let ret: string;
    parseString(xml, (err, result) => { ret = eval('result'+this.hostings[this.i].path)});
    return parseFloat(ret);
  }

  getOther(str){
    let ret = eval('str.'+this.hostings[this.i].path); 
    return parseFloat(ret);
  }

  getCourse(): Observable<any>{
    let ret: Observable<any>;
    switch( this.hostings[this.i].type){
      case "xml": ret = this.getItems('text'); break;
      case "json": ret = this.getItems('json'); break;
    }
    return ret;
  }

  get getHostsLength(): number{
    return this.hostings.length;
  }

  get getI(): number{
    return this.i;
  }

  incI(){ 
    this.i++; 
  }

  get getHostsType(): string {
    return this.hostings[this.i].type;
  }
  
}