import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BuildingService } from 'src/modules/building/building.service';
import { MapService } from './modules/map/map.service';
import { CityService } from './modules/city/city.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');

  private routes = {};

  constructor(
    private buildingService: BuildingService,
    private mapService: MapService,
    private cityService: CityService,
  ) {
    this.routes = {
      // 'admin:fullmap': this.mapService.getFullMap.bind(this.mapService),
      // 'map:get': this.mapService.getMap.bind(this.mapService),
      // 'map:generate': this.mapService.generateMap.bind(this.mapService),
      // 'building:place': this.buildingService.placeBuilding.bind(
      //   this.buildingService,
      // ),
      // 'building:delete': this.buildingService.deleteBuilding.bind(
      //   this.buildingService,
      // ),
      // 'city:create': this.cityService.createCity.bind(this.cityService),
      // 'city:get': this.cityService.getCity.bind(this.cityService),
    };
  }

  afterInit() {
    this.server.on('connection', (socket: Socket) => {
      socket.onAny((event: string, ...args: any) => {
        const callback =
          typeof args[args.length - 1] === 'function' ? args.pop() : undefined;
        this.handleAllEvents(socket, event, args, callback);
      });
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  async handleAllEvents(
    client: Socket,
    event: string,
    args: any[],
    callback?: Function,
  ) {
    if (!this.routes[event]) return;
    console.log('EVENT', event);
    const result = await this.routes[event](...args);
    if (callback) {
      callback(result);
    } else {
      client.emit('response', result);
    }
  }
}
