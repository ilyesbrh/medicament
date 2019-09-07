import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, transition, style, animate } from '@angular/animations';


export const fade = trigger('fade', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate('400ms {{delay}}ms linear', style({ opacity: 1 }))
  ], { params: { delay: '30' } })
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fade]
})
export class HomeComponent implements OnInit {

  end = 9;
  rest = 0;
  loading = true;
  mobile = false;
  data = [];
  filterData = [];
  shownData = [];
  form: FormGroup;
  filterObj = new FormControl();
  searchObj = new FormControl('');
  filterList: Array<string>;


  constructor(fb: FormBuilder, private http: HttpClient,
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {

    
    /* form init */
    this.form = new FormGroup({
      search: this.searchObj,
      filter: this.filterObj
    });
    /* add icons */
    this.matIconRegistry.addSvgIcon(
      'labo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/labo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'price',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/price.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'therapy',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/therapy.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'input_way',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/inputWay.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'description',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/description.svg')
    );
  }
  ngOnInit() {

    this.http.get('https://raw.githubusercontent.com/mahmoudBens/Nomenclature-des-medicaments-en-algerie/master/medicament.json')
      .subscribe((v) => {
        this.data = v[1].data;
        this.filterData = this.data;
        this.filterList = Object.keys(this.data[0]);
        for (let index = 0; index < this.filterList.length; index++) {
          this.filterList[index] = this.filterList[index].toLocaleLowerCase().replace(new RegExp('_', 'g'), ' ');
        }
        this.setLoad(9);
        this.loading = false;
      });
    this.searchObj.valueChanges
      .pipe(map(v => { this.loading = true; return v; }))
      .pipe(debounceTime(1700)).subscribe(v => this.filter());
  }
  filter() {

    if (this.filterObj.value == null) { this.filterObj.setValue(3); }
    if (this.searchObj.value === '') {
      this.filterData = this.data;
      this.loading = false;
      this.setLoad(9);
      return;
    }

    this.filterData = this.data.filter(item => {
      const val = Object.values<any>(item)[this.filterObj.value];
      if (this.filterObj.value == 0) {
        return val == this.searchObj.value;
      }
      return !!val && val.toLowerCase().search(new RegExp(this.searchObj.value.toLowerCase())) !== -1;
    });

    this.setLoad(9);
    this.loading = false;
  }
  sortBy(index: number) {
    this.filterData = this.filterData.slice().sort((a, b) => {

      a = Object.values(a)[index];
      b = Object.values(b)[index];

      if (a === b) {
        return 0;
      } else {
        return a > b ? 1 : -1;
      }
    });

    this.setLoad(9);
  }

  setLoad(val) {
    this.end = val;
    if (this.filterData.length === 0) { this.rest = 0; }
    else {
      this.rest = Math.max(this.filterData.length - this.end, 0);
      console.log(this.rest);

    }

  }
  tracbyfn(index, item) {
    return index + item.ID;
  }
}
