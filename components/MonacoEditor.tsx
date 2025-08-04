import NativeMonacoEditor from "@monaco-editor/react";

interface MonacoEditorProps
  extends React.ComponentProps<typeof NativeMonacoEditor> {
  value: string;
  setValue: (value: string) => void;
}

export default function MonacoEditor({
  value,
  setValue,
  ...editorProps
}: MonacoEditorProps) {
  return (
    <NativeMonacoEditor
      height="100%"
      {...editorProps}
      language={editorProps.language || "markdown"}
      theme="gh-light"
      value={value}
      onChange={(value, event) => {
        setValue(value || "");
        editorProps.onChange?.(value || "", event);
      }}
      onMount={(editor, monaco) => {
        // Custom keybinding for Mac Cmd+Z (undo)
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyZ, () => {
          editor.trigger("keyboard", "undo", null);
        });

        // Custom keybinding for Mac Cmd+Shift+Z (redo)
        editor.addCommand(
          monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyZ,
          () => {
            editor.trigger("keyboard", "redo", null);
          }
        );

        editorProps.onMount?.(editor, monaco);
      }}
      options={{
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 13,
        lineNumbers: "on",
        wordWrap: "on",
        automaticLayout: true,
        tabSize: 2,
        insertSpaces: true,
        formatOnPaste: true,
        formatOnType: true,
        stickyScroll: { enabled: false },
        quickSuggestions: false,
        ...editorProps.options,
      }}
    />
  );
}
