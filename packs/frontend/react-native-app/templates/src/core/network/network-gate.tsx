import { useNetInfo } from "@react-native-community/netinfo";
import type { ReactNode } from "react";
import { Text, View } from "react-native";

/** Shows children while the device is online, and a reconnect message while it isn't. */
export function NetworkGate({ children, message }: { children: ReactNode; message?: string }) {
  const { isConnected } = useNetInfo();
  if (isConnected === false) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <Text>{message ?? "This screen needs an internet connection. Reconnect to continue."}</Text>
      </View>
    );
  }
  return <>{children}</>;
}
