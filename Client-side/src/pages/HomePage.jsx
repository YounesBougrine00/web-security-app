import Header from "../components/Header";
import "../style/homepage.css";

function HomePage() {
  return (
    <div className="home">
      <Header />
      <h1 className="welcome">Welcome!</h1>
      <h2 className="title">Order Management System</h2>
      <p className="desc">
        Manage and organize all of your clients and orders with simple clicks
      </p>
    </div>
  );
}
export default HomePage;
