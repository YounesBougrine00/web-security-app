import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Clients from "./pages/Clients";
import ClientDetails from "./pages/ClientDetails";
import OrderDetails from "./pages/OrderDetails";
import AddOrder from "./pages/AddOrder";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import ClientOrders from "./pages/ClientOrders";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={HomePage} exact path="/" />
        <Route component={Clients} exact path="/clients" />
        <Route component={ClientDetails} exact path="/clients/:id" />
        <Route component={OrderDetails} exact path="/orders/:id" />
        <Route component={AddOrder} exact path="/add-order/:id" />
        <Route component={Orders} exact path="/orders" />
        <Route component={ClientOrders} exact path="/client-orders/:id" />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
