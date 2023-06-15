# Angular - Workshop 3

## Command Line Tools

1.  Creating angular project
    ```
      ng new project-name
    ```
2.  Running angular project
    ```
      ng serve
    ```
3.  Creating component
    ```
      ng generate component component-name
    ```

## Component Life Cycle

1.  constructor
    ```
      constructor() {
        console.log('Constructor called');
      }
    ```
2.  ngOnChanges
    ```
      ngOnChanges() {
        console.log('on changes called');
      }
    ```
3.  ngOnInit
    ```
      ngOnInit() {
        console.log('on init called');
      }
    ```
4.  ngOnDestroy()
    ```
      ngOnDestroy() {
        console.log('on destroy called');
      }
    ```

## Structural Directives

1.  \*ngIf

    app.component.ts

    ```
      showButton: boolean = true;
    ```

    app.component.html

    ```
      <button *ngIf="showButton">CLICK</button>
    ```

2.  \*ngFor

    app.component.ts

    ```
      names = ['Arun', 'Mark', 'Smith', 'Jack'];
    ```

    app.component.html

    ```
    <h2 *ngFor="let item of names">

      {{ item }}
    </h2>
    ```

## Sharing data between child and parent components

### Parent to Child

1. In parent

   app.component.ts

   ```
     title : string = "Hello from parent"
   ```

   app.component.html

   ```
     <app-child  [message]="title"></app-child>
   ```

2. In child

   child.component.ts

   ```
     @Input() message: string;
   ```

   child.component.html

   ```
     <span>{{message}}</span>
   ```

### Child to Parent

1. In parent

   app.component.ts

   ```
     childButtonClick(){
        console.log("Hello from child")
     }
   ```

   app.component.html

   ```
     <app-child  [message]="title" (buttonClick)="childButtonClick()"></app-child>
   ```

2. In child

   child.component.ts

   ```
     @Output() buttonClick = new EventEmitter<>();

     myButtonClick(){
      this.buttonClick.emit();
     }
   ```

   child.component.html

   ```
     <button (click)="myButtonClick()">Click me</button>
   ```

## Routing

1. Create a component _header_

   ```
     ng generate component header
   ```

2. Use _header_ and _router-outlet_ in app.component.html

   ```
     <app-header></app-header>
     <router-outlet></router-outlet>
   ```

3. Create another component _about-us_

   ```
    ng generate component about-us
   ```

4. Add a route in _app-routing.module.ts_
   ```
    const routes: Routes = [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      }
    ]
   ```
5. add link in _header-component.html_

   ```
      <label routerLink="/">Home</label>
      <label routerLink="/about-us">About Us</label>
   ```

## Services

1. Create a service _user_

   ```
     ng generate service services/user
   ```

2. Getting _user list_

   ```
    getUsers(): void {
      this.users = [];
      this.http.get(this.baseUrl).subscribe({
        next: (response: any) => {
          let tempUser = [];
          response.forEach((element) => {
            let user: User = {
              id: element.id,
              name: element.name,
              city: element.address.city,
              emailId: element.email,
            };
            tempUser.push(user)
          });

          localStorage.setItem("users",JSON.stringify(tempUser));
          this.users =  JSON.parse(localStorage.getItem("users")) || [];
        },
        error: (err) => {
          console.log('error', err);
        },
      });
    }
   ```

3. Getting _user detail_

   ```
      getUserDetail(id: number): Observable<any> {
        return this.http.get(this.baseUrl + '/' + id);
      }
   ```

4. adding _user detail_

   ```
    addUser(user: UserDetail): void {
      this.http
        .post(this.baseUrl, {
          user: user,
        })
        .subscribe({
          next: (response) => {
            this.users = JSON.parse(localStorage.getItem('users')) || [];
            this.users.push(user);
            localStorage.setItem('users', JSON.stringify(this.users));
            alert('User added successfully');
            this.router.navigateByUrl('/');
          },
          error: (error) => {
            console.log('add user error', error);
          },
        });
    }
   ```

5. deleting _user detail_

   ```
    deleteUser(id: number): void {
      this.http.delete(this.baseUrl + '/' + id).subscribe({
        next: (response) => {
          this.users = JSON.parse(localStorage.getItem('users')) || [];
          this.users = this.users.filter((user) => user['id'] != id);
          localStorage.setItem('users', JSON.stringify(this.users));
          this.users = JSON.parse(localStorage.getItem('users')) || [];
          alert('User delete successfully');
        },
        error: (error) => {
          console.log('delete user error', error);
        },
      });
   }
   ```

## Guards

1. Create a guard _auth_

   ```
     ng generate guard guard/user
   ```

2. Add the guard to _create-user_ route in _app-routing.module.ts_
   ```
    {
        path: 'create-user',
        component: CreateUserComponent,
        canActivate: [AuthGuard],
    }
   ```

## Interceptors

1. Create an Interceptors _log_

   ```
     ng generate interceptor interceptors/log
   ```

2. Log some data
   ```
      intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
      ): Observable<HttpEvent<unknown>> {
        const requestCopy = request.clone();
        console.log('interceptor is called');
        return next.handle(requestCopy);
      }
   ```
