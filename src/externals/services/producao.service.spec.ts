import { HttpService } from "@nestjs/axios"
import { AxiosResponse } from "axios"
import { of, throwError } from "rxjs"
import { ProducaoServiceIndisponivelException } from "src/core/pedidos/exceptions/servicos.exception"
import { ProducaoApiService, ProducaoFactory, ProducaoService } from "./producao.service"
import { PedidoProducaoDTO } from "src/core/pedidos/services/producao.service.interface"
import { Pedido } from "src/core/pedidos/entities/pedido.entity"
import { ConfigService } from "@nestjs/config"

describe('ProducaoService', () => {
    let serviceUrl = 'http://example.com/producao-service'
    let http: HttpService

    let pedido: PedidoProducaoDTO

    beforeEach(() => {
        let entity = new Pedido
        entity.itens = []
        entity.id = 123
        pedido = PedidoProducaoDTO.fromEntity(entity)
    })

    it('creates correct client via factories', async () => {
        expect(ProducaoFactory(new ConfigService({
            PRODUCAO_PROVIDER: 'fake',
        }), null)).toBeInstanceOf(ProducaoService);

        expect(ProducaoFactory(new ConfigService({
            PRODUCAO_PROVIDER: 'api',
            PRODUCAO_API_URL: 'http://example.com',
        }), null)).toBeInstanceOf(ProducaoApiService);
    });

    it('requests producao calls external service with success', async () => {
        http = new HttpService()

        let usedUrl, usedData, usedConfig
        jest.spyOn(http, 'post').mockImplementation((url, data, config) => {
            usedUrl = url
            usedData = data
            usedConfig = config
            return of({
                data: ['OK'],
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {}
            } as AxiosResponse)
        })

        await new ProducaoApiService(serviceUrl, http).iniciarProducao(pedido)

        expect(usedUrl).toEqual(serviceUrl)
        expect(usedData).toEqual(pedido.toPayload())
        expect(usedConfig).toEqual({ timeout: 30_000, headers: { Accept: 'application/json' , "Content-Type": 'application/json'}})
    })

    it('requests producao calls external service with failure', async () => {
        http = new HttpService()

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
        jest.spyOn(http, 'post').mockImplementation(() => {
            return throwError(() => new Error('Something went wrong'))
        })

        try {
            await new ProducaoApiService(serviceUrl, http).iniciarProducao(pedido)
            fail('should have failed')
        } catch (error) {
            expect(error).toBeInstanceOf(ProducaoServiceIndisponivelException)
        }

        expect(consoleSpy).toHaveBeenCalled()
        consoleSpy.mockRestore()
    })
})
