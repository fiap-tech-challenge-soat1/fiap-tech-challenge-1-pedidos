import { Controller, Inject, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PedidosController } from "src/core/pedidos/controller/pedidos.controller";
import { PedidosControllerInterface } from "src/core/pedidos/controller/pedidos.controller.interface";

@Controller('pedidos/:pedido/confirmar')
@ApiTags('pedidos')
export class PedidosConfirmadosAPI {
  constructor(
    @Inject(PedidosController)
    private readonly pedidos: PedidosControllerInterface,
  ) {}

  @ApiOperation({ summary: 'Adiciona item ao pedido' })
  @Post()
  async create(
    @Param('pedido') pedido: number,
  ) {
    return this.pedidos.confirmaPagamento(pedido)
  }
}
