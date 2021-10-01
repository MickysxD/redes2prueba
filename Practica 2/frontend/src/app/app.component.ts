import { Component } from '@angular/core';
import { ModalComponent } from './modal/modal.component'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from './environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  searchID = '';
  server_name = '';
  data: any = [];
  
  api = environment.apiURL;
  constructor(private modalService: NgbModal, private http: HttpClient) { }

  ngOnInit() {
    this.search_report();
  }

  search_report() {
    // Obtain the list of reports
    const url = `${this.api}/getReportes`;
    const body = { searchID: this.searchID };
    this.http.post<any>(url,body, {
      //params: new HttpParams().set('searchID', this.searchID)
    }).subscribe(data => {
      this.data = data.data;
      this.server_name = data.server;
    });
  }

  get_report(report: string) {
    // Obtain the report
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.report = report;
    modalRef.result.then((result) => {
      this.search_report();
    }).catch((error) => {
      console.log(error);
    });
    
  }

  add_report() {
    // Add a new Report
    const modalRef = this.modalService.open(ModalComponent);

    modalRef.result.then((result) => {
      this.search_report();
    }).catch((error) => {
      console.log(error);
    });
  }
}
