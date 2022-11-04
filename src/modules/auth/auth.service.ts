import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser: any;
}

// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AuthService {
//   validateUser(arg0: { email: string; displayName: string }) {
//     throw new Error('Method not implemented.');
//   }
// }
