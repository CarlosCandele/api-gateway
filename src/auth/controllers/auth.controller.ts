import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';


@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authServie: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'User login'})
    @ApiResponse({ status: 200, description: 'Login sucessful'})
    @ApiResponse({ status: 401, description: 'Invalid credentials'})
    async login(@Body() loginDto: { email: string; password: string }) {
        return this.authServie.login(loginDto);
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'User registration'})
    @ApiResponse({ status: 200, description: 'Registration sucessful'})
    @ApiResponse({ status: 401, description: 'Invalid registration data'})
    async register(@Body() registerDto: any) {
        return this.authServie.register(registerDto);
    }
}
