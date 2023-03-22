import {Injectable} from '@angular/core';
import {CountryCreateResponse} from "./main/administrator/country-list/country-form/country-form.component";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject, Observable, Subscriber, Subscription} from "rxjs";
import {environment} from "../environments/environment";


export  interface  Countries{
  countries:CountryItem[];
}

export interface CountryItem {
  id: number;
  name: string;
  prefix: string;
  postMask: string;
  gusMask: string;
  active:string;
}
export class CountryItem implements CountryItem{
  constructor(id: number, name: string, prefix: string, gusMask: string, postMask: string,active:string) {
    this.id = id;
    this.name = name;
    this.prefix = prefix
    this.gusMask = gusMask;
    this.postMask = postMask;
    this.active = active;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  data!: CountryItem[];
  url:string = "http://localhost:8080/api/v1/country/list"
  row?:CountryItem;

  constructor(private http: HttpClient, private toaster: ToastrService) { }


  addData(value: CountryItem) {
    this.http.put<CountryCreateResponse>("http://localhost:8080/api/v1/country/create", value).subscribe(data => {
      if (data.status == 201) {
        this.toaster.success("Pomyślnie dodano kraj do słownika", "Sukces", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        });

        return true;
      }else{
        this.toaster.error("Nie udało się utworzyć zasobu ponieważ widnieje już w słowniku", "Błąd", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        });
        return false;
      }
    })
  }
  getDataById(id:number){
    this.data.find((obj)=> {
      return obj.id === id+0
    })

  }
  delete(data:any){
    let countryItem: CountryItem = new CountryItem(data.id, data.name, data.prefix, data.gusMask, data.postMask, data.active)
    this.http.delete<CountryCreateResponse>("http://localhost:8080/api/v1/country/delete",{body:countryItem}).subscribe(response=>{
      if (response.status == 202){
          this.toaster.success("Pomyślnie usunięto kraj z słownika", "Sukces", {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: "decreasing"
          });
        }else{
          this.toaster.error("Nie usunięto kraj z słownika", "Błąd", {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: "decreasing"
          });
        }
      }
    )
  }
  getAllData(){
    return this.http.get<Countries>(this.url);
  }
  getByName(name:String){
    return this.http.get<CountryItem>(`${environment.url}/api/v1/country/get?id=`+name)
  }
  search(name:String){
    return this.http.get<Countries>(`${environment.url}/api/v1/country/search?name=`+name)
  }


}
