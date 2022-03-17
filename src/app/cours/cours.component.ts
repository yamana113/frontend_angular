import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "../message/message.service";
import {Coursdata} from "../interfaces/coursdata";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})
export class CoursComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'nbTopics', 'nbPost', 'd_last_mess'];
  dataSource = new MatTableDataSource<Coursdata>();
  // dataSource : Coursdata[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private message : MessageService, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.message.sendMessage("getCourses", {}).subscribe(
      res => {
        if (res["status"] === "error") {
          console.log("error");
          console.log(res["data"]["reason"]);
        }
        else {
          console.log(res["data"]);
          this.dataSource.data = res["data"];
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    )
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
