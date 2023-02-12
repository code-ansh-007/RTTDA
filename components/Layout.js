import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props) {
  const { children } = props;
  return (
    <>
      <div className="flex flex-col min-h-screen relative bg-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
