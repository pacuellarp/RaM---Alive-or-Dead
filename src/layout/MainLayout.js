import Meta from "@components/Meta/Meta";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";

const Layout = ({ pageName, children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Meta pageName={pageName} />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
