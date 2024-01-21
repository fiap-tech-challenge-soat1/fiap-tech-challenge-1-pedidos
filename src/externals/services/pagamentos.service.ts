import { PagamentosServiceInterface, ResultadoPagamento } from "src/core/pedidos/services/pagamentos.service.interface";

export class PagamentosService implements PagamentosServiceInterface {
    async confirmaPagamento(pedidoId: number, valorTotal: number): Promise<ResultadoPagamento> {
        // Fazer request para o serviço de pagamento...
        console.log('Fazendo pagamento...', { pedidoId, valorTotal });

        return ResultadoPagamento.sucessoFake()
    }
}
