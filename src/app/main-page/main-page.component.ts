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
  
  constructor(
    private titleService: Title,
    private data: DataService
  ){ }

  ngOnInit(){
    let i = 1;
    let num = this.data.getHostsLength; // количество заданных источников
    let availability: boolean = true;

    let timerId = setInterval( () => { 
      this.titleService.setTitle('До следующего запроса: ' + i); 

      if (i <= 0) { //
        let item = new Item;

        if( availability == false ){ // Источник недоступен 10 секунд! Меняем
          item.currentSourceNumber = `Источник номер ${this.data.getI} недоступен!`;
          item.currentValue = null;
          this.items.push(item);

          this.data.incI;
          availability = true;
          if(this.data.getI >= num){ // Источники закончились
            clearInterval(timerId);
          }
        } else {         
          availability = false;
          i = 10;
          this.data.getCourse().subscribe( 
            (request) => {
              availability = true;
              item.currentSourceNumber = this.data.getI;
              switch( this.data.getHostsType ){
                case "xml": item.currentValue = this.data.getXml(request); break;
                case "json": item.currentValue = this.data.getOther(request); break;
              }
              this.items.push(item);
            });
        }
      }
      i--;
    }, 1000);
    
  }

  
}