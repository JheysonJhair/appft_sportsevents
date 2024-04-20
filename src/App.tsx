import AppRouter from "./routes";
import { AuthProvider } from './hooks/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
