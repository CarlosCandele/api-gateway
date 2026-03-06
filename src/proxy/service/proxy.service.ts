import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { serviceConifg } from 'src/config/gateway.config';

@Injectable()
export class ProxyService {
 
    private readonly logger = new Logger(ProxyService.name);
    constructor(private readonly httpService: HttpService) {}

     async  proxyRequest(
      serviceName: keyof typeof serviceConifg,
      method: string,
      path: string,
      data?: any,
      headers?: any,
      userInfo?: any
   ) {
    const service = serviceConifg[serviceName];
    const url = `${service.url}${path}`;

    this.logger.log(`Proxying request to ${serviceName}: ${url}`);
  
    try {
        const enhancedHeaders = {
            ...headers,
            'x-user-info': userInfo?.userId,
            'x-user-email': userInfo?.email,
            'x-user-role': userInfo?.role
        };

        const response = await firstValueFrom(
            this.httpService.request({
                method: method.toLowerCase() as any,
                url,
                data,
                headers: enhancedHeaders,
                timeout: service.timeout,
            })
        );
        return response;
    } catch (error) {
        this.logger.error(
            `Erro proxying ${method} request to ${serviceName}: ${url}`
        );
        throw error;
    }
   }
    async getServiceHealth(serviceName: keyof typeof serviceConifg) {
        try {
            const service = serviceConifg[serviceName];
            const response = await firstValueFrom(
                this.httpService.get(`${service.url}/health`, {
                    timeout: 3000,
                }),
            );
            return { status: 'healthy', timestamp: new Date(), data: response.data };
        } catch (error) {
            return { status: 'unhealthy', timestamp: new Date(), error: error.message || 'Unknown error' };
        }
    }

}
