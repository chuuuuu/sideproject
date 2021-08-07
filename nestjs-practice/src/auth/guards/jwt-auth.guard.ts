import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// use jwt strategy
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
