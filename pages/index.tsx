import WalletStats from "@/components/wallets";


const MainPage = () => (
  <main className="p-24 min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
    <div className="max-w-5xl mx-auto pt-5 sm:pt-24 lg:pt-32">
      <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
        Portfolio Value from Debank
      </h1>
      <p className="mt-6 text-lg text-slate text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
        Combine <a href="https://debank.com/">Debank.com</a> stats for multiple wallets
      </p>
      <WalletStats/>
    </div>
  </main>
)

export default MainPage;
