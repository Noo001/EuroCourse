import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataService } from '../data.service';

export class Item{
  currentValue?: number
  currentSourceNumber: number | string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {

  items: Item[] = [];

  private interval = 1;
  private num = this.data.getHostsLength; // количество заданных источников
  private availability: boolean = true;
  
  constructor(
    private titleService: Title,
    private data: DataService
  ){ }

  ngOnInit(){
    this.surveySources();
  }

  private surveySources(){
    let timerId = setInterval( () => { 
      this.titleService.setTitle('До следующего запроса: ' + this.interval); 
      if (this.interval <= 0) { 
        if( this.availability == false ){ // Источник недоступен 10 секунд! Меняем
          this.sourceNotAllowed(timerId);
        } else {         
          this.sourceAllowed();
        }
      }
      this.interval--;
    }, 1000);
  }

  private sourceNotAllowed(timerId){
    let item = new Item;
    item.currentSourceNumber = `Источник номер ${this.data.getI} недоступен!`;
    item.currentValue = null;
    this.items.push(item);
    this.interval = 10;

    this.data.incI();
    this.availability = true;
    if(this.data.getI >= this.num){ // Источники закончились
      clearInterval(timerId);
    }
  }

  private sourceAllowed(){
    let item = new Item;
    this. availability = false;
    this.data.getCourse().subscribe( 
      (request) => {
        this.interval = 10;
        this.availability = true;
        item.currentSourceNumber = this.data.getI;
        switch( this.data.getHostsType ){
          case "xml": item.currentValue = this.data.getXml(request); break;
          case "json": item.currentValue = this.data.getOther(request); break;
        }
        this.items.push(item);
      });
  }

  
}