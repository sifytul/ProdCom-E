import Countdown from '@/components/Countdown'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

type Props = {}

const PromotionBanner = (props: Props) => (
    <div className='md:container'>


    <div className='grid grid-cols-1 lg:grid-cols-2'>
        
        {/* image placeholder */}
        <div className='bg-white-100'>
            <Image src='/assets/images/sofa.png' width={300} height={300} style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
            }} alt='banner image'/>
        </div>
        {/* content  */}

            
        <div className='flex flex-col justify-center py-6 px-8 md:px-16 bg-black text-white  min-h-[370px]'>
            <div className='space-y-4'>

            <div className='space-y-4'>
            <h3 className='text-accent'>Promotion</h3>
            <h1 className='text-3xl md:text-[40px] font-medium'>Hurry Up! 40% OFF</h1>
            <p className='text-sm md:text-base'>Thousands of high quality furniture are waiting for you</p>


            </div>
            {/* Countdown timer  */}
            <div>
                <p className='text-sm'>Offer expires in</p>
            </div>

            <Countdown />
            <Button variant={"accent"}>Shop Now</Button>
        </div>
            </div>
    </div>
    </div>
)

export default PromotionBanner