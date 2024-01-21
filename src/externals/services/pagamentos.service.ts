import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { PagamentoServiceIndisponivelException } from 'src/core/pedidos/exceptions/servicos.exception';
import { PagamentosServiceInterface } from 'src/core/pedidos/services/pagamentos.service.interface';

export class PagamentosService implements PagamentosServiceInterface {
  async solicitarPagamento(pedidoId: number, valorTotal: number) {
    // Fazer request para o serviço de pagamento...
    console.log('Fingindo fazer pagamento...', { pedidoId, valorTotal });
  }
}

export class PagamentosAPIService implements PagamentosServiceInterface {
  constructor(private url: string, private readonly http: HttpService) {}

  async solicitarPagamento(pedidoId: number, valorTotal: number) {
    await firstValueFrom(
      this.http
        .post(
          this.url,
          {
            pedidoId,
            valorTotal,
          },
          {
            timeout: 3_000, // 3 seconds
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.error('Payment service is down', { error });

            throw new PagamentoServiceIndisponivelException();
          }),
        ),
    );
  }
}
