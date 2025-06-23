"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Users, Home, FileText, Camera, Eye, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsletterSignup } from "@/components/newsletter-signup"

const navigationSections = [
  { id: "choose-agent", label: "01 Choose Your Agent" },
  { id: "prepare-home", label: "02 Prepare Your Home" },
  { id: "listing-agreement", label: "03 Listing Agreement Options" },
  { id: "marketing-strategy", label: "04 Marketing Strategy" },
  { id: "viewings-management", label: "05 Viewings Management" },
  { id: "negotiation-contract", label: "06 Negotiation & Contract" },
  { id: "closing-sale", label: "07 Closing the Sale" },
]

const agentQuestions = [
  "What's your sales volume here?",
  "How many active listings do you manage?",
  "What's your average success rate?",
  "How will you coordinate viewings and feedback?",
]

const listingOptions = [
  {
    type: "Multiple-Agent Listing",
    description: "Wider exposure but requires you to monitor duplicate ads",
    pros: "Maximum market exposure",
    cons: "Less control over presentation",
  },
  {
    type: "Exclusive Agency Contract",
    description: "Single agent controls pricing, branding, and unified marketing",
    pros: "Unified marketing approach",
    cons: "Limited to one agent's network",
  },
  {
    type: "Sole – Exclusive Right to Sell",
    description: "Highest commitment from your agent, custom strategy, and guaranteed focus",
    pros: "Maximum agent commitment",
    cons: "Highest commission rates",
  },
]

const marketingTimeline = [
  { day: "Day 1-2", task: "Professional photography & video" },
  { day: "Day 3-4", task: "Virtual tour creation & floor plans" },
  { day: "Day 5-6", task: "Marketing materials & listing copy" },
  { day: "Day 7", task: "Launch across all channels" },
]

