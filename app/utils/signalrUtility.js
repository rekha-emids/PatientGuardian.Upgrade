import * as SignalR from '@aspnet/signalr';
import { signalRUrl } from '../services/http';
import { __TEST__ } from '../constants/config';

export const connection = __TEST__ ? () => null : new SignalR.HubConnectionBuilder()
    .withUrl(signalRUrl)
    .configureLogging(SignalR.LogLevel.Information)
    .build();

export const startConnection = () => {
    connection.start()
    .then(() => {
    }).catch((err) => {}) 
}

export const onConnectionClosed = () => {
    connection.onclose((e) => {
        startConnection()
    })
}

export const invokeSignalr = (methodName, data) => {
    connection.invoke(methodName, data)
        .catch((err) => {});
}

