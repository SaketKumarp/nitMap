import { server } from "@/names/name";
import { io } from "socket.io-client";

export const socket = io(server)
