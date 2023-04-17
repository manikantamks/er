import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  inp_fullName : string = '';
  inp_email : string = '';
  is_user_exist : boolean  = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl('');
  filteredskills: Observable<string[]>;
  skills: string[] = [];
  allskills: string[] = ["javascript","c","python","java","c#","machine-learning","kubernetes","CI/CD","R","node.js","golang","cirrus","solar","git","github","math","mysql","arrays","ubuntu","multithreading","multiprocessing","nginx","docker-compose","docker","html","css","sql","json","angular","bootstrap","react.js","object-oriented-programming(oop)","pep8","pycharm","quart","web2py","pylons","aiohttp","cherrypy","falcon","hug","pyramid","theano","opencv","numpy","matplotlib","imageio","caffe","pytorch","tkinter","pygobject","wxpython","roundup","ansible","salt","openstack","xonsh","requests","beautiful-soup","feedparser","Paramiko","twisted-python","ipython","wxWidgets","kivy","pyqt","pyside","odoo","tryton","scons","build-bot","scipy","pandas","django-cms","plone","django","falsk","scikit-learn","machine-learning","deep-learning","tensorflow","keras","fastapi","pyramid","bottle","jsp","jtable","jvm","swing","jframe","xml","springframework","unirest","okhttp3","io","util","httpclient","httpcode","jaxb","Log5j","visual-studio-code","android-studio","jbuilder","intellij-idea","netbeans","eclipse","kotlin","lodash","spring-boot","jdbc","servlet","j2ee","spring-mvc","maven","gradle","jquery","polymer","c++","opencv","linux","sqlite","stdio","stdlib","time","gui","operating-systems","embedded-systems","express-js","cypress","mongoose","npm","lodash","log4js","react","angular","async","request","redux","mongodb","bootstrap","redis","web3","http","websocket","faker","urllib","bson","http-status","vue","js-tokens","uuid","rxjs","typescript","js-beautify","xlsx","csv-parse"];

  @ViewChild('skillInput')
  skillInput!: ElementRef<HTMLInputElement>;

  
 constructor(private formBuilder:FormBuilder, private authservice : AuthService){
  this.filteredskills = this.skillCtrl.valueChanges.pipe(
    startWith(null),
    map((skill: string | null) => (skill ? this._filter(skill) : this.allskills.slice())),
  );
 }

 profileForm = this.formBuilder.group({
   fullName:[''],
   email:[''],
   skillCtrl:[''],
 });
 
 ngOnInit(): void {
  this.is_user_exist = !!sessionStorage.getItem("Username");
}

selected(event: MatAutocompleteSelectedEvent): void {
  // this.skills.push(event.option.viewValue);
  // this.skillInput.nativeElement.value = '';
  // this.skillCtrl.setValue(null);

  let index =  this.skills.indexOf(event.option.viewValue);
     if(index === -1){
        this.skills.push(event.option.viewValue);
      }
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
}


add(event: MatChipInputEvent): void {

  const input = event.chipInput;
  const value = event.value;
    if(this.allskills.indexOf(value) !== -1){
      // Add our fruit
      if ((value || '').trim()) {
        this.skills.push(value.trim());
      }
    }

    // Reset the input value
    // if (input) {
    //   input.value = '';
    // }

  // Clear the input value
  event.chipInput!.clear();

  this.skillCtrl.setValue(null);
}

remove(skill: string): void {
  const index = this.skills.indexOf(skill);

  if (index >= 0) {
    this.skills.splice(index, 1);
  }
}

 saveForm(){
   console.log('Form data is ', this.profileForm.value);
 }
 private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.allskills.filter(skill => skill.toLowerCase().includes(filterValue));
}

store_user(){
  console.log("in profile.ts")
  if(this.authservice.store_user(this.inp_fullName,this.inp_email,this.skills)){
    this.is_user_exist = true;
  }
}



}