import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AboutStoryPage() {
  return (
    <main className="bg-white min-h-screen flex flex-col gap-0 py-12 px-4 font-sans">
      {/* About Section */}
      <section
        id="about"
        className="flex items-center justify-center py-8 bg-gradient-to-br from-white via-[#e6faf3] to-[#f6fffc] "
      >
        <Card className="max-w-3xl w-full border border-[#10b981]/20 shadow-lg rounded-3xl bg-white/95">
          <CardContent className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
            {/* SVG/Illustration */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <svg width="120" height="120" viewBox="0 0 145 145" fill="none">
                <ellipse cx="72" cy="72" rx="56" ry="52" fill="#10b981" opacity="0.08"/>
                <g>
                  <rect x="32" y="80" width="53" height="28" rx="9" fill="#10b981" opacity="0.15"/>
                  <rect x="38" y="42" width="69" height="54" rx="18" fill="#10b981"/>
                  <ellipse cx="59" cy="75" rx="12" ry="14" fill="white"/>
                  <ellipse cx="91" cy="75" rx="12" ry="14" fill="white"/>
                  <rect x="54" y="88" width="37" height="9" rx="4" fill="#10b981" opacity="0.91"/>
                </g>
              </svg>
            </div>
            {/* About Text */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#10b981] tracking-tight leading-tight">
                About <span className="text-gray-900">Second Hand</span>
              </h1>
              <p className="text-lg text-gray-700 mb-4">
                <b>Second Hand</b> is your modern marketplace for buying and selling pre-loved treasures. Turn old finds into new favorites—effortlessly, affordably, and sustainably.
              </p>
              <ul className="text-base pl-5 mb-5 space-y-1 text-gray-800 list-disc">
                <li>
                  <span className="font-semibold text-[#10b981]">Eco-friendly:</span> Shop reused, save resources, love the planet.
                </li>
                <li>Trustworthy community & secure transactions.</li>
                <li>Curated selections, rewarding for buyers and sellers.</li>
              </ul>
              <Button
                className="bg-[#10b981] hover:bg-[#13d8a0] transition-colors duration-200 text-white rounded-full shadow font-semibold px-7 py-2 text-base"
                asChild
              >
                <a href="#story">Read Our Story</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Divider */}
      <div className="flex justify-center my-0">
        <div className="h-2 w-16 rounded-full bg-[#10b981]/20" />
      </div>

      {/* Story Section */}
      <section
        id="story"
        className="flex items-center justify-center py-8 bg-gradient-to-tl from-white via-[#e6faf3] to-[#f6fffc]"
      >
        <Card className="max-w-3xl w-full border border-[#10b981]/20 shadow-lg rounded-3xl bg-white/97">
          <CardContent className="p-8 md:p-12 flex flex-col md:flex-row-reverse gap-8 items-center">
            {/* SVG/Illustration */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <svg width="120" height="110" viewBox="0 0 146 135" fill="none">
                <ellipse cx="93" cy="117" rx="41" ry="10" fill="#10b981" opacity="0.10"/>
                <g>
                  <path d="M36 85c13 6 25 19 44 19 15 0 26-12 30-17" stroke="#10b981" strokeWidth="9" strokeLinecap="round"/>
                  <path d="M92.949 86.404c9.814-2.514 23.33-27.029 10.62-41.403-9.71-11-24.06-5.015-28.207 2.201-4.147-7.216-18.496-13.201-28.207-2.201-12.71 14.374 0.806 38.889 10.62 41.403 5.346 1.37 10.939-3.003 17.587-3.007 6.648.004 12.241 4.377 17.587 3.007z" fill="#10b981"/>
                </g>
              </svg>
            </div>
            {/* Story Text */}
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#10b981] leading-tight">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-3">
                Second Hand started with a simple idea: that every item should have a chance at a new life.
              </p>
              <p className="text-base text-gray-800 mb-2">
                Watching so many good things go to waste inspired us to create a space where people connect, share, and rediscover value in the things they own.
              </p>
              <p className="text-base text-gray-800 mb-4">
                What began as a local project in our community has grown into a movement. Today, <span className="font-bold text-[#10b981]">Second Hand</span> is a celebration of stories, sustainability, and smart living together.
              </p>
              <Button
                className="bg-[#10b981] hover:bg-[#13d8a0] transition-colors duration-200 text-white rounded-full shadow font-semibold px-7 py-2 text-base"
                asChild
              >
                <a href="#about">Back to About</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
