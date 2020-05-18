/**
 * This is in module to provent multiple connections
 */
import io from "socket.io-client";

export const socket = io();
