// TODO: retrieve userId from the AuthService

// import { Inject } from '@nestjs/common';
// import { CryptoHelper } from '../../helpers/crypto/crypto.helper';
// import { AuthService } from '../../services/auth/auth.service';
//
// export function yourDecorator() {
//   const injectYourService = Inject(AuthService);
//
//   return (
//     target: any,
//     propertyKey: string,
//     propertyDescriptor: PropertyDescriptor,
//   ) => {
//     // this is equivalent to have a constructor like constructor(yourservice: YourServiceClass)
//     // note that this will injected to the instance, while your decorator runs for the class constructor
//     injectYourService(target, 'cryptoHelper');
//
//     // do something in you decorator
//
//     // we use a ref here so we can type it
//     const yourservice: YourServiceClass = this.yourservice;
//     yourservice.someMethod(someParam);
//   };
// }
