import NavBar from "./NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="grid place-content-center mt-5 w-full">{children}</div>
    </>
  );
};

export default Layout;
