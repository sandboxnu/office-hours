/**
 * singleton websocket manager to wrap socketio and make it accessible in api routers
 */

import { WSMessageType } from "@template/common";

class WebsocketManager {
  private io: SocketIO.Server;
  private connected: number = 0;

  bindSocketIO(io: SocketIO.Server) {
    this.io = io;
    io.on("connection", (client) => {
      console.log(client.id, "connected");
      this.connected++;

      io.emit(WSMessageType.Count, this.connected);

      client.on("disconnect", () => {
        console.log(client.id, "disconnected");
        this.connected--;
        io.emit(WSMessageType.Count, this.connected);
      });
    });
  }

  /**
   * send message to everyone
   */
  emitAll(msgType: WSMessageType, msg: any) {
    this.io.emit(msgType, msg);
  }
}
export default new WebsocketManager();
