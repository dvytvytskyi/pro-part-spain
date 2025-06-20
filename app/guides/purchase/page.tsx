"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsletterSignup } from "@/components/newsletter-signup"

const sections = [
  { id: "research", title: "01 Research & Agent Selection" },
  { id: "viewing", title: "02 Viewing Trips" },
  { id: "documentation", title: "03 Documentation & Pre-Approval" },
  { id: "offer", title: "04 Offer, Due Diligence & Negotiation" },
  { id: "contracts", title: "05 Contracts & Completion" },
  { id: "formalities", title: "06 Post-Purchase Formalities" },
  { id: "faqs", title: "FAQs" },
]

export default function PurchaseGuidePage() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
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
            </div>
            <Button asChild className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-sm font-light rounded-xl">
              <Link href="/contact">Contact Agent</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Title */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
                Marbella Home-Purchase Guide
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                Below is a structured guide to buying property in Marbella, organized into clear steps with smooth
                in-page navigation.
              </p>
            </div>

            {/* Research & Agent Selection */}
            <section id="research" className="mb-16">
              <h2 className="text-2xl font-light text-gray-900 mb-6">01 Research & Agent Selection</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 font-light leading-relaxed mb-4">
                  Purchasing in Marbella begins long before you arrive: define your budget, preferred neighborhoods, and
                  must-have amenities. Use online portals to survey current listings and prices, then shortlist
                  reputable firms. Interview 2–3 agents to compare track records, language skills, and service scope.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="text-blue-800 font-medium text-sm">
                    <strong>Tip:</strong> Work with one dedicated agent who understands your priorities and has proven
                    local expertise.
                  </p>
                </div>
              </div>
            </section>

            {/* Viewing Trips */}
            <section id="viewing" className="mb-16">
              <h2 className="text-2xl font-light text-gray-900 mb-6">02 Viewing Trips</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 font-light leading-relaxed mb-4">
                  Plan a property-viewing itinerary once your preferred firm is engaged.
                </p>
                <ul className="space-y-2 text-gray-700 font-light">
                  <li>• Select 5–8 properties in advance to avoid fatigue.</li>
                  <li>• Group tours geographically—e.g., Golden Mile, Nueva Andalucía—maximizing time.</li>
                  <li>• Day vs. Night: Revisit top picks after sunset to check lighting and ambiance.</li>
                  <li>• Neighborhood drive-by: Assess noise levels, school proximity, and local services.</li>
                  <li>• Feedback loop: Debrief daily with your agent to refine search criteria.</li>
                </ul>
              </div>
            </section>

            {/* Documentation & Pre-Approval */}
            <section id="documentation" className="mb-16">
              <h2 className="text-2xl font-light text-gray-900 mb-6">03 Documentation & Pre-Approval</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 font-light leading-relaxed mb-4">
                  Spain's paperwork regime demands preparation:
                </p>
                <ul className="space-y-3 text-gray-700 font-light">
                  <li>
                    <strong>NIE Number:</strong> Essential for all transactions—apply via consulate or in-country
                    gestor.
                  </li>
                  <li>
                    <strong>Bank Account:</strong> Open at a foreign-friendly bank (Sabadell, CaixaBank); prepare ID,
                    NIE, proof of funds.
                  </li>
                  <li>
                    <strong>Mortgage Pre-Approval:</strong> If needed, secure bank comfort letters early—Spanish lenders
                    take up to 8 weeks to decide.
                  </li>
                  <li>
                    <strong>Legal & Tax Advisors:</strong> Engage a bilingual solicitor and fiscal consultant before
                    making offers.
                  </li>
                </ul>
              </div>
            </section>

            {/* Offer, Due Diligence & Negotiation */}
            <section id="offer" className="mb-16">
              <h2 className="text-2xl font-light text-gray-900 mb-6">04 Offer, Due Diligence & Negotiation</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 font-light leading-relaxed mb-4">When you find "the one":</p>
                <ul className="space-y-3 text-gray-700 font-light">
                  <li>
                    <strong>Written Offer:</strong> Outline price, deposit terms, and any fixtures or furniture
                    included.
                  </li>
                  <li>
                    <strong>Contingencies:</strong> Specify conditions—e.g., satisfactory technical survey or
                    community-fee clearance.
                  </li>
                  <li>
                    <strong>Technical Due Diligence:</strong> Commission surveys on structure, plumbing, insulation.
                    Adjust your offer if defects emerge.
                  </li>
                  <li>
                    <strong>Agent-led Negotiation:</strong> Leverage market comparables and local insights to secure a
                    fair deal.
                  </li>
                </ul>
              </div>
            </section>

            {/* Contracts & Completion */}
            <section id="contracts" className="mb-16">
              <h2 className="text-2xl font-light text-gray-900 mb-6">05 Contracts & Completion</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 font-light leading-relaxed mb-4">
                  Spanish purchase typically follows three main agreements:
                </p>
                <ul className="space-y-3 text-gray-700 font-light">
                  <li>
                    <strong>Reservation Agreement:</strong> Holds the property (7–14 days) with a small fee
                    (€5,000–€20,000).
                  </li>
                  <li>
                    <strong>Private Sale Contract ("Arras" or "Compraventa"):</strong> 10% deposit secures the deal;
                    outlines penalties for withdrawal.
                  </li>
                  <li>
                    <strong>Notarial Deed (Escritura):</strong> Final signing at the notary with all parties present;
                    payment by bank cheque and immediate title transfer.
                  </li>
                </ul>
                <p className="text-gray-700 font-light leading-relaxed mt-4">
                  After notarization, register your deed at the Land Registry (1–3 months).
                </p>
              </div>
            </section>

            {/* Post-Purchase Formalities */}
            <section id="formalities" className="mb-16">
              <h2 className="text-2xl font-light text-gray-900 mb-6">06 Post-Purchase Formalities</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 font-light leading-relaxed mb-4">
                  Ownership brings ongoing responsibilities:
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Utility Transfers:</h4>
                    <p className="text-gray-700 font-light">Update water, electricity, gas, community fees.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Taxes & Fees:</h4>
                    <p className="text-gray-700 font-light">
                      Pay ITP (6%–10%), notary/registry charges (1%–1.5%), and solicitor fees.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Annual Obligations:</h4>
                    <p className="text-gray-700 font-light">
                      IBI (0.4%–1.1% valor catastral), garbage tax (~€300), wealth tax (0.2%–2.5%), and non-resident
                      income tax (2%–25%).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Golden Visa Option:</h4>
                    <p className="text-gray-700 font-light">
                      Non-EU buyers investing ≥€500,000 qualify for residency without physical-stay requirements.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="mb-16">
              <h2 className="text-2xl font-light text-gray-900 mb-6">FAQs</h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Is Marbella a good place to live?</h4>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Yes—excellent climate, family-friendly neighborhoods, top international schools, and year-round
                    amenities.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Do I need an agent?</h4>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Absolutely. Agents save you time, spot hidden issues, unlock off-market opportunities, and negotiate
                    on your behalf.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Can I open a bank account remotely?</h4>
                  <p className="text-gray-700 font-light leading-relaxed">
                    You'll need your NIE and to appear in person, but many banks cater to foreign clients with
                    streamlined processes.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Table of Contents</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeSection === section.id
                          ? "bg-black text-white"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {section.title}
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
                  <div className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0">📍</div>
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
