import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'hello-client';
  public todo;

  public list = [{_id: 1, todo: 'A'}, {_id: 1, todo: 'B'}];
  constructor(public http: HttpClient) {}

  public async ngOnInit() {
    const url = 'http://localhost:3000/';
    const docs: any = await this.http.get(url).toPromise();
    this.list = docs;
  }


  public async delete(item) {
    console.log(item);
    const url = 'http://localhost:3000/';
    await this.http.request('delete', url, {body : item}).toPromise();

    const docs: any = await this.http.get(url).toPromise();
    this.list = docs;
  }


  public async create() {
    const url = 'http://localhost:3000/';
    const body = {
      todo : this.todo
    };
    await this.http.post(url, body).toPromise();

    const docs: any = await this.http.get(url).toPromise();
    this.list = docs;

    this.todo = '';
  }
}
