"use client"

import { useState } from "react"
import { ChevronDown, MessageSquare, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const faqs = [
        {
            question: "How long does it take to edit a video?",
            answer:
                "Our standard turnaround time is 48-72 hours for videos under 10 minutes. For longer videos or complex projects, we'll provide a custom timeline during the quote process. Rush delivery is available for an additional fee.",
        },
        {
            question: "What formats do you accept for raw footage?",
            answer:
                "We accept most video formats including MP4, MOV, AVI, WMV, and more. We recommend uploading in the highest quality possible for the best results. Our secure upload system can handle files up to 10GB.",
        },
        {
            question: "How many revisions are included?",
            answer:
                "All our packages include unlimited revisions until you're completely satisfied with the final product. We believe in delivering exactly what you envision for your content.",
        },
        {
            question: "Do you offer discounts for bulk orders?",
            answer:
                "Yes! We offer significant discounts for bulk orders and ongoing partnerships. Contact us for custom pricing if you need regular video editing services or have multiple videos to edit.",
        },
        {
            question: "What if I'm not satisfied with the final video?",
            answer:
                "Customer satisfaction is our top priority. If you're not happy with the final product, we'll continue to revise it until it meets your expectations. If we still can't meet your needs, we offer a money-back guarantee.",
        },
    ]

    return (
        <section id="faq" className="py-16 md:py-24 bg-zinc-950/50 scroll-mt-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-zinc-800/80 backdrop-blur-sm rounded-full border border-zinc-700 text-zinc-400 text-sm mb-4">
                        <ChevronDown className="h-4 w-4 mr-2 text-orange-500" />
                        Questions & Answers
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        <span className="text-white">Frequently </span>
                        <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                            Asked Questions
                        </span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base lg:text-lg">
                        Find answers to common questions about our video editing services.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`bg-zinc-800/50 backdrop-blur-sm border ${openIndex === index ? "border-orange-500/50" : "border-zinc-700/50"} rounded-xl overflow-hidden transition-colors hover:border-zinc-600`}
                            >
                                <button
                                    className="w-full flex items-center justify-between p-4 md:p-6 text-left"
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    aria-expanded={openIndex === index}
                                    aria-controls={`faq-content-${index}`}
                                >
                                    <span className="font-medium text-white text-base md:text-lg">{faq.question}</span>
                                    <div
                                        className={`h-8 w-8 rounded-full ${openIndex === index ? "bg-orange-500" : "bg-zinc-700"} flex items-center justify-center transition-all duration-300 ${openIndex === index ? "rotate-45" : ""}`}
                                    >
                                        {openIndex === index ? (
                                            <Minus className="h-4 w-4 text-white" />
                                        ) : (
                                            <Plus className="h-4 w-4 text-white" />
                                        )}
                                    </div>
                                </button>

                                <div
                                    id={`faq-content-${index}`}
                                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="p-4 md:p-6 pt-0 text-zinc-300 text-sm md:text-base">{faq.answer}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-zinc-300 mb-4">Still have questions? We&apos;re here to help.</p>
                    <Button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-4 h-auto rounded-xl flex items-center gap-2 mx-auto">
                        <MessageSquare className="h-4 w-4" />
                        Contact Support
                    </Button>
                </div>
            </div>
        </section>
    )
}

