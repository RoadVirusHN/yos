export interface MyHook {
  Refs: Record<string, React.RefObject<any>>
  Handlers: Record<string, Record<string, React.EventHandler>>
  Styles: Record<string, any>

}
