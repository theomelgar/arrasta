import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative  bg-no-repeat bg-cover bg-center"
    style={{backgroundImage: `url(${"background.svg"})`}}>
      <Navbar/>
      <main className="pt-40 pb-40">
        {children}</main>
      <Footer></Footer>
    </div>
  );
};

export default MarketingLayout;
