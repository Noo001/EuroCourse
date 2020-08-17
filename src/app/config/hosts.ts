import { HostInterface } from './host-interface'

// enter list of hosts here
export class Hosts implements HostInterface {
  host = [
    {
      name: 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml',
      path: "['gesmes:Envelope'].Cube[0].Cube[0].Cube[14]['$'].rate",
      type: 'xml'
    },
    {
      name: 'https://www.cbr-xml-daily.ru/daily_json.js',
      path: 'Valute.EUR.Value',
      type: 'json'
    }
  ]; 
}