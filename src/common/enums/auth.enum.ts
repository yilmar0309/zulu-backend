export enum JWTExpirationTime {
  TwoMinutes = '2m',
  TenMinutes = '10m', //@todo restore to 10m and create a refresh jwt during the registration
  OneDay = '1d',
}
