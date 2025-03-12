import imgAbout1 from './images/imgAbout1.webp'
import imgAbout2 from './images/imgAbout2.webp'

export default function About () {
  return (
    <>
      <main className='flex size-full flex-col items-center justify-center gap-20 bg-[#f5f5f5] py-20'>
        <h1 className='title'>Conocé E-Ride</h1>
        <div className='flex max-w-[45em] flex-col items-center space-y-2 text-start md:flex-row'>
          <p>
            En el corazón de la pintoresca provincia de San Juan, Argentina, se
            encuentra E-ride, tu destino definitivo para explorar el emocionante
            mundo de la movilidad electrica. Si sos un amante de la aventura,
            E-ride tiene todo lo que necesitas para comenzar tu viaje.
          </p>
          <img
            width={350}
            className='rounded-lg object-contain'
            src={imgAbout1}
            alt='Imagen de san juan'
          />
        </div>

        <div className='max-w-[45em] space-y-2 text-start'>
          <h2 className='subtitle'>Calidad Inigualable</h2>
          <p>
            Nos enorgullece ofrecer una amplia gama de scooters de la más alta
            calidad. Cada monopatin que vendemos está cuidadosamente
            seleccionada por su durabilidad, rendimiento, lo que garantiza que
            obtengas el máximo valor por tu inversión.
          </p>
        </div>

        <div className='flex max-w-[45em] flex-col items-start space-y-2 text-start'>
          <h2 className='subtitle'>Comodidad en Línea</h2>
          <p>
            Sabemos que tu tiempo es valioso. Es por eso que hemos creado una
            plataforma de compras en línea intuitiva y segura que te permite
            explorar nuestra selección, hacer pedidos y realizar pagos sin
            problemas desde la comodidad de tu hogar.
          </p>
          <img
            width={1080}
            height={720}
            className='w-full rounded-lg object-contain'
            src={imgAbout2}
            alt=''
          />
        </div>
      </main>
    </>
  )
}
