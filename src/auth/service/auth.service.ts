import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { first, firstValueFrom } from 'rxjs';
import { serviceConifg } from 'src/config/gateway.config';

export interface UserSession {
    valid: boolean;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        status: string;
    } | null;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly httpService: HttpService,
    ) {}

    validateJwtToken(token: string): Promise<any> {
        try{
            return this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid JWT token')
        }
    }
    async validateSessionToken(sessionToken: string): Promise<UserSession> {
        try {
           const { data } = await firstValueFrom(
            this.httpService.get<UserSession>(
                `${serviceConifg.users.url}/sessions/validate/${sessionToken}`,
                { timeout: serviceConifg.users.timeout },
            ),
           );
           return data;
        } catch (error) {
            throw new UnauthorizedException('Invalid session token')
        }
    }
    async login(loginDto: {email: string, password: string }) {
        try{
            const { data } = await firstValueFrom(
                this.httpService.post(
                    `${serviceConifg.users.url}/login`,
                    loginDto,
                    { timeout: serviceConifg.users.timeout },
                ),
            );
            return data;
        } catch (error) {
            throw new UnauthorizedException('Invalid login credentials')
        }
    }
    async register(registerDto: any) {
        try{
            const { data } = await firstValueFrom(
                this.httpService.post(
                    `${serviceConifg.users.url}/auth/register`,
                    registerDto,
                    { timeout: serviceConifg.users.timeout },
                ),
            );
            return data;
        } catch (error) {
            throw new UnauthorizedException('Registration failed')
        }
    }
}
