import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../create-topic/create-topic.component";
import {MessageService} from "../message/message.service";

@Component({
  selector: 'app-create-topic-dialog',
  templateUrl: './create-topic-dialog.component.html',
  styleUrls: ['./create-topic-dialog.component.scss']
})
export class CreateTopicDialogComponent implements OnInit {
  errorMessage:string = "";

  constructor(
    public dialogRef: MatDialogRef<CreateTopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject(MessageService) private message: MessageService
  ) {}

  onNoClick(): void {
    this.dialogRef.close({state: "failure"});
  }

  onOk(): void {
    this.message.sendMessage("saveNewTopic", {nom : this.data.nom, idcour : this.data.idcour}).subscribe(
      res => {
        if(res["status"] === "error") {
          console.log("error : ", res["data"]["reason"]);
          this.errorMessage = res["data"]["reason"];
        }
        else {
          console.log(res["data"]);
          this.dialogRef.close({state: "success", data : res["data"]});
        }
      }
    )
  }

  ngOnInit(): void {
  }
}
