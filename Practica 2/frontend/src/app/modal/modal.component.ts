import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../environment';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  @Input() public report = '';

  id = '';
  name = '';
  course = '';
  description = '';
  date = '';
  user = '';
  server_name = '';

  api = environment.apiURL;
  constructor(public activeModal: NgbActiveModal, private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.api);
    if (this.report != '') {
      // Obtain the list of reports
      const url = `${this.api}/getReporte`;
      const body = { searchID: this.report };
      this.http.post<any>(url,body, {
        //params: new HttpParams().set('report', this.report)
      }).subscribe(data => {
        console.log(data.data);
        var server = data.server;
        data = data.data[0];
        this.id = data.carnet;
        this.name = data.nombre;
        this.course = data.curso;
        this.description = data.cuerpo;
        this.date = data.fecha;
        this.user = data.obtenido_por;
        this.server_name = server;
      });
    }
  }

  addReport() {
    const url = `${this.api}/crearReporte`;
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    const body = { carne: this.id, nombre: this.name, curso: this.course, cuerpo: this.description };
    this.http.post<any>(url, body, { headers }).subscribe(data => {
      alert("Añadido correctamente");
    });

    this.ngOnInit();
  }
}
