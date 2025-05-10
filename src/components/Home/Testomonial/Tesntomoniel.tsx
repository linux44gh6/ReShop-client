/* eslint-disable react/no-unescaped-entities */
import { Star } from "lucide-react"
import Image from "next/image"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Seller",
      image: "/placeholder.svg?height=200&width=200",
      quote:
        "I've decluttered my home and made over $2,000 selling items I no longer needed. The process was so simple, and the customer service is excellent!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Buyer",
      image: "/placeholder.svg?height=200&width=200",
      quote:
        "I furnished my entire apartment with quality second-hand finds from ReShop. Saved money and found unique pieces that have so much more character than new items.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Buyer & Seller",
      image: "/placeholder.svg?height=200&width=200",
      quote:
        "As someone who cares deeply about sustainability, ReShop has been a game-changer. I love that I can both buy and sell pre-loved items in one trusted platform.",
      rating: 4,
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied buyers and sellers who are giving items a second life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-14 w-14 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
