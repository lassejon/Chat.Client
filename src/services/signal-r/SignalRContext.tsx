import { createContext, useEffect, useRef, useState } from "react";
import connection from "./SignalRConnection";
import { Outlet } from 'react-router-dom';
import * as signalR from "@microsoft/signalr";
import { HubConnection } from "@microsoft/signalr";

interface SignalRContextType {
    connection: signalR.HubConnection | undefined;
}

export const SignalRContext = createContext<SignalRContextType | undefined>(undefined);

export const SignalRProvider = () => {
    const hasStartedRef = useRef(false);
    const [connectionRef, setConnection] = useState<HubConnection>();

    useEffect(() => {
        if (!hasStartedRef.current) {
            setConnection(connection);
            hasStartedRef.current = true;
        }
    }, []);

    useEffect(() => {
        if (connectionRef) {
            try {
                connectionRef.start();
            } catch (error) {
                console.error("SignalR Connection Error: ", error);
            }
        }


        return () => {
            connectionRef?.stop();
        };
    }, [connectionRef]);

    // useEffect(() => {
    //     const startConnection = async () => {
    //         try {
    //             if (connection.state === signalR.HubConnectionState.Disconnected) {
    //                 console.log("SignalR connecting...");
    //                 await connection.start();
    //                 console.log("SignalR connected");
    //             }
    //         } catch (error) {
    //             console.error("SignalR Connection Error: ", error);
    //             setTimeout(startConnection, 5000); // Retry connection after 5 seconds
    //         }
    //     };

    //     if (!hasStartedRef.current) {
    //         hasStartedRef.current = true;
    //         startConnection();
    //     }

    //     connection.onclose(async () => {
    //         await startConnection();
    //     });

    //     return () => {
    //         if (hasStartedRef.current) {
    //             connection.stop();
    //             hasStartedRef.current = false;
    //         }
    //     };
    // }, []);

    return (
        <SignalRContext.Provider value={{ connection: connectionRef }}>
            <Outlet />
        </SignalRContext.Provider>
    );
};
