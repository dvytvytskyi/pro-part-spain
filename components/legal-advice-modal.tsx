"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Scale, CheckCircle, AlertTriangle, Info, X } from "lucide-react"

interface LegalAdviceModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LegalAdviceModal({ isOpen, onClose }: LegalAdviceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between">
          <DialogTitle className="flex items-center gap-3 text-3xl font-light text-gray-900 tracking-tight">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
              <Scale className="h-6 w-6 text-white" />
            </div>
            Legal Advisory Services
          </DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-10 w-10 p-0 hover:bg-gray-100 rounded-xl">
            <X className="h-5 w-5 text-black font-light" />
          </Button>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 space-y-8">
          {/* Title */}
          <div className="text-center pt-4">
            <h2 className="text-2xl font-light text-gray-900 mb-2 tracking-tight">Costa del Sol Real Estate</h2>
            <p className="text-sm text-gray-600 font-light">
              Professional legal guidance for your property transactions
            </p>
          </div>

          {/* Overview */}
          <div className="bg-gray-50 rounded-3xl p-8">
            <p className="text-lg text-gray-700 font-light leading-relaxed">
              Specialist legal counsel for Costa del Sol transactions offers clear guidance through Andalusia's{" "}
              <span className="font-medium">8% ITP rate</span>, notarial formalities, and land‐registry filings. By
              focusing on regional nuances—such as Málaga‐province easement checks and local mortgage practices—these
              services streamline closings and prevent costly oversights.
            </p>
          </div>

          {/* Pros Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">Advantages</h3>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-3xl p-8 space-y-6">
              <p className="text-base text-gray-700 font-light leading-relaxed">
                Experts provide transparent, itemized cost estimates, uncover hidden encumbrances, and coordinate with
                banks, notaries, and registries to ensure registration within six weeks.
              </p>

              {/* Cost Breakdown */}
              <div className="bg-white rounded-2xl p-6 space-y-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Example: €550,000 Villa Transaction</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-light text-green-700 mb-1">€44,000</div>
                    <div className="text-sm text-gray-600 font-light">ITP Tax</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-light text-green-700 mb-1">€6,050</div>
                    <div className="text-sm text-gray-600 font-light">Notary & Registry</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-light text-green-700 mb-1">€5,500</div>
                    <div className="text-sm text-gray-600 font-light">Legal Fee</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <h4 className="text-base font-medium text-gray-900 mb-3">Success Story</h4>
                <p className="text-sm text-green-700 font-light">
                  <span className="font-medium">€12,000 saved</span> in one Marbella case by uncovering hidden
                  encumbrances before completion.
                </p>
              </div>
            </div>
          </div>

          {/* Cons Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">Considerations</h3>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 space-y-4">
              <p className="text-base text-gray-700 font-light leading-relaxed">
                Premium coastal valuations mean absolute fees can be substantial (legal and notarial costs over €25,000
                on million-euro properties), and fixed-fee minimums (often €3,000) may deter smaller buyers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-700">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-light">• Fixed-fee minimums often €3,000</p>
                  <p className="font-light">• May deter smaller buyers</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-light">• Seasonal notarial surcharges</p>
                  <p className="font-light">• Registry backlogs possible</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-black text-white rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Info className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-medium text-white">Our Recommendation</h3>
              </div>
              <p className="text-base text-white/90 font-light leading-relaxed">
                For transactions above <span className="font-medium">€400,000</span> or complex title histories, the
                risk mitigation and efficiency these legal services deliver justify their expense. For budget‐conscious
                or smaller deals, clients should weigh fixed minimums and potential regional fee fluctuations before
                engagement.
              </p>
            </div>
          </div>

          {/* CTA */}
          {/* Footer */}
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
              <div className="text-sm text-gray-600 font-light">
                Professional legal guidance for your property transactions
              </div>
              <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-sm font-light rounded-xl transition-all duration-200 shrink-0">
                Contact Legal Advisor
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
