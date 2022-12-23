// import RouteLocationProvider from '@/providers/RouteLocationProvider';
import AppRoutes from '@/router/routes';

const App = () => {
  return (
    <div className="App">
      {/* <RouteLocationProvider> */}
      <AppRoutes />
      {/* </RouteLocationProvider> */}
    </div>
  );
};

export default App;
