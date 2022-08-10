import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/auth/public.decorator';
import { UserResponse } from '../../classToResponse/UserResponse';
import { UserLoginDto, UserRegisterDto } from '../../dto/user.dto';
import { User } from '../../schemas/user.schema';
import { AuthService } from '../../services/auth/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: UserResponse,
  })
  @Public()
  @Post('sign-up')
  async register(@Body() data: UserRegisterDto): Promise<User> {
    return await this.authService.create(data);
  }

  @ApiResponse({
    status: 200,
    description: 'The sign In has been successfully',
    type: UserResponse,
  })
  @Public()
  @Post('sign-in')
  async signIn(
    @Body() data: UserLoginDto,
  ): Promise<{ user: User; jwt: string }> {
    return await this.authService.signIn(data);
  }
}
