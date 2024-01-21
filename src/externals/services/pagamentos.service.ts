import { PagamentosServiceInterface, ResultadoPagamento } from "src/core/pedidos/services/pagamentos.service.interface";

export class PagamentosService implements PagamentosServiceInterface {
    async confirmaPagamento(pedidoId: number, valorTotal: number): Promise<ResultadoPagamento> {
        // Fazer request para o serviço de pagamento...
        console.log('Fingindo fazer pagamento...', { pedidoId, valorTotal });

        return ResultadoPagamento.sucessoFake()
    }
}

export class PagamentosAPIService implements PagamentosServiceInterface {
    constructor(private url: string) {}

    async confirmaPagamento(pedidoId: number, valorTotal: number): Promise<ResultadoPagamento> {
        // Fazer request para o serviço de pagamento...
        console.log('Fazendo pagamento via HTTP...', { url: this.url, pedidoId, valorTotal });

        return ResultadoPagamento.sucessoFake()
    }
}
