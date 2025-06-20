"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InvestorContactForm } from "@/components/investor-contact-form"
import { NewsletterSignup } from "@/components/newsletter-signup"

export default function ContactPage() {
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
              <h1 className="text-xl font-light text-gray-900">Contact Us</h1>
            </div>
            <Button asChild className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-sm font-light rounded-xl">
              <Link href="/listings">View Properties</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Get in Touch with Our Expert Team
          </h1>
          <p className="text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
            Whether you're looking to buy, sell, or invest in Marbella's luxury real estate market, our experienced
            professionals are here to guide you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 font-light mb-4">Speak directly with our agents</p>
              <a href="tel:+34695113333" className="text-black hover:text-gray-700 font-medium transition-colors">
                +34 695 113 333
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 font-light mb-4">Get detailed information</p>
              <a href="mailto:info@propart.es" className="text-black hover:text-gray-700 font-medium transition-colors">
                info@propart.es
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 font-light mb-4">Our Marbella office</p>
              <address className="text-black font-medium not-italic">
                Pl. de la Iglesia, 3, office 1-D
                <br />
                29670, San Pedro de Alcántara
                <br />
                Malaga, Spain
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Clock className="h-6 w-6 text-gray-600" />
            <h2 className="text-2xl font-light text-gray-900">Office Hours</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Monday - Friday</h3>
              <p className="text-gray-600 font-light">9:00 AM - 7:00 PM</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Saturday - Sunday</h3>
              <p className="text-gray-600 font-light">10:00 AM - 6:00 PM</p>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Available for emergency consultations 24/7</span>
          </div>
        </div>
      </section>

      {/* Investor Contact Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image with floating stats */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src="/images/contact-agent.jpg"
                  alt="Professional Real Estate Agent"
                  width={600}
                  height={700}
                  className="object-cover w-full h-[500px] lg:h-[600px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                <div className="text-2xl font-light text-gray-900">€2.4B+</div>
                <div className="text-xs text-gray-600 font-light">Properties Sold</div>
              </div>

              <div className="absolute -top-6 -right-6 bg-black rounded-2xl p-4 text-white">
                <div className="text-2xl font-light">500+</div>
                <div className="text-xs text-white/80 font-light">Happy Investors</div>
              </div>

              <div className="absolute top-1/2 -left-8 bg-white rounded-2xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                <div className="text-xl font-light text-gray-900">15+</div>
                <div className="text-xs text-gray-600 font-light">Years Experience</div>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div className="lg:pl-8">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">
                  Ready to Invest in Marbella?
                </h2>
                <p className="text-sm text-gray-600 font-light leading-relaxed max-w-md">
                  Connect with our expert team to explore exclusive investment opportunities in Costa del Sol's luxury
                  real estate market.
                </p>
              </div>

              <InvestorContactForm />

              <div className="mt-6 flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>24h Response Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Confidential Consultation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">How We Can Help You</h2>
            <p className="text-gray-600 font-light max-w-2xl mx-auto">
              Our comprehensive real estate services cover every aspect of your property journey in Marbella.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl">🏠</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Property Sales</h3>
              <p className="text-gray-600 font-light text-sm">
                Expert guidance for buying and selling luxury properties in Marbella's most exclusive areas.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">💰</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Investment Advisory</h3>
              <p className="text-gray-600 font-light text-sm">
                Strategic investment advice to maximize returns in Costa del Sol's luxury real estate market.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl">🏗️</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Property Development</h3>
              <p className="text-gray-600 font-light text-sm">
                From concept to completion, we manage luxury property development projects.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 text-xl">📋</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Legal Support</h3>
              <p className="text-gray-600 font-light text-sm">
                Comprehensive legal assistance for all property transactions and documentation.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-xl">🏦</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Financing Solutions</h3>
              <p className="text-gray-600 font-light text-sm">
                Access to preferred mortgage rates and financing options for international buyers.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-teal-600 text-xl">🔧</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Property Management</h3>
              <p className="text-gray-600 font-light text-sm">
                Complete property management services for rental properties and vacation homes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Find Our Office</h2>
            <p className="text-gray-600 font-light">
              Located in the heart of San Pedro de Alcántara, just minutes from Marbella's Golden Mile.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-light">Interactive Map</p>
                <p className="text-sm text-gray-400">Pl. de la Iglesia, 3, office 1-D</p>
                <p className="text-sm text-gray-400">29670, San Pedro de Alcántara</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
