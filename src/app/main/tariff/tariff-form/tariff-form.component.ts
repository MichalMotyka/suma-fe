import {Component, Inject, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Tariff, TariffService} from "../../../tariff.service";
import {ComponentItem, ComponentService} from "../../../component.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Kontrahent} from "../../../service/kontrahent.service";

@Component({
  selector: 'app-tariff-form',
  templateUrl: './tariff-form.component.html',
  styleUrls: ['./tariff-form.component.css']
})
export class TariffFormComponent implements  OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) data: {component:Tariff,viewMode:boolean},private tariffService:TariffService,private componentService:ComponentService, private toaster:ToastrService,private dialog:MatDialog) {
    this.viewMode = data.viewMode;
    this.componentService.getAll().subscribe(value => {
      value.componentList.forEach(data => {
        if (data.active=='T') {
          this.todo.push(data.name)
          this.dic.push({id:data.id,name:data.name})
        }
      })

      if (data.viewMode){
        this.name = data.component.name;
        data.component.component_id.forEach(value => {
          this.dic.forEach(dic=>{
            if (dic.id == value){
              this.todo.forEach( (item, index) => {
                if(item === dic.name) this.todo.splice(index,1);
              });
              this.done.push(dic.name);
            }
          })
        })
      }
    });

  }

  todo:string[] = [];
  done:string[] = [];
  dic:{ id: number; name: string; }[]=[]
  viewMode: boolean;
  name: any;


  drop(event: CdkDragDrop<string[]>) {
    //TODO piority 3 uniemozliwianie przeciagania
    if (!this.viewMode) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }
  }

  ngOnInit(): void {

  }

  create() {
      let componentId:number[]=[];
      this.done.forEach(value => {
        this.dic.forEach(data=> data.name == value? componentId.push(data.id): null);
      })
      this.tariffService.create(new Tariff(0,"",this.name,componentId,"T")).subscribe(value => {
        if (value.status == 201){
          this.toaster.success("Pomyślnie utworzono taryfe","Sukces", {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: "decreasing"})
          this.dialog.closeAll();
        }else {
          this.toaster.error("Nie udało się utworzyć taryfy, obiekt już istnieje","Błąd", {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: "decreasing"
          })
        }
      })
  }
}
