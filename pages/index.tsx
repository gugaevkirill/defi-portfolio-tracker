import Image from 'next/image'
import WalletStats from "../modules/wallets";


const MainPage = () => (
  <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
    <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
        Portfolio Value from Debank
      </h1>
      <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
        Combine <a href="https://debank.com/">Debank.com</a> stats for multiple wallets
      </p>
      <WalletStats/>
    </div>
  </main>
)

export default MainPage;
