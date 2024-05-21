import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44330/chat", {
        accessTokenFactory: () => {
            const token = localStorage.getItem('_auth') ?? '';
            return `${token}`;
        }
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

export default connection;
