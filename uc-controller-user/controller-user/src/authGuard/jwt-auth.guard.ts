import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log("Gaurd called");
        
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      console.log(request.headers);
      
      console.log("token",token);
      
      if (!token) {
        console.log("no token**");
        
        throw new UnauthorizedException();
      }
      try {
        console.log("====");
        
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.SECRETKEY
          }
        );
        console.log("payload: ",payload);
        
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch(err) {
        console.log(err);
        console.log("failed verification**");
        
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      console.log(type);
      console.log(token);
      
      
      return type === 'Bearer' ? token : undefined;
    }
  }