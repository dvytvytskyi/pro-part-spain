"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Users, Shield, Building, TrendingUp, Phone, TreePine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsletterSignup } from "@/components/newsletter-signup"

const navigationSections = [
  { id: "what-is", label: "What Is La Zagaleta?" },
  { id: "history", label: "History & Development" },
  { id: "location", label: "Location & Access" },
  { id: "security", label: "Community & Security" },
  { id: "amenities", label: "Amenities & Lifestyle" },
  { id: "properties", label: "Property Types & Prices" },
  { id: "costs", label: "Building & Maintenance" },
  { id: "family", label: "Family Life & Schools" },
  { id: "comparison", label: "La Zagaleta vs. Sierra Blanca" },
]

const distanceData = [
  { destination: "Marbella Centre", distance: "20 km", time: "25 min" },
  { destination: "Puerto Banús", distance: "12 km", time: "20 min" },
  { destination: "Estepona", distance: "27 km", time: "30 min" },
  { destination: "Málaga Airport", distance: "71 km", time: "45 min" },
  { destination: "Gibraltar Airport", distance: "72 km", time: "60 min" },
]

const propertyRanges = [
  { type: "Luxury Villas", price: "€4.5M–€34M", note: "230 homes on 3,000–12,000 m² plots" },
  { type: "Development Plots", price: "€1.2M–€13.5M", note: "3,000–15,000 m² undeveloped parcels" },
  { type: "Future Lots", price: "TBA", note: "Up to 190 additional lots available" },
  { type: "Average Villa", price: "~€10M", note: "Typical luxury estate pricing" },
]

const schoolsData = [
  { school: "Atalaya International", location: "Estepona", distance: "12 km", time: "12 min" },
  { school: "Laude San Pedro", location: "San Pedro", distance: "15 km", time: "18 min" },
  { school: "Aloha College", location: "Nueva Andalucía", distance: "11 km", time: "15 min" },
  { school: "Swans International", location: "Sierra Blanca", distance: "20 km", time: "25 min" },
  { school: "Sotogrande International", location: "Sotogrande", distance: "54 km", time: "50 min" },
]

