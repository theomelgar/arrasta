import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full bg-no-repeat bg-cover bg-top"
    style={{backgroundImage: `url(${"background.svg"})`}}>
      <Navbar/>
      <main className="pt-40 pb-20">
        {children}</main>
      <Footer></Footer>
    </div>
  );
};

export default MarketingLayout;
