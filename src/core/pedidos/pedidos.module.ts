import { Module } from '@nestjs/common';
import { PedidosAPI } from '../../externals/apis/pedidos.api';
import { PedidosService } from './pedidos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Item } from './entities/item.entity';
import { ProdutosModule } from '../produtos/produtos.module';
import { ClientesModule } from '../clientes/clientes.module';
import { PedidoAggregateFactory } from './aggregates/pedido.aggregate.factory';
import { PedidoItensAPI } from 'src/externals/apis/pedido_itens.api';
import { ProdutosService } from '../produtos/produtos.service';
import { PedidosRepository } from 'src/externals/repositories/pedidos.repository';
import { PedidosServiceInterface } from './pedido.service.interface';
import { PedidosController } from './controller/pedidos.controller';
import { PedidosControllerInterface } from './controller/pedidos.controller.interface';
import { PedidosConfirmadosAPI } from 'src/externals/apis/pedidos_confirmados.api';
import { PagamentosServiceInterface } from './services/pagamentos.service.interface';
import { PagamentosAPIService, PagamentosService } from 'src/externals/services/pagamentos.service';
import { ProducaoServiceInterface } from './services/producao.service.interface';
import { ProducaoApiService, ProducaoService } from 'src/externals/services/producao.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Item]),
    ProdutosModule,
    ClientesModule,
    ConfigModule,
  ],
  controllers: [
    PedidosAPI,
    PedidoItensAPI,
    PedidosConfirmadosAPI,
  ],
  providers: [
    PedidoAggregateFactory,
    PedidosService,
    {
      provide: PedidosServiceInterface,
      useClass: PedidosService,
    },
    ProdutosService,
    PedidosRepository,
    PedidosController,
    {
      provide: PedidosControllerInterface,
      useClass: PedidosController,
    },

    {
        provide: PagamentosServiceInterface,
        useClass: PagamentosService,
    },
    {
        provide: PagamentosService,
        useFactory(config: ConfigService) {
            if (config.getOrThrow<string>('PAGAMENTOS_PROVIDER') === 'fake') {
                return new PagamentosService();
            }

            return new PagamentosAPIService(config.getOrThrow<string>('PAGAMENTOS_API_URL'));
        },
        inject: [ConfigService],
    },
    {
        provide: ProducaoServiceInterface,
        useClass: ProducaoService,
    },
    {
        provide: ProducaoService,
        useFactory(config: ConfigService) {
            if (config.getOrThrow<string>('PRODUCAO_PROVIDER') === 'fake') {
                return new ProducaoService();
            }

            return new ProducaoApiService(config.getOrThrow<string>('PRODUCAO_API_URL'));
        },
        inject: [ConfigService],
    },
  ],
  exports: [PedidosRepository],
})
export class PedidosModule {}
