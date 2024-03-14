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
import { ProducaoServiceInterface } from './services/producao.service.interface';
import { ProducaoApiService, ProducaoService } from 'src/externals/services/producao.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { PedidoPagamentosAPI } from 'src/externals/apis/pedido_pagamentos.api';
import { PubSubService } from 'src/externals/channels/pubsub.service';
import { ConfirmarPagamentoChannel } from 'src/externals/channels/confirmar.pagamento.channel';
import { SolicitarPagamentoChannel } from 'src/externals/channels/solicitar.pagamento.channel';
import { FinalizarPedidoChannel } from 'src/externals/channels/finalizar.pedido.channel';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Item]),
    ProdutosModule,
    ClientesModule,
    ConfigModule,
    HttpModule
  ],
  controllers: [
    PedidosAPI,
    PedidoItensAPI,
    PedidoPagamentosAPI,
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
        provide: ProducaoServiceInterface,
        useClass: ProducaoService,
    },
    {
        provide: ProducaoService,
        useFactory(config: ConfigService, http: HttpService) {
            if (config.getOrThrow<string>('PRODUCAO_PROVIDER') === 'fake') {
                return new ProducaoService();
            }

            return new ProducaoApiService(config.getOrThrow<string>('PRODUCAO_API_URL'), http);
        },
        inject: [ConfigService, HttpService],
    },
    PubSubService,
    ConfirmarPagamentoChannel,
    SolicitarPagamentoChannel,
    FinalizarPedidoChannel,
  ],
  exports: [PedidosRepository],
})
export class PedidosModule {}
