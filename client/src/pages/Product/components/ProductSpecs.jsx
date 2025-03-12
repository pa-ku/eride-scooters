import React from "react";

export default function ProductSpecs ({ specs }) {
  return (
    <>
      <section className='flex min-h-96 flex-col items-center justify-center gap-5 px-2 py-10'>
        <div className='flex w-full flex-col gap-10 p-10 md:w-[45em]'>
          <h2 className='subtitle w-full text-center'>ESPECIFICACIONES</h2>
          <div className=''>
            {specs.map(({ category, name, info }) => (
              <React.Fragment key={name}>
                {category && (
                  <p className='pt-10 text-lg font-extrabold uppercase text-primary-800'>
                    {category}
                  </p>
                )}
                <div className='grid grid-cols-2 border-b border-gray-200 p-2'>
                  <p className='text-primary-600'>{name}</p>
                  <p>{info}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
