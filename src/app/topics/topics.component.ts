import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "../message/message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {Topicdata} from "../interfaces/topicdata";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {BreadcrumbData} from "../breadcrums/breadcrums.component";

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  breadcrumb!: BreadcrumbData[];
  idcour !: string | null;

  displayedColumns: string[] = ['nom', 'nbPost', 'd_last_mess'];
  dataSource = new MatTableDataSource<Topicdata>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private message : MessageService, private route : ActivatedRoute, private router : Router,
              private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.idcour = this.route.snapshot.paramMap.get('id');
    this.message.sendMessage("getTopics", {"idcour" : this.idcour}).subscribe(
      res => {
        if (res["status"] === "error") {
          console.log("error");
          console.log(res["data"]["reason"]);
          this.router.navigateByUrl('login');
        }
        else {
          console.log(res["data"]);
          this.dataSource.data = res["data"][0];
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.breadcrumb = [{nom: 'cours', route: '/cours'},
            {nom: res["data"][1], route: ''}]
        }
      }
    )
  }

  onNewTopic(Topic: Topicdata) {
    const data = this.dataSource.data;
    data.push(Topic);
    this.dataSource.data = data;
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
