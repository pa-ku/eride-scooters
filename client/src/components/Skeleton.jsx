import erideLogo from '#assets/icons/logo.webp'
export default function Skeleton () {
  return (
    <div className='flex-block flex h-screen w-full animate-pulse items-center justify-center text-black invert'>
      <img
        width={480}
        height={200}
        className='animate-pulse object-contain'
        src={erideLogo}
        alt='Logo Eride'
      />
    </div>
  )
}
