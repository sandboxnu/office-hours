import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { serialize } from 'class-transformer';

export interface Client<T> {
  metadata: T;
  res: Response;
}
/**
 * T is metadata associated with each Client
 *
 * Low level abstraction for sending SSE to "rooms" of clients.
 * Probably don't use this directly, and wrap it in a service specific to that event source
 */
@Injectable()
export class SSEService<T> {
  private clients: Record<any, Client<T>[]> = {};

  /** Add a client to a room */
  subscribeClient(room: string, client: Client<T>): void {
    // Keep track of responses so we can send sse through them
    if (!(room in this.clients)) {
      this.clients[room] = [];
    }
    const roomref = this.clients[room];
    roomref.push(client);

    // Remove dead connections!
    client.res.socket.on('end', () => {
      roomref.splice(roomref.indexOf(client), 1);
    });
  }

  /** Send some data to everyone in a room */
  sendEvent<D>(room: string, payload: (metadata: T) => D): void {
    if (room in this.clients) {
      console.log(
        `sending sse to ${this.clients[room].length} clients in ${room}`,
      );
      console.time(`sending sse time: `);
      for (const { res, metadata } of this.clients[room]) {
        const toSend = `data: ${serialize(payload(metadata))}\n\n`;
        res.write(toSend);
      }
      console.timeEnd(`sending sse time: `);
    }
  }
}
