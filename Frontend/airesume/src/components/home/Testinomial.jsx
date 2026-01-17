import React, { use } from 'react'
import Title from './Title'
import { BookUser, Check, CircleCheck, Zap } from 'lucide-react'

const Testinomial = () => {
    const Userarray = [
        {
            title: "Radiant made undercutting all of our competitors an absolute breeze.",
            name: "Richard Nelson",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            post: "CTO ,slack"
        },
        {
            title: "This platform helped us launch our product twice as fast as expected.",
            name: "Ava Johnson",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",

            post: "Product Manager"
        },
        {
            title: "Incredible support and a fantastic experience from start to finish.",
            name: "Liam Carter",
            image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",

            post: "CEO, BrightTech"
        },
        {
            title: "Our team’s productivity skyrocketed after switching to this solution.",
            name: "Sophia Lee",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=60",
            post: "Engineering Lead"
        },
        {
            title: "A seamless integration that saved us countless developer hours.",
            name: "Noah Patel",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60",
            post: "CTO, DevWorks"
        },
        {
            title: "The user experience is outstanding and setup was a breeze.",
            name: "Oliver Brooks",
            image: "https://images.unsplash.com/photo-1507003211169-e695c6bdd610?w=200&auto=format&fit=crop&q=60",
            post: "Marketing Director"
        }

    ]
    console.log(Userarray)

    return (

        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <div id='testimonials' className="flex flex-col items-center my-10 mt-12   ">
                <div className="flex items-center mx-auto gap-2 text-sm text-green-800 bg-blue-400/10 border border-indigo-200 rounded-full  px-4 py-1">
                    <BookUser width={16} />
                    <span>Testinomials </span>
                </div>
                <Title title="See Our Users" description="We have collected some testimonials from our users. They are real people who have used our product. " />
                <section className="flex flex-col items-start px-6 md:px-16 lg:px-24 text-sm max-w-6xl mx-auto">
                  

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                        {Userarray.map((user, index) => {
                            return <div className="border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
                                <p className="text-sm text-slate-500">{user.title}
                                </p>
                                <div className="flex items-center gap-3 mt-8">
                                    <img className="size-12 rounded-full" src={user.image} alt="user image" />
                                    <div>
                                        <h2 className="flex items-center gap-2 text-base text-gray-900 font-medium">
                                            {user.name}
                                            <CircleCheck width={15} className='text-blue-400' />
                                        </h2>
                                        <p className="text-gray-500">{user.post}</p>
                                    </div>
                                </div>
                            </div>
                        })}


                    </div>
                </section>
            </div>
        </>
    )
}

export default Testinomial