export default function SellingGuidePage() {
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
      // element.scrollIntoView({ behavior: "smooth", block: "start" })
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
              <h1 className="text-xl font-light text-gray-900">Selling Your Marbella Property: Full Guide</h1>
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
            {/* 01 Choose Your Agent */}
            <section id="choose-agent" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">01 Choose Your Agent</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 font-light leading-relaxed mb-6">
                  Selecting the right real-estate professional is critical to a successful sale. Interview several
                  Marbella agents to compare their expertise, approach, and track record.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Trust & Communication</h3>
                        <p className="text-gray-700 font-light text-sm">
                          You must feel comfortable and confident raising questions throughout the selling process.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Local Track Record</h3>
                        <p className="text-gray-700 font-light text-sm">
                          Ask about past sales in your neighborhood and typical days-on-market for similar properties.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <Home className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Pricing Expertise</h3>
                        <p className="text-gray-700 font-light text-sm">
                          A good agent will value your home based on size (m²), location, views, and finishes.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Process Transparency</h3>
                        <p className="text-gray-700 font-light text-sm">
                          From marketing spend to tax and closing-cost estimates, insist on full disclosure up front.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Key Questions to Ask</h3>
                  <ul className="space-y-2">
                    {agentQuestions.map((question, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-blue-800 font-light">{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 02 Prepare Your Home */}
            <section id="prepare-home" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">02 Prepare Your Home</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 font-light leading-relaxed mb-6">
                  First impressions drive offers. Invest effort in presenting your property at its absolute best to
                  maximize buyer interest and achieve the highest possible sale price.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Accurate Valuation</h3>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Research real sales versus asking prices to set realistic expectations. Your agent should provide
                      a comprehensive market analysis.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Staging & Snagging</h3>
                    <p className="text-gray-700 font-light leading-relaxed mb-4">
                      Declutter, fix minor defects (paint, leaks, appliances), polish floors, and deep-clean every room.
                      Small investments yield significant returns.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Declutter</h4>
                        <p className="text-sm text-gray-600 font-light">Remove personal items and excess furniture</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Repair</h4>
                        <p className="text-sm text-gray-600 font-light">Fix minor defects and maintenance issues</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Clean</h4>
                        <p className="text-sm text-gray-600 font-light">Professional deep cleaning throughout</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Inventory List</h3>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Detail what's included—furnishings, fixtures, appliances—to avoid disputes later. Create a
                      comprehensive list with photos.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Advice</h3>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Take your agent's staging tips and, if needed, hire a professional stylist or cleaner for optimal
                      presentation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 03 Listing Agreement Options */}
            <section id="listing-agreement" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">03 Listing Agreement Options</h2>
              <p className="text-gray-700 font-light leading-relaxed mb-6">
                Marbella's open market lets you choose between different listing approaches. Each has pros and
                cons—select the one that balances your desire for control, reach, and bespoke service.
              </p>

              <div className="space-y-6">
                {listingOptions.map((option, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{option.type}</h3>
                    <p className="text-gray-700 font-light leading-relaxed mb-4">{option.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-green-800 mb-1">Advantages</h4>
                        <p className="text-sm text-green-700 font-light">{option.pros}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-red-800 mb-1">Considerations</h4>
                        <p className="text-sm text-red-700 font-light">{option.cons}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 04 Marketing Strategy */}
            <section id="marketing-strategy" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">04 Marketing Strategy</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 font-light leading-relaxed mb-6">
                  A strong launch secures top offers. Professional marketing materials and strategic timing are
                  essential for maximizing your property's exposure and appeal.
                </p>

                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Budget & Quality</h3>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Higher investment yields premium photography, video, VR tours, and targeted advertising campaigns
                      that attract serious buyers.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">7-Day Rollout</h3>
                    <p className="text-gray-700 font-light leading-relaxed mb-4">
                      Professional agencies complete all creative assets and listings within one week for maximum market
                      impact.
                    </p>
                    <div className="bg-gray-50 rounded-2xl overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Timeline</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Task</th>
                          </tr>
                        </thead>
                        <tbody>
                          {marketingTimeline.map((item, index) => (
                            <tr key={index} className="border-t border-gray-200">
                              <td className="py-3 px-4 text-sm text-gray-700 font-medium">{item.day}</td>
                              <td className="py-3 px-4 text-sm text-gray-700 font-light">{item.task}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Channels</h3>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Leverage social media, email broadcasts, and international portals alongside local MLS for maximum
                      exposure to qualified buyers.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Open House Events</h3>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Drive word-of-mouth and on-site excitement through professionally managed open house events and
                      private showings.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 05 Viewings Management */}
            <section id="viewings-management" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">05 Viewings Management</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 font-light leading-relaxed mb-6">
                  Flexible, professional showings convert interest into offers. Proper viewing management ensures every
                  potential buyer experiences your property at its best.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <Eye className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Pre-Viewing Prep</h3>
                        <p className="text-gray-700 font-light text-sm">
                          Ensure your home is camera-ready and your agent knows its best features and selling points.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Owner Absence</h3>
                        <p className="text-gray-700 font-light text-sm">
                          Let your agent lead tours to maintain an objective atmosphere and professional presentation.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <Camera className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Virtual Tours</h3>
                        <p className="text-gray-700 font-light text-sm">
                          Qualify remote buyers first with virtual tours to maximize efficiency of in-person viewings.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Immediate Feedback</h3>
                        <p className="text-gray-700 font-light text-sm">
                          Debrief after each viewing to refine pricing or presentation based on buyer responses.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-2xl p-6 mt-8">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Viewing Best Practices</h3>
                  <ul className="space-y-2 text-green-800 font-light">
                    <li>• Schedule viewings during optimal lighting hours</li>
                    <li>• Provide property information packets to serious buyers</li>
                    <li>• Follow up within 24 hours of each viewing</li>
                    <li>• Track feedback to identify common concerns or praise</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 06 Negotiation & Contract */}
            <section id="negotiation-contract" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">06 Negotiation & Contract</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 font-light leading-relaxed mb-6">
                  When offers arrive, professional negotiation and clear contract terms protect your interests while
                  securing the best possible deal.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Options</h3>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Your agent compiles feedback and compares offers against market benchmarks, helping you evaluate
                      not just price but terms and buyer qualifications.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Contingencies</h3>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Define any work to be completed, budgets, and deadlines in writing. Clarity prevents disputes and
                      ensures smooth execution.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Reservation Agreement</h3>
                    <p className="text-gray-700 font-light leading-relaxed mb-4">
                      Formalise the deal with a deposit (usually €5–20K) and a binding "arras" contract (10% down) that
                      secures the buyer's commitment.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Initial Deposit</h4>
                        <p className="text-sm text-gray-600 font-light">€5,000 - €20,000 to secure the property</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Arras Contract</h4>
                        <p className="text-sm text-gray-600 font-light">10% deposit with binding terms</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Due Diligence Period</h3>
                    <p className="text-gray-700 font-light leading-relaxed">
                      Buyer may cancel without penalty if legal or technical reports raise significant issues. This
                      period typically lasts 2-4 weeks.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 07 Closing the Sale */}
            <section id="closing-sale" className="mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">07 Closing the Sale</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 font-light leading-relaxed mb-6">
                  Finalising your sale involves coordinating multiple parties and ensuring all legal and financial
                  requirements are met for a smooth transfer of ownership.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white font-light flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Notarial Signing</h3>
                      <p className="text-gray-700 font-light leading-relaxed">
                        Buyer and seller (or representatives) sign the Escritura at the notary office; funds transfer by
                        bank cheque for security and legal compliance.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white font-light flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Title Registration</h3>
                      <p className="text-gray-700 font-light leading-relaxed">
                        Lawyer submits documentation to the Land Registry. This process typically takes 1–3 months to
                        complete fully.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white font-light flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Tax & Fees</h3>
                      <p className="text-gray-700 font-light leading-relaxed">
                        Ensure payment of capital-gains tax, agent commission, notary, and registry costs. Your agent
                        coordinates all payments.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white font-light flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Handover</h3>
                      <p className="text-gray-700 font-light leading-relaxed">
                        Deliver keys and final property manuals; confirm utility account transfers and provide any
                        warranty information.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 mt-8">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Professional Coordination</h3>
                  <p className="text-blue-800 font-light leading-relaxed">
                    Throughout the process, professional agents coordinate all parties—solicitors, buyers, notaries—to
                    deliver a smooth, efficient closing that protects your interests and ensures legal compliance.
                  </p>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-light text-gray-900 mb-4">Ready to Sell Your Marbella Property?</h3>
              <p className="text-gray-600 font-light mb-6 max-w-2xl mx-auto">
                Our experienced team guides you through every step of the selling process, from initial valuation to
                final closing, ensuring maximum value and minimal stress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-black hover:bg-gray-800 text-white">
                  <Link href="/contact?service=selling">Get Free Valuation</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/guides/purchase">View Buying Guide</Link>
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
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">PRO PART</h2>
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
