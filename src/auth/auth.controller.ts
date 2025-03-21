import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from './auth.service';
import { UserLoginSuccessDto } from './dto/user-login-success.dto';
import { IsPublic } from './decorators/is-public/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  login(@Body() loginDto: UserLoginDto): Promise<UserLoginSuccessDto> {
    return this.authService.loginUser(loginDto);
  }
}
