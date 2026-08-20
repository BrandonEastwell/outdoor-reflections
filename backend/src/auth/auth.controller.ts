import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { LocalAuthGuard } from './local-auth-guard';
import { JwtAuthGuard } from './jwt-auth-guard';
import { CredentialsDto } from './auth.dto';
import { SafeUser } from '../user/user.types';
import { GoogleAuthGuard } from './google-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.login(req.user as SafeUser);

    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    res.cookie('refresh_token', token.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return res.status(201).end();
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() credentials: CredentialsDto) {
    await this.authService.register(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return res.status(200).json({ message: 'Logged out' });
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Req() req: Request) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) throw new UnauthorizedException('User is not signed in');
    const user: SafeUser = req.user as SafeUser;
    return this.authService.refresh(user, refreshToken);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(@Req() req: Request) {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: Request) {
    return this.authService.loginWithGoogle(req);
  }
}
