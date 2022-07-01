import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ApiService } from './api/api.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  multiple_data: FormGroup;
  view_multiple_data: FormGroup;
  constructor(private API: ApiService, private formbuild: FormBuilder) {
    this.getUsers();
    this.getAllmultiUsers();
    this.multiple_data = this.formbuild.group({
      allproduct: this.formbuild.array([]),
      cname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      cemail: new FormControl('', [Validators.required, Validators.email]),
      cphone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
    });

    this.view_multiple_data = this.formbuild.group({
      view_allproduct: this.formbuild.array([]),
      up_id: new FormControl('', [Validators.required]),
      customer_name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      customer_email: new FormControl('', [Validators.required, Validators.email]),
      customer_phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
    });
  }








  title = 'newdemo';
  getValue(v: any) {
    return `hello check.. ${v}`;
  }

  passwordType: any = "password";
  showpass() {
    if (this.passwordType == "password") {
      this.passwordType = "text";
    } else {
      this.passwordType = "password";
    }
  }

  firsttest(data: any) {
    console.log(data.value)
  }

  // @Component({
  //   selector: 'div-1',
  //   template: `
  //       <img style="width: 90px; height: 90px;" src="http://127.0.0.1:8000/newdemo/uploadFiles/68425_8886.png">
  //   `,
  // })
  htmldata: any;
  src: any;
  getinput() {
    var num1 = ((document.getElementById('div') as HTMLInputElement).innerHTML);
    var num2 = ((document.getElementById("check") as HTMLInputElement).value);
    // console.log(num1);
    // console.log(num2);
    this.htmldata = `<img style="width: 90px; height: 90px;" src="http://127.0.0.1:8000/newdemo/uploadFiles/68425_8886.png">`;
    this.src = "http://127.0.0.1:8000/newdemo/uploadFiles/68425_8886.png";
    (document.getElementById('div2') as HTMLInputElement).innerHTML = `<img style="width: 90px; height: 90px;" src="http://127.0.0.1:8000/newdemo/uploadFiles/68425_8886.png">`;
  }





  //++++++++++++++++++++++++++++++++++++++GET ALL DATA(GET) START++++++++++++++++++++++++++++++++++++++//
  alldata: any;
  viewdata: any;
  getUsers() {
    this.API.getalldata().subscribe((response) => {
      switch (response.type) {
        case HttpEventType.Sent:
          // console.log('Sent' + HttpEventType.Sent);
          break;
        case HttpEventType.ResponseHeader:
          // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
          break;
        case HttpEventType.UploadProgress:
          this.evenTotal = response.total;
          this.progress = Math.round(response.loaded / this.evenTotal * 100);
          // console.log('UploadProgress' + HttpEventType.UploadProgress);
          break;
        case HttpEventType.Response:
          this.viewdata = response.body;
          this.alldata = "";
          this.search_status = "";
          if (this.viewdata.status === 200) {
            this.alldata = this.viewdata.alldata;
          } else {
            this.alldata = "";
          }

      }
    })
  }
  //++++++++++++++++++++++++++++++++++++++++GET ALL DATA(GET) END++++++++++++++++++++++++++++++++++++++++//

  //++++++++++++++++++++++++++++++++++++++++DATA UPLOAD(POST) START+++++++++++++++++++++++++++++++++++++++//
  filename: any = '';
  uploadFile(event: any): void {
    if (event.target.files.length > 0) {
      this.filename = event.target.files[0].name;
      this.form2.patchValue({
        profilePic: <File>event.target.files[0]
      });
    }
  }
  form2 = new FormGroup({
    email1: new FormControl('', [Validators.required, Validators.email]),
    userAgent: new FormControl(window.navigator.userAgent),
    pwd1: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    profilePic: new FormControl('', [Validators.required]),
  });

  get email1() {
    return this.form2.get('email1');
  }
  get pwd1() {
    return this.form2.get('pwd1');
  }
  get profilePic() {
    return this.form2.get('profilePic');
  }


  registerPoint: boolean = false;
  apistatus: any;
  apistatusCode: any;
  register_message: any;
  progress: number = 0;
  evenTotal: any;
  userupload() {
    const rgForm = new FormData();
    rgForm.append('profilePic', this.form2.get('profilePic')?.value);
    rgForm.append('email', this.form2.get('email1')?.value);
    rgForm.append('password', this.form2.get('pwd1')?.value);
    rgForm.append('user_agent', this.form2.get('userAgent')?.value);
    this.API.newpost(rgForm).subscribe((response: HttpEvent<any>) => {
      // console.log(response);
      switch (response.type) {
        case HttpEventType.Sent:
          // console.log('Sent' + HttpEventType.Sent);
          break;
        case HttpEventType.ResponseHeader:
          // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
          break;
        case HttpEventType.UploadProgress:
          // console.log('UploadProgress' + HttpEventType.UploadProgress);
          break;
        case HttpEventType.Response:
          this.apistatus = response.body;
          this.form2.reset();
          this.filename = "";
          alert(this.apistatus.message);
          this.getUsers();
        // console.log(this.apistatus);
      }
    });
  }
  //++++++++++++++++++++++++++++++++++++++++DATA UPLOAD(POST) END++++++++++++++++++++++++++++++++++++++++//



  //++++++++++++++++++++++++++++++++++++++++DATA UPDATE(POST) START+++++++++++++++++++++++++++++++++++++++//
  uploadFilenew(event: any): void {
    if (event.target.files.length > 0) {
      this.updateform.patchValue({
        profilePicnew: <File>event.target.files[0]
      });
    }
  }
  updateform = new FormGroup({
    updateid: new FormControl(''),
    emailnew: new FormControl('', [Validators.required, Validators.email]),
    userAgent: new FormControl(window.navigator.userAgent),
    profilePicnew: new FormControl(''),
    oldfile: new FormControl(''),
  });

  get updateid() {
    return this.updateform.get('updateid');
  }

  get emailnew() {
    return this.updateform.get('emailnew');
  }
  get userAgent() {
    return this.updateform.get('userAgent');
  }

  update_status: any;
  userupdate() {
    const upForm = new FormData();
    upForm.append('oldfile', this.updateform.get('oldfile')?.value);
    upForm.append('profilePic', this.updateform.get('profilePicnew')?.value);
    upForm.append('email', this.updateform.get('emailnew')?.value);
    upForm.append('user_agent', this.updateform.get('userAgent')?.value);
    upForm.append('updateid', this.updateform.get('updateid')?.value);
    this.API.updateUser(upForm).subscribe((response: HttpEvent<any>) => {
      // console.log(response);
      switch (response.type) {
        case HttpEventType.Sent:
          // console.log('Sent' + HttpEventType.Sent);
          break;
        case HttpEventType.ResponseHeader:
          // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
          break;
        case HttpEventType.UploadProgress:
          this.evenTotal = response.total;
          this.progress = Math.round(response.loaded / this.evenTotal * 100);
          // console.log('UploadProgress' + HttpEventType.UploadProgress);
          break;
        case HttpEventType.Response:
          this.update_status = response.body;
          // console.log(this.update_status); return;
          if (this.update_status.status === 200) {
            alert(this.update_status.message);
            this.getUsers();
          } else {
            alert(this.update_status.message);
          }
      }
    });
  }
  //++++++++++++++++++++++++++++++++++++++++DATA UPDATE(POST) END++++++++++++++++++++++++++++++++++++++++//


  //++++++++++++++++++++++++++++++++++++++++DATA SEARCH(GET) START+++++++++++++++++++++++++++++++++++++++//
  userid: any;
  search_result: any;
  photo: any;
  currentdate: any;
  search_status: any;

  searchuser(usersearch: any) {
    if (usersearch.value.userid == "") {
      alert("No records found..!!");
      this.search_status = "";
      return;
    } else {
      this.API.usersearch(usersearch.value.userid).subscribe((response: HttpEvent<any>) => {
        switch (response.type) {
          case HttpEventType.Sent:
            // console.log('Sent' + HttpEventType.Sent);
            break;
          case HttpEventType.ResponseHeader:
            // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
            break;
          case HttpEventType.UploadProgress:
            // console.log('UploadProgress' + HttpEventType.UploadProgress);
            break;
          case HttpEventType.Response:
            this.search_result = response.body;
            this.search_status = this.search_result.status;
            if (this.search_result.status === 200) {
              this.updateform = new FormGroup({
                updateid: new FormControl(this.search_result.userdata.id, [Validators.required]),
                emailnew: new FormControl(this.search_result.userdata.email, [Validators.required, Validators.email]),
                userAgent: new FormControl(window.navigator.userAgent, [Validators.required]),
                oldfile: new FormControl(this.search_result.userdata.photo),
                profilePicnew: new FormControl(''),
              });
              this.userid = this.search_result.userdata.id;
              this.photo = this.search_result.userdata.photo;
              this.currentdate = this.search_result.userdata.currentdate;
            } else {
              this.userid = "";
              this.photo = "";
              this.currentdate = "";
            }
          // console.log(this.userdata);
        }
      });
    }
  }
  //++++++++++++++++++++++++++++++++++++++++DATA SEARCH(GET) END+++++++++++++++++++++++++++++++++++++++++//



  //++++++++++++++++++++++++++++++++++++++++DATA DELETE(DELETE) START+++++++++++++++++++++++++++++++++++++//
  delete_result: any;
  delete_status: any;
  deleteis(id: any) {
    if (confirm("Are you sure to delete this record ?")) {
      this.API.userdelete(id).subscribe((response: HttpEvent<any>) => {
        switch (response.type) {
          case HttpEventType.Sent:
            // console.log('Sent' + HttpEventType.Sent);
            break;
          case HttpEventType.ResponseHeader:
            // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
            break;
          case HttpEventType.UploadProgress:
            // console.log('UploadProgress' + HttpEventType.UploadProgress);
            break;
          case HttpEventType.Response:
            this.delete_result = response.body;
            this.delete_status = this.delete_result.status;
            if (this.delete_result.status === 200) {
              alert(this.delete_result.message);
              this.search_status = "";
              this.getUsers();
            } else {
              alert(this.delete_result.message);
            }
          // console.log(this.userdata);
        }
      });
    }
  }
  //++++++++++++++++++++++++++++++++++++++++DATA DELETE(DELETE) END++++++++++++++++++++++++++++++++++++//


  /////////////////////////////////////////////////////////////////

  valueis: any;
  getinputvalue(val: string) {
    this.valueis = val;
  }

  count: any = 0;

  counter(type: any) {
    if (this.count < 1) {
      this.count = 1;
    } else {
      type === 'add' ? this.count++ : this.count--;
    }

  }
  show: any = false;
  show1: any = "yes";
  color: any = "blue";

  demoArr1: any = ["vidyut", "Bidyut", "V", "B"];
  demoArr: any = [
    { name: "Bidyut", age: 24, phono: 8763699746, social: ["facebook", "insta", "twitter"] },
    { name: "Bidyut", age: 24, phono: 8763699746, social: ["facebook", "youtube", "linked"] }
  ];


  registerform = new FormGroup({
    regname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    regemail: new FormControl('', [Validators.required, Validators.email]),
    regphone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
    regpassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    regbloodgroup: new FormControl('', [Validators.required]),
  });
  get regname() {
    return this.registerform.get('regname');
  }
  get regemail() {
    return this.registerform.get('regemail');
  }
  get regphone() {
    return this.registerform.get('regphone');
  }
  get regpassword() {
    return this.registerform.get('regpassword');
  }
  get regbloodgroup() {
    return this.registerform.get('regbloodgroup');
  }
  register() {

  }




  //++++++++++++++++++++++++++++++++++++++++UPLOAD MULTIPLES DATA(POST) START++++++++++++++++++++++++++++++++++++//
  product(): FormArray {
    return this.multiple_data.get("allproduct") as FormArray
  }
  get cname() {
    return this.multiple_data.get('cname');
  }
  get cemail() {
    return this.multiple_data.get('cemail');
  }
  get cphone() {
    return this.multiple_data.get('cphone');
  }


  newProduct(): FormGroup {
    return this.formbuild.group({
      name: '',
      qty: '',
      price: '',
      productfile: '',
    })
  }

  addProduct() {
    this.product().push(this.newProduct());
  }

  removeProduct(i: number) {
    this.product().removeAt(i);
  }

  api_multiple: any;
  sfile: any;
  setfile(event: any, id: number) {
    if (event.target.files.length > 0) {
      this.sfile = <File>event.target.files[0];
    } else {
      this.sfile = "";
    }
    this.multiple_data.value.allproduct[id].productfile = this.sfile;
  }


  uploadMultiple() {
    const all = this.multiple_data.value.allproduct;
    const mForm = new FormData();
    mForm.append("cname", this.multiple_data.get('cname')?.value);
    mForm.append("cphone", this.multiple_data.get('cphone')?.value);
    mForm.append("cemail", this.multiple_data.get('cemail')?.value);
    for (var i = 0; i < all.length; i++) {
      mForm.append("name[]", all[i].name);
      mForm.append("price[]", all[i].price);
      mForm.append("qty[]", all[i].qty);
      mForm.append("photo[]", all[i].productfile);
    }
    this.API.mutiplesPost(mForm).subscribe((response: HttpEvent<any>) => {
      // console.log(response);
      switch (response.type) {
        case HttpEventType.Sent:
          // console.log('Sent' + HttpEventType.Sent);
          break;
        case HttpEventType.ResponseHeader:
          // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
          break;
        case HttpEventType.UploadProgress:
          // console.log('UploadProgress' + HttpEventType.UploadProgress);
          break;
        case HttpEventType.Response:
          this.api_multiple = response.body;
          // console.log(this.api_multiple); return;
          for (var i = 0; i < all.length; i++) {
            this.product().removeAt(i);
          }
          this.product().removeAt(0);
          this.multiple_data.reset();
          alert(this.api_multiple.message);
      }
    });
  }

  //++++++++++++++++++++++++++++++++++++++++UPLOAD MULTIPLES DATA(POST) END++++++++++++++++++++++++++++++++++++//


  //++++++++++++++++++++++++++++++++++++++++GET ALL MUTIPLES DATA(GET) STAER++++++++++++++++++++++++++++++++++++//
  allmultidata: any;
  allmultidata_res: any;
  getAllmultiUsers() {
    this.API.viewallmultidata().subscribe((response) => {
      switch (response.type) {
        case HttpEventType.Sent:
          // console.log('Sent' + HttpEventType.Sent);
          break;
        case HttpEventType.ResponseHeader:
          // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
          break;
        case HttpEventType.UploadProgress:
          // console.log('UploadProgress' + HttpEventType.UploadProgress);
          break;
        case HttpEventType.Response:
          this.allmultidata_res = response.body;
          // console.log(this.allmultidata_res);
          this.allmultidata = "";
          if (this.allmultidata_res.status === 200) {
            this.allmultidata = this.allmultidata_res.allmulti_users;
          } else {
            alert(this.allmultidata_res.message);
            this.allmultidata = "";
          }

      }
    })
  }
  //++++++++++++++++++++++++++++++++++++++++GET ALL MUTIPLES DATA(GET) END++++++++++++++++++++++++++++++++++++//


  //++++++++++++++++++++++++++++++++++++++++GET VIEW MUTIPLES DATA(GET) STAER++++++++++++++++++++++++++++++++++++//

  multi_productdata: any;
  multi_search_res: any;
  multi_search_status: any;
  multi_searchuser(data: any) {
    if (data.value.userid == "") {
      alert("No records found..!!");
      this.multi_search_status = "";
      return;
    } else {
      this.API.multiusersearch(data.value.multi_userid).subscribe((response: HttpEvent<any>) => {
        switch (response.type) {
          case HttpEventType.Sent:
            // console.log('Sent' + HttpEventType.Sent);
            break;
          case HttpEventType.ResponseHeader:
            // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
            break;
          case HttpEventType.UploadProgress:
            // console.log('UploadProgress' + HttpEventType.UploadProgress);
            break;
          case HttpEventType.Response:
            this.multi_search_res = response.body;
            this.multi_search_status = this.multi_search_res.status;
            if (this.multi_search_res.status === 200) {

              const all = this.view_multiple_data.value.view_allproduct;
              for (var i = 0; i < all.length; i++) {
                this.view_product().removeAt(i);
              }
              this.view_product().removeAt(0);
              this.view_multiple_data.reset();


              this.view_multiple_data.patchValue({
                up_id: this.multi_search_res.cuser.id,
                customer_name: this.multi_search_res.cuser.cname,
                customer_email: this.multi_search_res.cuser.cemail,
                customer_phone: this.multi_search_res.cuser.cphone
              });
              if (this.multi_search_res.cuser_data.length > 0) {
                this.multi_productdata = this.multi_search_res.cuser_data;
                for (let x = 0; x < this.multi_productdata.length; x++) {
                  this.view_product().push(this.formbuild.group({
                    up_id: this.multi_productdata[x].id,
                    new_name: this.multi_productdata[x].name,
                    new_qty: this.multi_productdata[x].qty,
                    new_price: this.multi_productdata[x].price,
                    new_file: null,
                  }));
                  // alert('viewphoto' + [x]);
                  // (document.getElementById('mimg' + [x]) as HTMLInputElement).setAttribute("src", `http://127.0.0.1:8000/newdemo/upload-Multiples/${this.multi_productdata[x].photo}`);

                }
                // for (let c = 0; c < this.multi_productdata.length; c++) {
                //   (document.getElementById('viewphoto0') as HTMLInputElement).innerHTML = `<img style="width: 90px; height: 90px;" src="http://127.0.0.1:8000/newdemo/upload-Multiples/${this.multi_productdata[c].photo}">`
                // }

              }
            }
        }
      });
    }
  }

  //++++++++++++++++++++++++++++++++++++++++GET VIEW MUTIPLES DATA(GET) END++++++++++++++++++++++++++++++++++++//



  //++++++++++++++++++++++++++++++++++++++++POST MUTIPLES DATA UPDATE(POST) START++++++++++++++++++++++++++++++++++++//
  view_product(): FormArray {
    return this.view_multiple_data.get("view_allproduct") as FormArray
  }

  get customer_name() {
    return this.view_multiple_data.get('customer_name');
  }
  get customer_email() {
    return this.view_multiple_data.get('customer_email');
  }
  get customer_phone() {
    return this.view_multiple_data.get('customer_phone');
  }

  view_newProduct(): FormGroup {
    return this.formbuild.group({
      up_id: '',
      new_name: '',
      new_qty: '',
      new_price: '',
      new_file: '',
    })
  }

  view_addProduct() {
    this.view_product().push(this.view_newProduct());
  }

  view_removeProduct(i: number) {
    this.view_product().removeAt(i);
  }


  updateMultiple() {

  }
  //++++++++++++++++++++++++++++++++++++++++POST MUTIPLES DATA UPDATE(POST) END++++++++++++++++++++++++++++++++++++//

  list: any[] = [];
  setdata(items: any) {
    this.list.push({ id: this.list.length, name: items });
    console.log(this.list);
  }

  removedata(id: number) {
    console.log(id);
    this.list = this.list.filter(item => item.id! == id);
    console.log(this.list);
  }

  // Send data perent component to child coponent

  pdata: any = "Hii child..";

  changepdata() {
    this.pdata = Math.floor(Math.random() * 10);
  }
  // Reusable child coponent
  childDetails: any = [
    { name: "Bidyut", age: 24, phono: 8763699746, social: "facebook" },
    { name: "Vidyut", age: 25, phono: 8163699746, social: "youtube" },
    { name: "Vk", age: 25, phono: 8163699746, social: "youtube" }
  ]

  // Send data child component to perent coponent
  childdata: any;
  getChildData(data: any) {
    this.childdata = data;
  }

  // Two way binding
  bname: any;

  getVal(d: HTMLInputElement) {
    console.log(d.value);
    console.log(d.name);
    console.log(d.id);
    console.log(d.placeholder);
  }


  // Basic of Pipes in angular
  cata: string = "Hello world..";
  today: string = Date();

  capsData(data: any) {
    return data.toUpperCase();
  }

}
