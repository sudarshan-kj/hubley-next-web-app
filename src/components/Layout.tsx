import Header from "./Header";

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;
