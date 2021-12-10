import {Component, OnInit} from '@angular/core';
import { io } from "socket.io-client";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'assessmentAngular';
  displayedColumns: string[] = ['Name', 'Symbol', 'slug', 'num_market_pairs', 'max_supply', 'circulating_supply', 'total_supply'];
  dataSource:any;
   socket = io('http://localhost:3002');

  constructor(private http: HttpClient) {
  }

  ngOnInit(){
    console.log(' inside ngOnInit')
    this.socket.on('connect', () =>{
      console.log(" inside connect")
      this.socket.on('message',(data)=>{
        console.log('inside message', data)
        this.dataSource = data;
      })
    });
    this.getRepos().subscribe(res=>{
      console.log(" inside the getRepos", res)
      this.dataSource = res
    })

  }

  getRepos(): Observable<any> {
    return this.http.get('http://localhost:3002/crypto')
  }

}


