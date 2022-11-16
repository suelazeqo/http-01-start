import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";
import {Post} from "./post.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request

    this.http.post(
      'https://first-app-fd79e-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {postData}).subscribe(responseData => {
          console.log(responseData)
    })
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts()
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.http.get('https://first-app-fd79e-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
      .pipe(
        map((responseData) => {
          const postsArray = [];
          for (const key in responseData){
            if(responseData.hasOwnProperty(key)){
              postsArray.push({...responseData[key].postData, id: key})
            }
          }
          return postsArray;
        })
      )
      .subscribe(posts => {
        this.loadedPosts = posts;
      })
  }
}
