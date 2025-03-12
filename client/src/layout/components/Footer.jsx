import svg from '../../assets/low.svg'
import mercado from '../../assets/icons/mercado.webp'

export default function Footer() {
  const d = new Date()
  const year = d.getFullYear()
  return (
    <footer className="relative flex flex-col items-center justify-center bg-slate-800/95 py-10 text-white md:h-60">
      <div className="relative grid gap-y-10 md:grid-cols-2">
        <section className="flex w-96 flex-col items-center justify-start">
          <h2 className="text-primary-200 mb-2 text-xl font-bold">CONTACTO</h2>

          <p>consultas.eride@gmail.com</p>

          <div className="flex items-center justify-center gap-3 py-2">
            <a
              className="hover:stroke-primary-400 stroke-white object-contain"
              href=""
            >
              <svg
                width="35"
                height="35"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
              </svg>
            </a>
            <a
              className="hover:stroke-primary-400 stroke-white object-contain"
              href=""
            >
              <svg
                width="35"
                height="35"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
              </svg>
            </a>
            <a
              className="hover:stroke-primary-400 stroke-white object-contain"
              href=""
            >
              <svg
                width="35"
                height="35"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M16.5 7.5l0 .01" />
              </svg>
            </a>
          </div>
        </section>
        <section className="flex w-96 flex-col items-center justify-center">
          <h2 className="text-primary-200 mb-2 text-xl font-bold">
            PAGO SEGURO
          </h2>
          <p className="text-break h-full text-center">
            Podés pagar con tarjeta, débito y efectivo. Tus datos y las compras
            están protegidas con
          </p>
          <div className="flex items-center justify-center">
            <a
              rel="noreferrer"
              href="https://www.mercadopago.com.ar/c/pagar-online-con-mercadopago"
              target="_blank"
              className="size-max duration-300 hover:scale-105"
              aria-label="Website de Mercado Pago"
            >
              <img className="h-12 w-36 object-cover" src={mercado} alt="" />
            </a>
          </div>
        </section>
      </div>

      <p className="absolute bottom-0 w-full text-center text-sm text-gray-400">
        Copyright © 2021 - {year} Eride{' '}
      </p>

      <img
        className="absolute -z-50 size-full object-cover"
        src={svg}
        alt="Imagen de fondo del footer"
      />
    </footer>
  )
}
