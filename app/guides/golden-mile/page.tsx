"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Users, Shield, Building, TrendingUp, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsletterSignup } from "@/components/newsletter-signup"

const navigationSections = [
  { id: "what-is", label: "What Is the Golden Mile?" },
  { id: "sub-areas", label: "Sub-Area Divisions" },
  { id: "location", label: "Location & Connectivity" },
  { id: "history", label: "Historical Snapshot" },
  { id: "architecture", label: "Architectural Styles" },
  { id: "prices", label: "Price Ranges" },
  { id: "construction", label: "Land & Construction Costs" },
  { id: "market", label: "Market Intelligence" },
  { id: "lifestyle", label: "Lifestyle & Amenities" },
  { id: "family", label: "Family & Education" },
  { id: "community", label: "Community & Safety" },
  { id: "agency", label: "Leading Agency" },
]

const distanceData = [
  { destination: "Málaga Airport", distance: "54 km", time: "37 min" },
  { destination: "Gibraltar Airport", distance: "69 km", time: "60 min" },
  { destination: "Marbella Old Town", distance: "3.3 km", time: "8 min" },
  { destination: "Puerto Banús", distance: "4.6 km", time: "8 min" },
  { destination: "Estepona", distance: "27 km", time: "27 min" },
]

const priceRanges = [
  { area: "Overall Range", price: "€500K–€35M", note: "Top listings up to €80M" },
  { area: "Area A (Beachfront)", price: "€2M–€10M", note: "Frontline estates often exceed €10M" },
  { area: "Area B (Elevated)", price: "€1M–€6M", note: "Standout mansions can reach €35M" },
  { area: "Area C (Mountain)", price: "€2M–€30M", note: "Prime plots historically top €40M" },
]

