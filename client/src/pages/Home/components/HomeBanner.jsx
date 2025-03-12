import ImgBanner from '../images/main-banner.webp'
import ImgBannerMobile from '../images/banner-mobile.webp'

export default function HomeBanner () {
  return (
    <>
      <img
        src={ImgBanner}
        alt=''
        className='hidden h-[550px] w-full items-center justify-center object-cover object-center md:flex'
      />
      <img
        src={ImgBannerMobile}
        alt=''
        className='h-[300px] w-full bg-no-repeat object-cover object-center md:hidden'
      />
    </>
  )
}
