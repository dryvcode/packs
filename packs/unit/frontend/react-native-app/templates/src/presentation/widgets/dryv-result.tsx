import { Text, View } from "react-native";

type Result = { ok: true; data: unknown } | { ok: false; message: string };

function Value({ value, select }: { value: unknown; select: readonly string[] }) {
  if (Array.isArray(value)) {
    return (
      <View style={{ gap: 8 }}>
        {value.map((item, index) => (
          <View key={index} style={{ borderWidth: 1, borderColor: "#eee", borderRadius: 6, padding: 8 }}>
            <Value value={item} select={select} />
          </View>
        ))}
      </View>
    );
  }
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value).filter(([key]) => select.length === 0 || select.includes(key));
    return (
      <View style={{ gap: 2 }}>
        {entries.map(([key, item]) => (
          <Text key={key}>
            <Text style={{ fontWeight: "600" }}>{key}: </Text>
            {typeof item === "object" ? JSON.stringify(item) : String(item)}
          </Text>
        ))}
      </View>
    );
  }
  return <Text>{value === undefined || value === null ? "" : String(value)}</Text>;
}

/** Shows an operation's result: its fields (only `select` when given), or the error. */
export function DryvResult({ result, select = [] }: { result: Result | undefined; select?: readonly string[] }) {
  if (result === undefined) return null;
  if (!result.ok) return <Text style={{ color: "#b91c1c" }}>{result.message}</Text>;
  return <Value value={result.data} select={select} />;
}
