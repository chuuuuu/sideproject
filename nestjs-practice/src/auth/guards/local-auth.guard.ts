import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// use local strategy
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
