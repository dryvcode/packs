import { useState } from "react";
import { Pressable, Switch, Text, TextInput, View } from "react-native";

/** One form field, generated from a schema field. `name` is the JSON key the API expects. */
export type DryvField = {
  name: string;
  label: string;
  kind: "text" | "number" | "boolean" | "date" | "choice";
  required: boolean;
  options?: readonly string[];
};

type Result = { ok: boolean; message?: string };

/** A form built from fields; submitting sends the collected JSON values. */
export function DryvForm({
  fields,
  onSubmit,
  submitLabel = "Submit",
}: {
  fields: readonly DryvField[];
  onSubmit: (values: Record<string, unknown>) => Promise<Result>;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const set = (name: string, value: unknown) => setValues((current) => ({ ...current, [name]: value }));

  async function submit() {
    const missing = fields.find((field) => field.required && (values[field.name] ?? "") === "");
    if (missing) return setMessage(`${missing.label} is required`);
    setBusy(true);
    setMessage(null);
    const result = await onSubmit(values);
    setBusy(false);
    if (!result.ok) setMessage(result.message ?? "Request failed");
  }

  return (
    <View style={{ gap: 12 }}>
      {fields.map((field) => (
        <View key={field.name} style={{ gap: 4 }}>
          <Text>{field.label}</Text>
          {field.kind === "boolean" ? (
            <Switch value={values[field.name] === true} onValueChange={(value) => set(field.name, value)} />
          ) : field.kind === "choice" ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {(field.options ?? []).map((option) => (
                <Pressable key={option} onPress={() => set(field.name, option)}>
                  <Text style={{ fontWeight: values[field.name] === option ? "700" : "400" }}>{option}</Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <TextInput
              style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8 }}
              placeholder={field.kind === "date" ? "YYYY-MM-DD" : undefined}
              keyboardType={field.kind === "number" ? "numeric" : "default"}
              onChangeText={(text) => set(field.name, field.kind === "number" ? (text === "" ? undefined : Number(text)) : text)}
            />
          )}
        </View>
      ))}
      <Pressable disabled={busy} onPress={submit} style={{ backgroundColor: "#4f46e5", padding: 12, borderRadius: 8 }}>
        <Text style={{ color: "white", textAlign: "center" }}>{busy ? "…" : submitLabel}</Text>
      </Pressable>
      {message ? <Text style={{ color: "#b91c1c" }}>{message}</Text> : null}
    </View>
  );
}
