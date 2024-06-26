import { CreatePedidoDto } from 'src/externals/apis/dto/create-pedido.dto';
import { ItemVO } from './../vo/item.vo';
import { UpdatePedidoItemDto } from 'src/externals/apis/dto/update-pedido-item.dto';
import { Pedido } from '../entities/pedido.entity';

export interface PedidosControllerInterface {
  findAll();
  findOne(id: number);
  create(input: CreatePedidoDto): Promise<Pedido>;
  addItem(id: number, item: ItemVO);
  updateItem(pedidoId: number, itemId: number, input: UpdatePedidoItemDto);
  findOneItem(id: number);
  removeItem(pedidoId: number, id: number);
  solicitarPagamento(pedidoId: number);
  finalizar(pedidoId: number);
}
export const PedidosControllerInterface = Symbol('PedidosControllerInterface');
