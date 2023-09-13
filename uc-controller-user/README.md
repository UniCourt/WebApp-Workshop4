# Address Book APIs
Building Nestjs project that will serve as backend for Address Book Application.

## Backend Stack
- Framework - Nestjs
- Database - Postgres
- ORM - Prisma

## Hands On

### Prisma set-up
- Make sure the `service-uc-controller-user` container is up and running
- Exec into the container and run the following command:
    ```
    npx prisma migrate dev --name init
    ```
    This syncs your Prisma schema with your database schema and you have initialized a migration history
    
    On making any changes in Prisma Schema run the following command to make aware prisma client of the changes
    ```
    npx prisma generate
    ```

### Project files

#### # `dto` Folder

- ##### contact.dto.ts
    -   Path: `uc-controller-user/controller-user/src/dto/contact.dto.ts`
    -   Code:
        ```
        export class createContactDto {
          @IsNotEmpty()
          name: string;

          @IsNotEmpty()
          emailId: string;

          @IsNotEmpty()
          street: string;

          @IsNotEmpty()
          city: string;

          @IsNotEmpty()
          zipcode: number;

          @IsNotEmpty()
          companyName: string;

          @IsNotEmpty()
          phoneNumber: string;

          @IsNotEmpty()
          userId: number
        }
        ```

- ##### user.dto.ts
    -   Path: `uc-controller-user/controller-user/src/dto/user.dto.ts`
    -   Code:
        ```
        export class LoginUserDto {
          @IsNotEmpty() readonly emailId: string;
          @IsNotEmpty() readonly password: string;
        }
        export class CreateUserDto {
          @IsNotEmpty()
          firstName: string;
          @IsNotEmpty()
          lastName: string;
          @IsNotEmpty()
          emailId: string;
          @IsNotEmpty()
          password: string;
        }
        export class UpdatePasswordDto {
          @IsNotEmpty()
          new_password: string;

          @IsNotEmpty()
          old_password: string;
        }
        ```

#### # `service` Folder

- ##### users.service.ts
    -   Path: `uc-controller-user/controller-user/src/service/users.service.ts`
    -   Code:
        ```
        async create(userDto: CreateUserDto): Promise<any> {
          const data = await this.prisma.user
            .create({ data: userDto })
            .catch((err) => {
              console.log(err);
              throw new HttpException('Failed to create user', 400);
            });
            return data;
        }
        ```
        ```
        async findByLogin(userData: any): Promise<any> {
          console.log(userData);
          
          const data = await this.prisma.user
          .findFirst({
            where: {
              emailId: userData.username,
              password: userData.password
            },
          })
          .catch((err) => {
            console.log(err);
            throw new HttpException('User Doesnt Exist', 400);
          });
          console.log(data);
          return data;
        }
        ```

#### # `auth` Folder 
- ##### auth.controller.ts
    -   Path: `uc-controller-user/controller-user/src/auth/auth.controller.ts`
    -   Code:
        ```
        @Post('register')
        public async register(@Body() createUserDto: CreateUserDto ): Promise<RegistrationStatus> {
          const result: RegistrationStatus = await this.authService.register(
            createUserDto,
          );
          if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
          }
          return result;
        }
        ```
        ```
        @Post('login')
        public async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
          console.log("loginUserDto: "+JSON.stringify(loginUserDto));
          return await this.authService.login(loginUserDto);
        }
        ```

- ##### auth.service.ts
    -   Path: `uc-controller-user/controller-user/src/auth/auth.service.ts`
    -   Code:
        ```
          async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
            let status: RegistrationStatus = {
              success: true,
              message: 'ACCOUNT_CREATE_SUCCESS',
            };

            try {
              status.data = await this.usersService.create(userDto);
            } catch (err) {
              console.log(err);
              status = {
                success: false,
                message: err,
              };
            }
            return status;
          }
        ```
        ```
        async login(loginUserDto: LoginUserDto): Promise<any> {
          // find user in db
          const user = await this.usersService.findByLogin(loginUserDto);
          console.log(user)
          if(!user){
            return false;
          }
          // generate and sign token
          const token = await this._createToken(user);

          return {
            ...token,
            data: user,
          };
        }
        ```
        ```
        private async _createToken(userData): Promise<any> {
          
          const user: JwtPayload = { userId: userData.id, userEmailId:userData.emailId };
          console.log(user);
          
          const Authorization = await this.jwtService.sign(user);
          console.log(Authorization);
          
          return {
            expiresIn: process.env.EXPIRESIN,
            Authorization,
          };
        }
        ```
        ```
        async validateUser(payload: JwtPayload): Promise<any> {
          const user = await this.usersService.findByPayload(payload);
          if (!user) {
            throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
          }
          return user;
        }
        ```

