import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { UsersServiceService } from '../service/users-service.service';
import {MatDialog} from '@angular/material/dialog';

export class User{
  constructor(
    public id:string,
    public username : string,
    public is_available : boolean,
    public email : string,
    public skills : Array<string>,
    public experiance : number,
    public gender : string,
    public response_time : number,
    public high : number,
    public mid : number,
    public low : number,
    public last_active : number
  ){}
}

export class Rec_user{
  constructor(
    public id:string,
    public username : string,
    public is_available : boolean,
    public email : string,
    public skills : Array<String>,
    public experiance : number,
    public gender : string,
    public response_time : number,
    public high : number,
    public mid : number,
    public low : number,
    public last_active : number,
    public similarity_score : number
  ){}
}

@Component({
  selector: 'app-postquery',
  templateUrl: './postquery.component.html',
  styleUrls: ['./postquery.component.scss']
})
export class PostqueryComponent implements OnInit {

  is_rec_available :boolean = false;
  is_request_sent = false;
  rec_experts : Array<Rec_user> = [];

  



  inp_title : string = '';
  inp_description : string = '';
  wrong : boolean = false;
  // is_user_exist : boolean  = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredtags: Observable<string[]>;
  tags: string[] = [];
  alltags: string[] = ["pandas","boolean-logic","python","django","numpy","matplotlib","dataframe","list","tensorflow","tkinter","flask","dictionary","selenium","string","opencv","regex","scipy","csv","pep","keras","json","windows","scikit-learn","boolean-logic","sequence","slice","mutable","language-design","least-astonishment","group-by","pivot","concatenation","merge","multidimensional-array","pass-by-reference","variadic-functions","argument-unpacking","recursion","eval","pygame","collision-detection","pygame-surface","sql-function","cartesian-product","relative-import","werkzeug","static-files","multithreading","list-comprehension","thread-safety","naming-conventions","sorting","intersection","nosuchelementexception","string-literals","path","combinations","sql","directory","time-complexity","module","loops","permutation","environment-variables","search","parsing","floating-point","unicode","raw-string","datetime","datetime-parsing","metasyntactic-variable","inheritance","casting","precision","rounding","android","spring","eclipse","hibernate","spring-boot","maven","jpa","spring-mvc","xml","arrays","jdbc","javafx","tomcat","servlets","jsp","mysql","nullpointerexception","equality","pass-by-value","pass-by-reference","methods","java.util.scanner","io","exception","arrayindexoutofboundsexception","kotlin","debugging","networkonmainthread","android-networking","swing","user-interface","jframe","jvm","benchmarking","jvm-hotspot","microbenchmark","layout","jtable","layout-manager","null-layout-manager","scriptlet","stack-trace","tostring","whitespace","polymorphism","generics","super","bounded-wildcard","pecs","jakarta-ee","cpu-architecture","branch-prediction","ovverloading","overriding","noclassdeffounderror","executable-jar","http","httprequest","httpurlconnection","setter","getter","private","public","protected","access-modifiers","firebase-realtime-database","firebase","swing","awt","listener","android-permissions","jakarta-mail","android-intent","android-recyclerview", "google-cloud-firestore","hashcode","memory-leaks","out-of-memory","model-view-controller","syntactic-sugar","foreach","docker","apache-kafka","confluent-platform","inner-classes","static-classes","try-catch-finally","error-handling","runtimeexception","checked-exceptions","unchecked-exception","mockito","mock","lambda","arithmeticexception","noclassdeffounderror","constructor","autowired","null","program-entry-point","unhandled-exception","data-binding","jquery","html","css","node.js","react.js","angular","angularjs","ajax","php","typescript","dom","ecmascript-6","d3.js","asp.net","canvas","vue.js","plugins","query-string","react-hooks","arrow-functions","async-await","same-origin-policy","bluebird","xmlhttprequest","email-validation","dynamic","heredoc","prototype-oriented","serialization"];
  @ViewChild('tagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  constructor(private formBuilder:FormBuilder,private userservice: UsersServiceService, public dialog: MatDialog) {
    this.filteredtags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.alltags.slice())),
    );
   }

   

   profileForm = this.formBuilder.group({
    title:[''],
    description:[''],
    tagCtrl:[''],
  });

  ngOnInit(): void {
    // this.is_request_sent = true;
    // this.userservice.get_all_users().subscribe(
    //   response => {
    //     console.log("Recommended result")
    //     console.log(response)
    //     this.rec_experts = response;
    //     this.is_rec_available = true;
    //   }
    // )
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    // this.skills.push(event.option.viewValue);
    // this.skillInput.nativeElement.value = '';
    // this.skillCtrl.setValue(null);
  
    let index =  this.tags.indexOf(event.option.viewValue);
       if(index === -1){
          this.tags.push(event.option.viewValue);
        }
      this.tagInput.nativeElement.value = '';
      this.tagCtrl.setValue(null);
  }
  
  
  add(event: MatChipInputEvent): void {
  
    const input = event.chipInput;
    const value = event.value;
      if(this.alltags.indexOf(value) !== -1){
        // Add our fruit
        if ((value || '').trim()) {
          this.tags.push(value.trim());
        }
      }
  
      // Reset the input value
      // if (input) {
      //   input.value = '';
      // }
  
    // Clear the input value
    event.chipInput!.clear();
  
    this.tagCtrl.setValue(null);
  }
  
  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
  
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
  
   saveForm(){
     console.log('Form data is ', this.profileForm.value);
   }


   private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
  
    return this.alltags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  public send_query_for_req(){
    if(this.inp_title === '' || this.inp_description === ''){
      this.wrong = true;
      return 
    }
    console.log(this.tags);
    this.is_request_sent = true;
    this.userservice.get_recommended_experts(this.tags).subscribe(
      (response : Rec_user[]) =>{
        console.log("Recommended result")
        console.log(response)
        this.rec_experts = response;
        this.is_rec_available = true;
      }
    )
  }

}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
