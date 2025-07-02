"use client"

import { useState } from "react"
import { ChevronDown, Plus, Trash2 } from "lucide-react"
import Navbar from "../components/navbar/page"
import Link from "next/link";

export default function OrderPage() {
    const [quantities, setQuantities] = useState([1, 1, 1])

    const increaseQuantity = (index: number) => {
        const newQuantities = [...quantities]
        newQuantities[index] += 1
        setQuantities(newQuantities)
    }

    const decreaseQuantity = (index: number) => {
        const newQuantities = [...quantities]
        if (newQuantities[index] > 1) {
            newQuantities[index] -= 1
            setQuantities(newQuantities)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation Bar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow py-8 mt-32">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Product Details */}
                        <div className="lg:w-3/5">
                            <h2 className="text-4xl font-bold text-[#1e5aa8] mb-6">Product Details</h2>
                            <div className="border border-black rounded-lg p-4">
                                {[0, 1, 2].map((index) => (
                                    <div
                                        key={index}
                                        className={`bg-[#e6eaf2] rounded-lg p-4 flex items-center ${index === 2 ? "" : "mb-4"}`}
                                    >
                                        <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center mr-4">
                                            <img
                                                src="/placeholder.svg?height=80&width=80"
                                                alt="Stack of books"
                                                className="h-20 w-20 object-contain"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-2xl font-bold text-[#000000]">Speech Therapy Flashcards</h3>
                                            <p className="text-sm text-[#5a7ab8]">
                                                A set of Speech Therapy flashcards to aid communication skills in children.
                                            </p>
                                            <p className="text-xl font-bold text-[#d94d99] mt-2">₹ 21.45</p>
                                        </div>
                                        <div className="flex flex-col items-center ml-4 bg-white">
                                            <button
                                                onClick={() => increaseQuantity(index)}
                                                className="text-[#1e5aa8] hover:bg-[#d1daea] p-1 rounded"
                                            >
                                                <Plus size={20} />
                                            </button>
                                            <div className="bg-[#1e5aa8] text-white font-bold w-8 h-8 flex items-center justify-center my-1">
                                                {quantities[index]}
                                            </div>
                                            <button className="text-[#1e5aa8] hover:bg-[#d1daea] p-1 rounded">
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-2/5">
                            <h2 className="text-4xl font-bold text-[#1e5aa8] mb-6">Order Summary</h2>
                            <div className="border border-black rounded-4xl p-10">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">Product total</span>
                                        <span className="font-medium">550000</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">Disscount</span>
                                        <span className="font-medium">%6 (₹12.25)</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                        <span className="text-gray-700">Delivery fee</span>
                                        <span className="font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-xl font-bold text-[#1e5aa8]">Total</span>
                                        <span className="text-xl font-bold text-[#1e5aa8]">₹ 112.25</span>
                                    </div>
                                    <Link   href={'/booking-form'}>
                                        <div>
                                            <button className="w-full bg-[#d94d99] hover:bg-[#c23c85] text-white font-bold py-3 px-4 rounded-3xl mt-4">
                                            Order
                                        </button>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
