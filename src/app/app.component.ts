import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface Article {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: Source;
  title: string;
  url: string;
  urlToImage: string;
}

export class AppSettings {

  public static SOURCE_LIST = [{ item_id: 1, item_text: 'top', item_code: '/top-headlines?' },
  { item_id: 2, item_text: 'all', item_code: '/everything?' }];

  public static COUNTRY_LIST = [{ item_id: 1, item_text: 'Poland', item_code: 'pl' },
  { item_id: 2, item_text: 'Ukraine', item_code: 'ua' },
  { item_id: 3, item_text: '??????', item_code: 'ru' },
  { item_id: 4, item_text: 'USA', item_code: 'us' }];

  public static CATEGORY_LIST = [{ item_id: 1, item_text: 'General' },
  { item_id: 2, item_text: 'Entertainment' },
  { item_id: 3, item_text: 'Business' },
  { item_id: 4, item_text: 'Health' },
  { item_id: 5, item_text: 'Science' },
  { item_id: 6, item_text: 'Sports' },
  { item_id: 7, item_text: 'Technology' }]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  source = AppSettings.SOURCE_LIST[0].item_code;
  maxArticles = 1;
  currPageSize = 1;
  currCountry = AppSettings.COUNTRY_LIST[0].item_code;
  currCategory = AppSettings.CATEGORY_LIST[0].item_text;
  dropdownCountryList = {} as any;
  dropdownCategoryList = {} as any;
  dropdownSourcesList = {} as any;
  items = new Array<Article>();
  errorMsg: string = "";

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.dropdownSourcesList = AppSettings.SOURCE_LIST;
    this.dropdownCountryList = AppSettings.COUNTRY_LIST;
    this.dropdownCategoryList = AppSettings.CATEGORY_LIST;
    this.getNews();
  }

  getNews(): void {
    var headers: string = 'https://newsapi.org/v2' + this.source + 'country=' + this.currCountry +
      '&apiKey=' + '2b0d53a3d6b74c5dbdcda7cdf7b190bf' + '&pageSize=' + this.currPageSize + '&category=' + this.currCategory;

    this.httpClient.get("https://bond-cors-proxy.herokuapp.com/v1",
      {
        headers: new HttpHeaders({ url: headers })
      })
      .subscribe({
        error: (error: HttpErrorResponse) => { this.errorMsg = error.statusText; console.error(error) },
        complete: () => console.log("success!"),
        next: (data: any) => {
          this.maxArticles = data ? +data.totalResults : 0;
          this.items = data ? data.articles : [];
          this.errorMsg = data ? "ok" !== data.status ? data.message : "" : "";
        }
      });
  }

  geNextNews(): void {
    if (Number(this.currPageSize) < this.maxArticles) {
      this.currPageSize++;
      this.getNews();
    }
  }

  onSelectCountry(country: string): void {
    this.currCountry = country;
    this.currPageSize = 1;
    this.getNews();
  }

  onSelectCategory(category: string): void {
    this.currCategory = category;
    this.currPageSize = 1;
    this.getNews();
  }

  onSelectSource(source: string): void {
    this.source = source;
    this.dropdownCountryList = AppSettings.COUNTRY_LIST;
    this.dropdownCategoryList = AppSettings.CATEGORY_LIST;
  }
}