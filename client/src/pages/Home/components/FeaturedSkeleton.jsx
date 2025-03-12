export default function FeaturedSkeleton () {
  return (
    <>
      <div className='flex w-max flex-col-reverse gap-5 md:flex-row'>
        <div className='space-y-2'>
          <div className='animate-skeleton h-8 w-32 rounded-lg' />
          <div className='animate-skeleton h-8 w-32 rounded-lg' />
          <div className='animate-skeleton h-44 w-96 rounded-lg' />
          <div className='animate-skeleton h-14 w-full rounded-lg md:w-36' />
        </div>
        <div className='animate-skeleton rounded-lx h-96 w-full rounded-lg md:size-96' />
      </div>
    </>
  )
}
