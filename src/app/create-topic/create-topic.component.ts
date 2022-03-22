import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreateTopicDialogComponent} from "../create-topic-dialog/create-topic-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Topicdata} from "../interfaces/topicdata";

export interface DialogData {
  nom : string,
  idcour : number
}

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
  nom !: string;
  @Input() idcour !: string | null;
  @Output() newTopic = new EventEmitter<Topicdata>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClick() {
     console.log("clicked");
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTopicDialogComponent, {
      width: '50%',
      data: {nom: this.nom, idcour: this.idcour},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if(result["state"] === "success") {
        const Topic = result["data"];
        this.newTopic.emit(Topic);
        this.nom = result["data"]["nom"];
      }
    });
  }
}
