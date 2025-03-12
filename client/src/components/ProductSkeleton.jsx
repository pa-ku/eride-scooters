export default function ProductSkeleton () {
  return (
    <>
      <div className='relative flex rounded-xl p-2 shadow-md duration-300 hover:shadow-lg md:block md:w-60'>
        <div className='animate-skeleton size-28 rounded-xl bg-gray-300 md:h-52 md:w-full' />
        <div className='flex flex-col gap-1 px-2 py-2 md:px-0'>
          <span className='animate-skeleton h-6 w-44 rounded-xl' />
          <span className='animate-skeleton h-6 w-20 rounded-xl' />
          <span className='animate-skeleton h-6 w-28 rounded-xl' />
        </div>
      </div>
    </>
  )
}
