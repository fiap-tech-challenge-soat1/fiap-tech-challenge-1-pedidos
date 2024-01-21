enum ResultadoStatus {
    SUCESSO = 'SUCESSO',
    FALHA = 'FALHA',
}

export class ResultadoPagamento {
    static sucessoFake() {
        return new ResultadoPagamento(ResultadoStatus.SUCESSO)
    }

    constructor(private status: ResultadoStatus) {}

    falhou() {
        return this.status === ResultadoStatus.FALHA
    }
}

export interface PagamentosServiceInterface {
    confirmaPagamento(pedidoId: number, valorTotal: number): Promise<ResultadoPagamento>;
}

export const PagamentosServiceInterface = Symbol('PagamentosServiceInterface');