- ##### jwt.strategy.ts
    -   Path: `uc-controller-user/controller-user/src/auth/jwt.strategy.ts`
    -   Code:
        ```
        constructor(private readonly authService: AuthService) {
            super({
              jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
              ignoreExpiration: false,
              secretOrKey: process.env.SECRETKEY,
            });
          }
        ```
        ```
         async validate(payload: JwtPayload): Promise<any> {
            const user = await this.authService.validateUser(payload);
            if (!user) {
              throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
            }
            return user;
          }
        ```

- ##### auth.module.ts
    -   Path: `uc-controller-user/controller-user/src/auth/auth.module.ts`
    -   Code:
        ```
        imports: [
          PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
          }),
          JwtModule.register({
            secret: process.env.SECRETKEY,
            signOptions: {
              expiresIn: process.env.EXPIRESIN,
            },
          }),
        ],
        ```
        ```
        exports: [PassportModule, JwtModule],
        ```

#### # `authGaurd` Folder

- ##### jwt-auth.guard.ts
    -   Path: `uc-controller-user/controller-user/src/authGuard/jwt-auth.guard.ts`
    -   Code:
        ```
        async canActivate(context: ExecutionContext): Promise<boolean> {
          console.log("Gaurd called");
          const request = context.switchToHttp().getRequest();
          const token = this.extractTokenFromHeader(request);
          console.log(request.headers);
          
          console.log("token",token);
          
          if (!token) {
            console.log("no token");
            throw new UnauthorizedException();
          }
          try {
            const payload = await this.jwtService.verifyAsync(
              token,
              {
                secret: process.env.SECRETKEY
              }
            );
            console.log("payload: ",payload);
            
            // We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
          } catch(err) {
            console.log(err);
            console.log("failed verification**");
            
            throw new UnauthorizedException();
          }
          return true;
        }
        ```
        ```
        private extractTokenFromHeader(request: Request): string | undefined {
          const [type, token] = request.headers.authorization?.split(' ') ?? [];
          console.log(type);
          console.log(token);
          return type === 'Bearer' ? token : undefined;
        }
        ```

#### # `contact` Folder

- ##### contact.service.ts
    -   Path: `uc-controller-user/controller-user/src/contact/contact.service.ts`
    -   Code:
        ```
        async getUser(query) {
          console.log(query);
          const data = await this.prisma.contact.findMany({where:{userId: parseInt(query.id)}}).catch((err) => {
            console.log(err);
            throw new HttpException(err, 400);
          });
          return data;
        }
        ```
        ```
        getUserById(data: any) {
          console.log(data);
          return this.prisma.contact.findFirst({ where: { id: parseInt(data.contactId),userId: parseInt(data.userId) } });
        }
        ```
        ```
        async createUser(userData) {
          console.log(userData);
          const data = await this.prisma.contact
            .create({ data: userData })
            .catch((err) => {
              console.log(err);
              throw new HttpException(err, 400);
          });
          return data;
        }
        ```
        ```
        async deleteContact(userData) {
          const data = await this.prisma.contact
            .deleteMany({
              where: { id: parseInt(userData.contactId), userId: parseInt(userData.userId) },
            })
        }
        ```

- ##### contact.controller.ts
    -   Path: `uc-controller-user/controller-user/src/contact/contact.controller.ts`
    -   Code:
        ```
        @UseGuards(JwtAuthGuard)
        @Get('/getContact')
        getUser(@Query() query) {    
          return this.contactService.getUser(query);
        }
        ```
        ```
        @UseGuards(JwtAuthGuard)
        @Post('/createContact')
        async createUser(@Body() userData) {
          console.log(userData);
          
          return await this.contactService.createUser(userData.data);
        }
        ```
        ```
        @UseGuards(JwtAuthGuard)
        @Delete('/deleteContact')
        async deleteUser(@Query() queryData){
          console.log(queryData);
          return await this.contactService.deleteContact(queryData);
        }
        ```
        ```
        @UseGuards(JwtAuthGuard)
        @Get('/getUserById')
        getUserById(@Query() queryData) {
          console.log();
          return this.contactService.getUserById(queryData);
        }
        ```

- ##### contact.module.ts
    -   Path: `uc-controller-user/controller-user/src/contact/contact.module.ts`
    -   Code:
        ```
        imports: [
          JwtModule.register({
            secret: process.env.SECRETKEY,
            signOptions: {
              expiresIn: process.env.EXPIRESIN,
            },
          }),
        ],
        ```