import { PedidoProducaoDTO, ProducaoServiceInterface } from "src/core/pedidos/services/producao.service.interface";

export class ProducaoService implements ProducaoServiceInterface {
    iniciarProducao(pedidoProducaoDTO: PedidoProducaoDTO) {
        // Fazer request para o serviço de pagamento...
        console.log('Iniciando produção...', { producao: pedidoProducaoDTO })
    }
}
