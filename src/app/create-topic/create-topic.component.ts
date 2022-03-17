import {Component, Input, OnInit} from '@angular/core';
import {CreateTopicDialogComponent} from "../create-topic-dialog/create-topic-dialog.component";
import {MatDialog} from "@angular/material/dialog";

export interface DialogData {
  nom : string
}

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {
  nom !: string;
  @Input() idcour !: number;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClick() {
     console.log("clicked");
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTopicDialogComponent, {
      width: '50%',
      data: {nom: this.nom},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.nom = result;
    });
  }
}
