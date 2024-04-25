import HomePage from "./app/home/home";
import { ReduxStoreProvider } from "./app/shared/state/redux-store-provider";

export default function App() {
  return (
    <ReduxStoreProvider>
      <HomePage />
    </ReduxStoreProvider>
  );
}
