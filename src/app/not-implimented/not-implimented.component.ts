import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-not-implimented',
  templateUrl: './not-implimented.component.html',
  styleUrls: ['./not-implimented.component.css']
})
export class NotImplimentedComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {

    // const iframeURL = 'http://40.70.43.110:80/Reports/report/MOTDIMA_DriverLicense_External';
    // const iframeID = 'MyIFrame';

    // var req = new XMLHttpRequest();

    // req.open("POST",iframeURL, false, "MTOOntario", "mtoadmin@123"); //use POST to safely send combination

    // req.send(null); //here you can pass extra parameters through

  }

}
