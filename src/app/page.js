'use client'
import Image from "next/image"
import gsap from 'gsap'
import { useEffect, useRef } from "react"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from "split-type"

export default function Home() {
    const sectionHeroRef = useRef(null)
    const titleHeroRef = useRef(null)
    const sectionRef = useRef(null)
    const sectionUneRef = useRef(null)
    const sectionDosRef = useRef(null)
    const titleSectionDosRef = useRef(null)

    gsap.registerPlugin(ScrollTrigger)

    useEffect(() => {
        // Obtener referencias actuales
        const sectionHeroRefCurrent = sectionHeroRef.current
        const titleHeroRefCurrent = titleHeroRef.current
        const sectionUneRefCurrent = sectionUneRef.current
        const sectionDosRefCurrent = sectionDosRef.current
        const titleSectionDosRefCurrent = titleSectionDosRef.current

        // Dividir texto en caracteres
        const heroSplit = new SplitType(sectionHeroRefCurrent)
        const titleSplit = new SplitType(titleHeroRefCurrent)
        const uneSplit  = new SplitType(sectionUneRefCurrent)
        const dosSplit  = new SplitType(titleSectionDosRefCurrent)

        // Establecer posición inicial para los caracteres de la sección Hero
        gsap.set([...heroSplit.chars, ...titleSplit.chars], { y: 100 })

        // Animar caracteres de la sección Hero
        gsap.to([...heroSplit.chars, ...titleSplit.chars], {
            y: 0,
            stagger: 0.05,
            delay: 0.2,
            duration: 0.6,
            ease: 'power2.out'
        })

        // Establecer posición inicial para los caracteres de la Sección 1
        gsap.set(uneSplit.chars, { y: 100 })

        // Animar caracteres de la Sección 1 cuando se haga scroll
        gsap.to(uneSplit.chars, {
            y: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 30%',
                markers: true,
                toggleActions: 'play reverse play reverse'
            }
        })

        // Crear una línea de tiempo para el cambio de color en la Sección 1
        const sectionOneColorTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                toggleActions: 'play reverse play reverse',
            }
        })

        // Animar el color de fondo de la sección de negro a blanco
        sectionOneColorTimeline.to(sectionRef.current, {
            backgroundColor: "#FFFFFF", // Cambia el fondo a blanco
            duration: 1,
            ease: 'power2.out',
        }, 0)

        // Animar el color del texto de la sección de blanco a negro
        sectionOneColorTimeline.to(sectionUneRef.current, {
            color: "#000000", // Cambia el texto a negro
            duration: 1,
            ease: 'power2.out',
        }, 0)

        // Establecer posición inicial para los caracteres de la Sección 2
        gsap.set(dosSplit.chars, { y: 100 })

        // Animar caracteres de la Sección 2 cuando se haga scroll
        gsap.to(dosSplit.chars, {
            y: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: sectionDosRefCurrent,
                start: 'top 20%',
                markers: true,
                toggleActions: 'play reverse play reverse'
            }
        })
    }, [])

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <main className="flex flex-col row-start-2 items-center sm:items-start w-full min-h-screen">
                <section className="flex flex-col justify-center items-center w-full h-screen bg-white">
                    <h1 className="text-8xl font-bold">
                        <div
                            ref={sectionHeroRef}
                            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
                        >
                            Esto es ejemplo<br/>
                        </div>
                        <div
                            ref={titleHeroRef}
                            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
                        >
                            De efecto con GSAP
                        </div>
                    </h1>
                </section>
                <section
                    ref={sectionRef}
                    className="flex flex-col justify-center items-center w-full h-screen"
                    style={{ backgroundColor: '#000000' }} // Color de fondo inicial negro
                >
                    <h2
                        ref={sectionUneRef}
                        className="text-4xl"
                        style={{ color: '#FFFFFF' }} // Color de texto inicial blanco
                    >
                        Sección 1
                    </h2>
                </section>
                <section
                    ref={sectionDosRef}
                    className="flex flex-col justify-center items-center w-full h-screen bg-indigo-600"
                >
                    <h2
                        ref={titleSectionDosRef}
                        className="text-4xl"
                    >
                        Sección 2
                    </h2>   
                </section>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center bg-slate-600 w-full h-24">
                {/* Contenido del pie de página */}
            </footer>
        </div>
    )
}
