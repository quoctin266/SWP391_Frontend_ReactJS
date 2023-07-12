import React from 'react'
import Image from '../../../assets/image/BlogBanner.jpg'
import './Blog.scss'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
import { Facts } from './RandomFact'

const Blog = () => {
  return (
    <div className='Blog-Container'>
        <div className='Blog-Box'>
            <div className='Blog-Header'>
                <h1 className='Header'>Scam Alert: How to Get a Pet and Not Get Taken</h1>
                <p className='Subtext'>Essential Tips to Safely Bring Home Your Feathered Companion</p>
            </div>
            <img src={Image} className='Blog-Banner' alt="Banner"/>
            <div className='Blog-Content'>
                <div className='Introduction'>
                    <p className='Introduction-Header'><VscDebugBreakpointLog />Introduction</p>
                    <p className='Introduction-Content'>
                        Bringing a pet bird into your home can be a delightful and rewarding experience.
                        However, with the rise of online scams and unethical practices, it is essential to be
                        cautious when acquiring a feathered friend. This blog aims to guide you through the
                        process of getting a pet bird while avoiding potential scams and ensuring the well-being
                        of your future avian companion.
                    </p>
                </div>
                <div className='Content'>
                    <p className='Content-Header'>1.Research and Choose Reputable Sources</p>
                    <p className='Content-Content'>
                    To ensure a safe and ethical acquisition of a pet bird, conducting thorough research is 
                    paramount. Take the time to familiarize yourself with different bird species, their specific 
                    care requirements, and common health concerns. This knowledge will enable you to make an 
                    informed decision and choose a bird that aligns with your capabilities and lifestyle. When 
                    seeking a reputable source, consider established pet stores, reputable breeders, or avian 
                    rescue organizations. These sources have a track record of providing proper care, prioritizing 
                    the well-being of their birds, and offering support and guidance to new bird owners.
                    </p>
                </div>
                <div className='Content'>
                    <p className='Content-Header'>2.In-person Visits and Proper Documentation</p>
                    <p className='Content-Content'>
                    To avoid falling prey to scams, it is crucial to insist on in-person visits and obtain proper 
                    documentation when acquiring a pet bird. Physical interaction allows you to assess the bird's 
                    health, behavior, and overall condition. Pay attention to signs of good health, such as bright 
                    eyes, clean feathers, and alertness. Additionally, inspect the breeder or seller's facilities 
                    to ensure cleanliness and proper care practices. Request comprehensive documentation, including 
                    health records detailing vaccinations, parasite treatments, and any existing medical conditions. 
                    Legitimate identification, such as closed leg bands or microchip information, will validate the 
                    bird's lineage and authenticity. Ownership papers, such as certificates or registration documents, 
                    should be obtained if applicable to confirm the bird's legal status.
                    </p>
                </div>
                <div className='Conclusion'>
                    <p className='Conclusion-Header'><VscDebugBreakpointLog />Conclusion:</p>
                    <p className='Conclusion-Content'>
                    Obtaining a pet bird should be a well-informed and cautious process to safeguard against scams 
                    and ensure the well-being of your new feathered companion. By conducting thorough research, 
                    choosing reputable sources, insisting on in-person visits, and obtaining proper documentation, 
                    you can significantly reduce the risk of falling victim to unscrupulous practices. Remember, 
                    responsible ownership involves not only providing a loving home but also ensuring the bird's 
                    health, happiness, and overall quality of life.
                    </p>
                </div>
            </div>
            {/* This code runs on map. No need to pay attention to this */}
            <div className='RandomFact'>
                    <h1>Random Bird Fact</h1>
                    <p>{Facts[Math.floor(Math.random() * Facts.length)].Message}</p>
            </div>
        </div>
    </div>
  )
}

export default Blog