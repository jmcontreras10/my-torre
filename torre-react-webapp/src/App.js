//  Imports
import AuthPage from "./UI/Pages/AuthPage";
import HomePage from "./UI/Pages/HomePage";
import {
  useScreenContext,
  useLoadingContext,
} from "./Modules/Screen/ScreenProvider";
import LoadingIndicator from "./UI/Components/LoadingIndicator/LoadingIndicator";

function App() {
  const { screen } = useScreenContext();
  const { globalLoading } = useLoadingContext();
  const getScreen = () => {
    switch (screen) {
      case 0:
        return <AuthPage />;
      case 1:
        return <HomePage />;
      default:
        return null;
    }
  };
  return (
    <div className="App">
      {globalLoading && (
        <div className="absolute top-0 left-0 flex h-screen w-screen bg-opacity-50 bg-white">
          <div className="m-auto">
            <LoadingIndicator />
          </div>
        </div>
      )}
      {getScreen()}
    </div>
  );
}

export default App;
