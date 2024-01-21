import { PedidoProducaoDTO, ProducaoServiceInterface } from "src/core/pedidos/services/producao.service.interface";

export class ProducaoService implements ProducaoServiceInterface {
    iniciarProducao(pedidoProducaoDTO: PedidoProducaoDTO) {
        // Fazer request para o serviço de pagamento...
        console.log('Fingindo iniciar produção...', { producao: pedidoProducaoDTO })
    }
}

export class ProducaoApiService implements ProducaoServiceInterface {
    constructor(private url: string) {}

    iniciarProducao(pedidoProducaoDTO: PedidoProducaoDTO) {
        // Fazer request para o serviço de pagamento...
        console.log('Iniciando produção via HTTP...', { url: this.url, producao: pedidoProducaoDTO })
    }
}
