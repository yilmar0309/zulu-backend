import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  message: string;
}