export default function GoldenMileGuidePage() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationSections.map((section) => document.getElementById(section.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigationSections[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/home"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-light">Back to Home</span>
              </Link>
              <div className="w-px h-6 bg-gray-200" />
              <h1 className="text-xl font-light text-gray-900">Marbella Golden Mile Area Guide</h1>
            </div>
            <Button asChild className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-sm font-light rounded-xl">
              <Link href="/listings?area=golden-mile">View Properties</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Images */}
            <section className="mb-16">
              <div className="mb-8">
                <p className="text-gray-600 font-light leading-relaxed">
                  Below are four hero images showcasing the luxury and landscape of the Golden Mile.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src="/images/golden-mile-aerial-beach.jpg"
                    alt="Aerial coastline view from Puerto Banús"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <p className="text-white text-sm font-medium drop-shadow-lg">
                      Aerial coastline view from Puerto Banús
                    </p>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src="/images/golden-mile-beachfront.webp"
                    alt="Promenade palm trees and beach access"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <p className="text-white text-sm font-medium drop-shadow-lg">
                      Promenade palm trees and beach access
                    </p>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src="/images/golden-mile-coastline.jpg"
                    alt="Mountain backdrop over Sierra Blanca"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <p className="text-white text-sm font-medium drop-shadow-lg">
                      Mountain backdrop over Sierra Blanca
                    </p>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src="/images/golden-mile-modern-villas.jpg"
                    alt="Modern luxury villas with mountain views"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <p className="text-white text-sm font-medium drop-shadow-lg">
                      Modern luxury villas with mountain views
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* What Is the Golden Mile */}
            <section id="what-is" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">What Is the Golden Mile?</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 font-light leading-relaxed mb-4">
                  The Marbella Golden Mile is a prestigious 5 km stretch of coastline from Puerto Banús to the Pirulí
                  monolith—Marbella's symbolic gateway. This ribbon of land is famed for its 5-star resorts (e.g.,
                  Marbella Club, Puente Romano), Michelin-starred dining, and ultra-luxury villas.
                </p>
                <p className="text-gray-700 font-light leading-relaxed mb-4">
                  Although not an official district, locals loosely define its boundaries to include sub-areas like
                  Nagüeles, Sierra Blanca, Puente Romano, Lomas de Marbella Club, La Carolina, El Vicario, Monte
                  Paraíso, and El Capricho.
                </p>
                <p className="text-gray-700 font-light leading-relaxed mb-6">
                  The Golden Mile represents the epitome of Mediterranean luxury living, where pristine beaches meet
                  manicured gardens, and where world-class amenities are seamlessly integrated into a landscape of
                  unparalleled natural beauty. This exclusive enclave has been the preferred destination for European
                  royalty, Hollywood celebrities, and international business leaders for over six decades.
                </p>

                <div className="bg-amber-50 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-amber-900 mb-3">Why "Golden Mile"?</h3>
                  <p className="text-amber-800 font-light leading-relaxed">
                    The name "Golden Mile" originated in the 1960s, reflecting both the golden sands of its beaches and
                    the golden era of luxury tourism that Prince Alfonso von Hohenlohe initiated with the Marbella Club.
                    Today, it continues to live up to its name as one of Europe's most expensive and exclusive
                    residential areas.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-light text-gray-900 mb-2">5km</div>
                    <p className="text-gray-600 font-light text-sm">Coastline Length</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-gray-900 mb-2">300+</div>
                    <p className="text-gray-600 font-light text-sm">Sunny Days/Year</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-gray-900 mb-2">€80M</div>
                    <p className="text-gray-600 font-light text-sm">Record Sale Price</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Sub-Area Divisions */}
            <section id="sub-areas" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Sub-Area Divisions</h2>
              <p className="text-gray-700 font-light leading-relaxed mb-6">
                For clarity, we split the Golden Mile into three zones:
              </p>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Area A (Beach to N-340)</h3>
                  <p className="text-blue-800 font-light">Beachfront estates, Marbella Club, Puente Romano</p>
                </div>

                <div className="bg-green-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Area B (N-340 to AP-7)</h3>
                  <p className="text-green-800 font-light">
                    Elevated villas in Monte Paraíso, Lomas de Marbella Club, La Carolina
                  </p>
                </div>

                <div className="bg-purple-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Area C (Beyond AP-7)</h3>
                  <p className="text-purple-800 font-light">Mountain‐top enclaves in Sierra Blanca, Nagüeles</p>
                </div>
              </div>
            </section>

            {/* Location & Connectivity */}
            <section id="location" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Location & Connectivity</h2>
              <p className="text-gray-700 font-light leading-relaxed mb-6">
                Lined with palms and a smooth promenade, the Golden Mile feels like California's coast. It links
                effortlessly to:
              </p>

              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Destination</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Distance</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Drive Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {distanceData.map((row, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="py-4 px-6 text-sm text-gray-700 font-light">{row.destination}</td>
                        <td className="py-4 px-6 text-sm text-gray-700 font-light">{row.distance}</td>
                        <td className="py-4 px-6 text-sm text-gray-700 font-light">{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-gray-600 font-light text-sm mt-4">
                Road access via A-7, N-340, and AP-7 makes every point easily reachable.
              </p>
            </section>

            {/* Historical Snapshot */}
            <section id="history" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Historical Snapshot</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center text-white font-light flex-shrink-0">
                    1954
                  </div>
                  <div>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Prince Alfonso von Hohenlohe commissions the Marbella Club.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center text-white font-light flex-shrink-0">
                    1976
                  </div>
                  <div>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Club inaugurates; celebrities and royalty flock here.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center text-white font-light flex-shrink-0">
                    Today
                  </div>
                  <div>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Villas on the Golden Mile remain status symbols for an A-list clientele (e.g., Statham, Stallone,
                      Obama).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Architectural Styles */}
            <section id="architecture" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Architectural Styles</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Area A</h3>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Mediterranean-style beachfront villas and luxury apartments, many recently renovated into
                    contemporary designs.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Area B</h3>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Urbanisations of townhouses and villas with mixed sea and mountain vistas; new complexes emphasize
                    modern lines.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Area C</h3>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Expansive mountain plots in Sierra Blanca and Nagüeles, predominantly large Mediterranean villas
                    with private pools and gardens.
                  </p>
                </div>
              </div>
            </section>

            {/* Price Ranges */}
            <section id="prices" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Price Ranges for Homes</h2>
              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Area</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Price Range</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceRanges.map((row, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="py-4 px-6 text-sm text-gray-700 font-light">{row.area}</td>
                        <td className="py-4 px-6 text-sm text-gray-700 font-medium">{row.price}</td>
                        <td className="py-4 px-6 text-sm text-gray-600 font-light">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Construction Costs */}
            <section id="construction" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Land & Construction Costs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Land</h3>
                  <p className="text-blue-800 font-light mb-2">€500–€2,000 /m²</p>
                  <p className="text-blue-700 font-light text-sm">
                    Plots start at €500K for ~1,000 m²; flagship sites above €20M
                  </p>
                </div>

                <div className="bg-green-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Build</h3>
                  <p className="text-green-800 font-light">€500–€2,000 /m²</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Calculation</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-light">1,200 m² villa @ €3,000/m²</span>
                    <span className="font-medium text-gray-900">€3.6M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-light">3,000 m² plot @ €1,500/m²</span>
                    <span className="font-medium text-gray-900">€4.5M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-light">Fittings & landscaping</span>
                    <span className="font-medium text-gray-900">€200K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-light">Professional fees (~20%)</span>
                    <span className="font-medium text-gray-900">€720K</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between">
                    <span className="text-gray-900 font-medium">Total</span>
                    <span className="font-semibold text-gray-900">≈ €9.02M</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Market Intelligence */}
            <section id="market" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Market Intelligence</h2>
              <div className="bg-black rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-6 w-6" />
                  <h3 className="text-xl font-light">Market Watch Tracker</h3>
                </div>
                <p className="text-white/90 font-light leading-relaxed">
                  Our Market Watch tracker delivers real-time sales data—property type, size, sale date, and €/m²—so you
                  can pinpoint trends on the Golden Mile.
                </p>
              </div>
            </section>

            {/* Lifestyle & Amenities */}
            <section id="lifestyle" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Lifestyle & Amenities</h2>

              <div className="mb-8">
                <p className="text-gray-700 font-light leading-relaxed mb-6">
                  Living on the Golden Mile means embracing a lifestyle where luxury meets convenience, where
                  world-class amenities are just steps away, and where every day feels like a vacation in paradise.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Sea & Mountain Views</h3>
                      <p className="text-gray-700 font-light text-sm mb-2">
                        Area A villas sit beachfront; Areas B & C offer dual panoramas up to Gibraltar and Morocco.
                      </p>
                      <p className="text-gray-600 font-light text-xs">
                        On clear days, residents can see the Atlas Mountains of Morocco and the Rock of Gibraltar,
                        creating breathtaking sunset views that change with the seasons.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Dining & Nightlife</h3>
                      <p className="text-gray-700 font-light text-sm mb-2">
                        Michelin-starred venues, Nobu, chiringuitos, La Suite, Olivia Valère.
                      </p>
                      <p className="text-gray-600 font-light text-xs">
                        From beachside chiringuitos serving fresh seafood to exclusive nightclubs hosting international
                        DJs, the Golden Mile offers dining and entertainment options for every taste and occasion.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Sports & Wellness</h3>
                      <p className="text-gray-700 font-light text-sm mb-2">
                        Watersports, Puente Romano Tennis Club, Six Senses Spa.
                      </p>
                      <p className="text-gray-600 font-light text-xs">
                        World-class tennis facilities host international tournaments, while luxury spas offer treatments
                        using the latest wellness technologies and ancient healing traditions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Shopping</h3>
                      <p className="text-gray-700 font-light text-sm mb-2">
                        Luxury boutiques (Chanel, Louis Vuitton), El Corte Inglés.
                      </p>
                      <p className="text-gray-600 font-light text-xs">
                        From exclusive designer boutiques in Puerto Banús to local artisan shops, shopping on the Golden
                        Mile caters to the most discerning tastes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-medium text-gray-900 mb-4">Beach Clubs & Chiringuitos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Premium Beach Clubs</h4>
                    <ul className="space-y-1 text-gray-700 font-light">
                      <li>• Nikki Beach Marbella</li>
                      <li>• Ocean Club Marbella</li>
                      <li>• Playa Padre Beach Club</li>
                      <li>• Bounty Beets</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Traditional Chiringuitos</h4>
                    <ul className="space-y-1 text-gray-700 font-light">
                      <li>• El Chiringuito</li>
                      <li>• La Pesquera</li>
                      <li>• Trocadero Arena</li>
                      <li>• Casanis Bistrot</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-gray-900 mb-3">Outdoor Activities</h3>
                <p className="text-gray-700 font-light mb-4">
                  The Golden Mile's unique geography offers residents access to both coastal and mountain activities.
                  The palm-lined promenade is perfect for morning jogs or evening strolls, while the nearby Sierra
                  Blanca mountains provide hiking trails with spectacular views.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900">Water Sports</p>
                    <p className="text-blue-700 font-light text-xs mt-1">Sailing, Jet Skiing, Paddleboarding</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-900">Golf</p>
                    <p className="text-green-700 font-light text-xs mt-1">5 Championship Courses Nearby</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="font-medium text-purple-900">Hiking</p>
                    <p className="text-purple-700 font-light text-xs mt-1">Sierra Blanca Trails</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <p className="font-medium text-orange-900">Cycling</p>
                    <p className="text-orange-700 font-light text-xs mt-1">Coastal & Mountain Routes</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Family & Education */}
            <section id="family" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Family & Education</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Activities</h3>
                  <p className="text-gray-700 font-light leading-relaxed">Safe beaches, playgrounds, water sports.</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Schools in Area C</h3>
                  <ul className="space-y-2 text-gray-700 font-light">
                    <li>• Swans International (4–18 yrs)</li>
                    <li>• British International (2–12 yrs)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Schools</h3>
                  <ul className="space-y-2 text-gray-700 font-light">
                    <li>• Laude San Pedro</li>
                    <li>• Aloha College</li>
                    <li>• English International College</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Universities</h3>
                  <ul className="space-y-2 text-gray-700 font-light">
                    <li>• Marbella International</li>
                    <li>• Les Roches</li>
                    <li>• American College</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Community & Safety */}
            <section id="community" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Community & Safety</h2>
              <p className="text-gray-700 font-light leading-relaxed mb-6">
                An international community of high-net-worth families, royals, and celebrities. Gated urbanisations,
                barrier controls, on-site patrols, and pedestrianized zones ensure security.
              </p>
              <p className="text-gray-700 font-light leading-relaxed">
                Speed limits are enforced (50 km/h); police presence is strong.
              </p>
            </section>

            {/* Leading Agency */}
            <section id="agency" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Leading Agency</h2>
              <div className="bg-gray-50 rounded-2xl p-8">
                <p className="text-gray-700 font-light leading-relaxed mb-6">
                  Drumelia is the top real estate firm on the Golden Mile, with 100+ exclusive listings ranging from
                  plots to €80M mansions. Our local expertise, global marketing, and proven track record (50+
                  high-profile sales) make us the go-to partner for buying or selling here.
                </p>
                <Button
                  asChild
                  className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-sm font-light rounded-xl"
                >
                  <Link href="/contact">Contact Our Team</Link>
                </Button>
              </div>
            </section>
          </div>

          {/* Sticky Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Guide Navigation</h3>
                <nav className="space-y-2">
                  {navigationSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-light transition-colors ${
                        activeSection === section.id ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="relative h-8 w-24 mb-6">
                <Image src="/images/logo.png" alt="PRO PART" fill className="object-contain" />
              </div>
              <p className="text-sm text-gray-600 font-light leading-relaxed mb-6 max-w-md">
                Your trusted partner in finding exceptional properties on the Costa del Sol and beyond. Specializing in
                luxury real estate investments and sales.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-gray-600 font-light leading-relaxed">
                    Pl. de la Iglesia, 3, office 1-D
                    <br />
                    29670, San Pedro de Alcántara
                    <br />
                    Malaga, Spain
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <a
                    href="tel:+34695113333"
                    className="text-xs text-gray-600 font-light hover:text-gray-900 transition-colors"
                  >
                    +34 695 113 333
                  </a>
                </div>
              </div>
            </div>

            {/* Properties */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Properties</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/listings?category=luxury-villas"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Luxury Villas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?category=penthouses"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Penthouses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?category=apartments"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Apartments
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?category=new-developments"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    New Developments
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?category=investment"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Investment Properties
                  </Link>
                </li>
              </ul>
            </div>

            {/* Areas */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Areas</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/listings?area=marbella"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Marbella
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?area=golden-mile"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Golden Mile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?area=puerto-banus"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Puerto Banús
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?area=nueva-andalucia"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Nueva Andalucía
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?area=estepona"
                    className="text-xs text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    Estepona
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <NewsletterSignup />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-100 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="text-xs text-gray-500 font-light">© 2025 All rights reserved</div>
              <div className="flex items-center gap-6">
                <Link
                  href="/privacy-policy"
                  className="text-xs text-gray-500 hover:text-gray-700 font-light transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-use"
                  className="text-xs text-gray-500 hover:text-gray-700 font-light transition-colors"
                >
                  Terms of Use
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