export default function LaZagaletaGuidePage() {
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
              <h1 className="text-xl font-light text-gray-900">La Zagaleta Area Guide</h1>
            </div>
            <Button asChild className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-sm font-light rounded-xl">
              <Link href="/listings?area=la-zagaleta">View Properties</Link>
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
                  Below are four hero images showcasing La Zagaleta's luxury villas, rolling fairways, panoramic vistas,
                  and private helipad.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src="/images/la-zagaleta-villa-1.jpg"
                    alt="Modern luxury villa with pool in La Zagaleta"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <p className="text-white text-sm font-medium drop-shadow-lg">
                      Modern luxury villa with infinity pool
                    </p>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src="/images/la-zagaleta-villa-2.webp"
                    alt="Contemporary villa with mountain views"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <p className="text-white text-sm font-medium drop-shadow-lg">
                      Rolling fairways and championship golf courses
                    </p>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src="/images/la-zagaleta-vista.jpeg"
                    alt="Panoramic terrace views over Costa del Sol"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <p className="text-white text-sm font-medium drop-shadow-lg">Panoramic vistas over Costa del Sol</p>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src="/images/la-zagaleta-estate.jpeg"
                    alt="Evening view of luxury estate with helipad"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <p className="text-white text-sm font-medium drop-shadow-lg">Private helipad and luxury estates</p>
                  </div>
                </div>
              </div>
            </section>

            {/* What Is La Zagaleta */}
            <section id="what-is" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">What Is La Zagaleta?</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 font-light leading-relaxed mb-4">
                  La Zagaleta is Europe's most coveted gated community, carved into 900 hectares of protected woodland
                  in the hills of Benahavís. Conceived as a private hunting reserve in the early 1990s, today it
                  comprises 230 ultra-luxury villas—each set on vast, landscaped plots—with capacity for up to 420 homes
                  once all remaining lots are developed.
                </p>
                <p className="text-gray-700 font-light leading-relaxed mb-4">
                  Exclusive roads, immaculate security, and an ethos of privacy and tranquillity define the estate's
                  unrivalled prestige. This sealed environment attracts high-net-worth families and individuals seeking
                  refuge from public attention.
                </p>
                <p className="text-gray-700 font-light leading-relaxed mb-6">
                  La Zagaleta represents the pinnacle of European luxury living, where pristine natural landscapes meet
                  world-class amenities, and where absolute privacy is guaranteed within 900 hectares of protected
                  Andalusian forest. This exclusive enclave has been the preferred destination for royalty, celebrities,
                  and international business leaders for over three decades.
                </p>

                <div className="bg-green-50 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Why La Zagaleta?</h3>
                  <p className="text-green-800 font-light leading-relaxed">
                    The name "La Zagaleta" reflects its origins as Adnan Khashoggi's private hunting retreat "La
                    Baraka." Today, it continues to live up to its reputation as Europe's most exclusive residential
                    community, where privacy, security, and luxury converge in perfect harmony.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-light text-gray-900 mb-2">900ha</div>
                    <p className="text-gray-600 font-light text-sm">Protected Woodland</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-gray-900 mb-2">230</div>
                    <p className="text-gray-600 font-light text-sm">Ultra-Luxury Villas</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-gray-900 mb-2">€34M</div>
                    <p className="text-gray-600 font-light text-sm">Record Sale Price</p>
                  </div>
                </div>
              </div>
            </section>

            {/* History & Development */}
            <section id="history" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">History & Development</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center text-white font-light flex-shrink-0">
                    1990
                  </div>
                  <div>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Investors led by Enrique Pérez Flores acquire 900 ha from Adnan Khashoggi's former "La Baraka"
                      hunting retreat.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center text-white font-light flex-shrink-0">
                    1992
                  </div>
                  <div>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Construction of internal roads and the first championship golf course begins.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center text-white font-light flex-shrink-0">
                    1994
                  </div>
                  <div>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Original clubhouse opens—Khashoggi's former villa repurposed as the La Zagaleta Clubhouse.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center text-white font-light flex-shrink-0">
                    Today
                  </div>
                  <div>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Gradual rollout of two 18-hole courses, equestrian centre, tennis club, and private helipad;
                      continued build-out following strict environmental and design guidelines.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Location & Access */}
            <section id="location" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Location & Access</h2>
              <p className="text-gray-700 font-light leading-relaxed mb-6">
                La Zagaleta sits 450 m above sea level in the Benahavís municipality, just a 20-minute drive from
                Marbella's Golden Mile. Residents enter through secure North and South gates; non-residents register at
                North gate only.
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
                Road access via A-397, N-340, and AP-7 makes every point easily reachable. Private helipad connects
                directly to major Andalusian cities.
              </p>
            </section>

            {/* Community & Security */}
            <section id="security" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Community & Security</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Features</h3>
                  <p className="text-gray-700 font-light leading-relaxed">
                    La Zagaleta enforces the highest security standards with 24/7 armed patrols and CCTV along 50 km of
                    tightly controlled internal roads.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Control</h3>
                  <p className="text-gray-700 font-light leading-relaxed">
                    High-tech perimeter fencing and biometric entry at both North and South gates ensure complete
                    privacy and security.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy</h3>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Green buffer zones between properties ensure absolute privacy, attracting high-net-worth families
                    seeking refuge from public attention.
                  </p>
                </div>
              </div>
            </section>

            {/* Amenities & Lifestyle */}
            <section id="amenities" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Amenities & Lifestyle</h2>

              <div className="mb-8">
                <p className="text-gray-700 font-light leading-relaxed mb-6">
                  Residents enjoy world-class facilities within their private domain, where luxury meets nature in
                  perfect harmony.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Golf Courses</h3>
                      <p className="text-gray-700 font-light text-sm mb-2">
                        Two parkland 18-hole courses (Old Course by Brad Benz; New Course by Marc Westenborg).
                      </p>
                      <p className="text-gray-600 font-light text-xs">
                        Championship-level courses designed by world-renowned architects, offering challenging play
                        amidst stunning natural landscapes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Clubhouses</h3>
                      <p className="text-gray-700 font-light text-sm mb-2">
                        Main 5,000 m² clubhouse with dining rooms, bars, event spaces; secondary clubhouse upstairs.
                      </p>
                      <p className="text-gray-600 font-light text-xs">
                        Elegant dining venues and social spaces designed for exclusive member events and private
                        celebrations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Sports & Recreation</h3>
                      <p className="text-gray-700 font-light text-sm mb-2">
                        Tennis and padel courts, equestrian stables and training arenas, three fishing lakes.
                      </p>
                      <p className="text-gray-600 font-light text-xs">
                        Professional-grade facilities for tennis, equestrian sports, and recreational fishing in
                        pristine natural settings.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <TreePine className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Nature & Trails</h3>
                      <p className="text-gray-700 font-light text-sm mb-2">
                        50 km hiking and cycling trails through protected Andalusian forest.
                      </p>
                      <p className="text-gray-600 font-light text-xs">
                        Extensive trail network through 900 hectares of protected woodland, offering nature walks and
                        cycling routes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-medium text-gray-900 mb-4">Premium Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Concierge Services</h4>
                    <ul className="space-y-1 text-gray-700 font-light">
                      <li>• Full-service housekeeping</li>
                      <li>• Property maintenance</li>
                      <li>• Event planning & catering</li>
                      <li>• Personal assistance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Transportation</h4>
                    <ul className="space-y-1 text-gray-700 font-light">
                      <li>• Private helipad access</li>
                      <li>• Direct flights to major cities</li>
                      <li>• Málaga, Sevilla, Ronda connections</li>
                      <li>• Sierra Nevada access</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Property Types & Prices */}
            <section id="properties" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Property Types & Price Ranges</h2>
              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Property Type</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Price Range</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertyRanges.map((row, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="py-4 px-6 text-sm text-gray-700 font-light">{row.type}</td>
                        <td className="py-4 px-6 text-sm text-gray-700 font-medium">{row.price}</td>
                        <td className="py-4 px-6 text-sm text-gray-600 font-light">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Building & Maintenance Costs */}
            <section id="costs" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Building & Maintenance Costs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Construction</h3>
                  <p className="text-blue-800 font-light mb-2">€2,000–€3,000 /m²</p>
                  <p className="text-blue-700 font-light text-sm">
                    Terrain and retaining walls add complexity to build costs
                  </p>
                </div>

                <div className="bg-green-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Annual Maintenance</h3>
                  <p className="text-green-800 font-light">~€70,000 + €1,000/month</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Calculation</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-light">1,200 m² villa construction</span>
                    <span className="font-medium text-gray-900">€3.0M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-light">Retaining walls & landscaping</span>
                    <span className="font-medium text-gray-900">€300K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-light">Kitchen & fittings</span>
                    <span className="font-medium text-gray-900">€200K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-light">Plot & taxes</span>
                    <span className="font-medium text-gray-900">€3.5M</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between">
                    <span className="text-gray-900 font-medium">Total Project Cost</span>
                    <span className="font-semibold text-gray-900">≈ €7.0M</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Family Life & Schools */}
            <section id="family" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Family Life & Schools</h2>
              <p className="text-gray-700 font-light leading-relaxed mb-6">
                While no schools sit within La Zagaleta gates, top international institutions lie nearby. Residents
                benefit from total safety, abundant open space for children, and year-round recreational clubs.
              </p>

              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">School</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Location</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Distance</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Drive Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schoolsData.map((row, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="py-4 px-6 text-sm text-gray-700 font-light">{row.school}</td>
                        <td className="py-4 px-6 text-sm text-gray-700 font-light">{row.location}</td>
                        <td className="py-4 px-6 text-sm text-gray-700 font-light">{row.distance}</td>
                        <td className="py-4 px-6 text-sm text-gray-700 font-light">{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Market Intelligence */}
            <section id="market" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Market Intelligence</h2>
              <div className="bg-black rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-6 w-6" />
                  <h3 className="text-xl font-light">Exclusive Market Data</h3>
                </div>
                <p className="text-white/90 font-light leading-relaxed">
                  Our exclusive market intelligence provides real-time sales data for La Zagaleta—property type, plot
                  size, sale date, and €/m²—so you can identify premium investment opportunities in Europe's most
                  exclusive community.
                </p>
              </div>
            </section>

            {/* Comparison */}
            <section id="comparison" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Comparison: La Zagaleta vs. Sierra Blanca</h2>
              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Feature</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">La Zagaleta</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Sierra Blanca</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">Location</td>
                      <td className="py-4 px-6 text-sm text-gray-700 font-light">Benahavís hills (private estate)</td>
                      <td className="py-4 px-6 text-sm text-gray-700 font-light">Foothills of La Concha (Marbella)</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">Access</td>
                      <td className="py-4 px-6 text-sm text-gray-700 font-light">Strict gated entry (North & South)</td>
                      <td className="py-4 px-6 text-sm text-gray-700 font-light">Gated nights, open days</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">Homes</td>
                      <td className="py-4 px-6 text-sm text-gray-700 font-light">230 villas (+190 plots)</td>
                      <td className="py-4 px-6 text-sm text-gray-700 font-light">~300 villas, limited build-out</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">Price Range</td>
                      <td className="py-4 px-6 text-sm text-gray-700 font-light">€4.5 M–€34 M</td>
                      <td className="py-4 px-6 text-sm text-gray-700 font-light">€4 M–€30 M</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">Amenities</td>
                      <td className="py-4 px-6 text-sm text-gray-700 font-light">
                        2 golf courses, equestrian, helipad
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-700 font-light">Tennis, spa, nearby beach access</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Leading Agency */}
            <section id="agency" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">Leading Agency</h2>
              <div className="bg-gray-50 rounded-2xl p-8">
                <p className="text-gray-700 font-light leading-relaxed mb-6">
                  PRO PART is the premier real estate firm specializing in La Zagaleta properties, with exclusive access
                  to luxury villas and development plots ranging from €4.5M to €34M. Our deep local expertise,
                  international marketing reach, and proven track record make us the trusted partner for buying or
                  selling in Europe's most exclusive community.
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
