import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

type ReduxStoreProviderProps = { children?: ReactNode };

export function ReduxStoreProvider({
  children,
}: Readonly<ReduxStoreProviderProps>) {
  return <Provider store={store}>{children}</Provider>;
}
