// tslint:disable: curly
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, map, delay } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, transition, style, animate } from '@angular/animations';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


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
  ascending = false;
  totalMedics: any;
  loading = false;
  type = 'determinate';
  progress = 0;
  mobile = false;
  data = [];
  filterData = [];
  shownData = [];
  form: FormGroup;
  filterObj = new FormControl();
  searchObj = new FormControl('');
  filterList: Array<string>;
  totalQuery = gql`query{totalMedics}`;
  dataQuery = gql`
    query($start:Int!,$end:Int!){
      medicaments(start:$start,end:$end){
        ID
        DRUG_CLASS
        PHARMACOLOGY_CLASS
        NUM_ENREGISTREMENT
        CODE
        DENOMINATION_COMMUNE_INTERNATIONALE
        NOM_DE_MARQUE
        FORME
        DOSAGE
        COND
        LISTE
        P1
        P2
        OBS
        LABORATOIRES_DETENTEUR_DE_LA_DECISION_DENREGISTREMENT
        PAYS_DU_LABORATOIRE_DETENTEUR_DE_LA_DECISION_DENREGISTREMENT
        DATE_DENREGISTREMENT_INITIAL
        DATE_DENREGISTREMENT_FINAL
        TYPE
        STATUT
        DUREE_DE_STABILITE
        PRIX_PORTE_SUR_LA_DECISION_DENREGISTREMENT
        REMBOURSEMENT
      }
    }
  `;

  constructor(private fb: FormBuilder, private http: HttpClient, private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer, private apollo: Apollo) {
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
    /* get data length */
    this.apollo.watchQuery<any>({ query: this.totalQuery }).valueChanges.subscribe(v => this.totalMedics = v.data.totalMedics);
  }
  ngOnInit() {
    this.Datafetch(0);
    this.searchObj.valueChanges
      .pipe(map(v => { this.loading = true; this.type = 'query'; return v; }))
      .pipe(debounceTime(1700)).subscribe(v => this.filter());
  }
  private Datafetch(cpt) {
    const step = 500;
    this.loading = true;
    this.type = 'determinate';
    this.apollo.watchQuery<any>({ query: this.dataQuery, variables: { start: cpt * step, end: (cpt + 1) * step } }).valueChanges
      .pipe(delay(150)).subscribe((v) => {
        if (v.data.medicaments.length > 0) {
          this.data.push(...v.data.medicaments);
          this.filterData = this.data;
          this.Datafetch(cpt + 1);
        } else {
          this.type = 'query';
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        }
        this.setLoading();
        if (cpt === 0)
          this.filterList = Object.keys(this.data[0]).map(val => val.toLocaleLowerCase().replace(new RegExp('_', 'g'), ' '));

        this.setLoad(9);
      });
  }
  setLoading() {
    /*
      total ====> 100%
      data =====> X
    */
    let result = (this.data.length * 100) / this.totalMedics;
    result = ~~(result);
    this.progress = this.progress > result ? this.progress : result;
    console.log(this.progress);

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
      if (this.filterObj.value === 0) {
        return val === this.searchObj.value;
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
        if (this.ascending)
          return a > b ? 1 : -1;
        else
          return a < b ? 1 : -1;
      }
    });
    this.setLoad(9);
  }
  reverseSort(bool) {
    if (bool !== this.ascending) {
      this.ascending = !this.ascending;
      this.filterData = this.filterData.slice().reverse();
    }
  }
  setLoad(val) {
    this.end = val;
    if (this.filterData.length === 0)
      this.rest = 0;
    else
      this.rest = Math.max(this.filterData.length - this.end, 0);


  }
  tracbyfn(index, item) {
    return index + item.ID;
  }
}
