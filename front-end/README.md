# Angular - Workshop 4



## JWT Authentication in angular

1. auth.service.ts --
    login()
    ```
      return await this.http.post(this.baseUrl+'/auth/login',data).toPromise()
    
    ```

1. login.component.ts
    
    ```
    await this.authService.login(this.loginForm.value)
      .then(
        (response:any)=>{
          if(response){
            localStorage.setItem('jwt', response.Authorization);
            this.authService.setLogedInUser();
            this.router.navigateByUrl('/dashboard');
          }else{
            alert("Invalid email id password");
          }
        },(error)=>{
          console.log(error);
          
        }
      );
    ```

2.  auth.guard.ts
    ```
       canActivate(): boolean {
        let isAuthenticated = this.authService.isAuthenticated();    
        if (isAuthenticated) {
          return true;
        } else {
          this.authService.logout();
          return false; 
        }
      }
    ```

## Interceptors

1.  auth.interceptor
    ```
      intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> 
      {

        if (this.authService.isAuthenticated()) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${this.authService.getAuthToken()}`
            }
          });
        } else {
          this.authService.logout();      
        }
    
      }
      ```

## Adding children routes
  app-routing.module.ts
  ```
  children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'user-detail',
        component: UserDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
        canActivate: [AuthGuard],
      },
    ],
  ```


## CRUD operation angular

# user.service.ts

  1. getContacts()

  ```
  await this.http.get(this.baseUrl + `/contact/getContact?id=${loggedInUserId}`).subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  ``` 

  2. addUser()
  ```
       this.http
      .post(this.baseUrl+'/contact/createContact', {
        data: user,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigateByUrl('/dashboard');
        },
        error: (error) => {
          console.log('add user error', error);
        },
      });
  ```

  3. deleteUser()
  ```
      this.http.delete(this.baseUrl + '/contact/deleteContact' + `?userId=${loggedInUserId}&contactId=${id}`).subscribe({
        next: (response) => {
          window.location.href= '/dashboard'
        },
        error: (error) => {
          console.log('delete user error', error);
        }
      });
  ```