import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QRGenerator } from "@/components/qr-generator/qr-generator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <QRGenerator />
      </main>

      <Footer />
    </div>
  );
}
