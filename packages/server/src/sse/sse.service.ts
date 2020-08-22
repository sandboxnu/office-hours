import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Response } from 'express';
import { serialize } from 'class-transformer';

/**
 * Low level abstraction for sending SSE to "rooms" of clients.
 * Probably don't use this directly, and wrap it in a service specific to that event source
 */
@Injectable()
export class SSEService {
  private clients: Record<any, Response[]> = {};

  constructor(private connection: Connection) {}

  /** Add a client to a room */
  subscribeClient(room: string, res: Response): void {
    // Keep track of responses so we can send sse through them
    if (!(room in this.clients)) {
      this.clients[room] = [];
    }
    const roomref = this.clients[room];
    roomref.push(res);

    // Remove dead connections!
    res.socket.on('end', () => {
      roomref.splice(roomref.indexOf(res), 1);
    });
  }

  /** Send some data to everyone in a room */
  sendEvent(room: string, data: unknown): void {
    if (room in this.clients) {
      const payload = `data: ${serialize(data)}\n\n`;
      for (const res of this.clients[room]) {
        res.write(payload);
      }
    }
  }
}
