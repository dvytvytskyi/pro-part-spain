"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calculator, CheckCircle, AlertTriangle, Info, X } from "lucide-react"

interface TaxCounselingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TaxCounselingModal({ isOpen, onClose }: TaxCounselingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between">
          <DialogTitle className="flex items-center gap-3 text-3xl font-light text-gray-900 tracking-tight">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            Tax Counseling Services
          </DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-10 w-10 p-0 hover:bg-gray-100 rounded-xl">
            <X className="h-5 w-5 text-black font-light" />
          </Button>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 space-y-8">
          {/* Title */}
          <div className="text-center pt-4">
            <h2 className="text-2xl font-light text-gray-900 mb-2 tracking-tight">Costa del Sol Tax Optimization</h2>
            <p className="text-sm text-gray-600 font-light">
              Expert tax strategies for Spanish real estate investments
            </p>
          </div>

          {/* Overview */}
          <div className="bg-gray-50 rounded-3xl p-8">
            <p className="text-lg text-gray-700 font-light leading-relaxed">
              Tax counseling on the Costa del Sol focuses on optimizing{" "}
              <span className="font-medium">Property Transfer Tax (8% ITP in Andalusia)</span>, Non-Resident Income Tax
              (Modelo 210), Wealth Tax (IMI) and Capital Gains Tax. Advisors apply regional reductions—such as a{" "}
              <span className="font-medium">€4,000 ITP cut</span> on a €550,000 Marbella villa—and leverage deductions
              for rehabilitation works to reduce annual IMI by up to <span className="font-medium">20%</span>. They also
              structure reinvestment relief and family-holding vehicles to defer capital-gains liabilities.
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Calculator className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Measurable Savings</h4>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    Clients typically save <span className="font-medium text-green-700">5%–8%</span> of purchase price
                    through ITP exemptions and rehabilitation credits.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Compliance Assurance</h4>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    Expert monitoring of Andalusian and EU tax changes mitigates audit and penalty risk.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Info className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Liquidity Preservation</h4>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    Deferral strategies maintain cash flow, crucial for non-resident buyers.
                  </p>
                </div>
              </div>

              {/* Tax Savings Example */}
              <div className="bg-white rounded-2xl p-6">
                <h4 className="text-base font-medium text-gray-900 mb-3">Example: €550,000 Marbella Villa</h4>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Standard ITP (8%):</span>
                  <span className="text-sm font-medium text-gray-900">€44,000</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Regional reduction:</span>
                  <span className="text-sm font-medium text-green-700">-€4,000</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Rehabilitation credits:</span>
                  <span className="text-sm font-medium text-green-700">-€2,200</span>
                </div>
                <div className="flex justify-between items-center py-2 pt-2 font-medium">
                  <span className="text-gray-900">Final ITP:</span>
                  <span className="text-green-700">€37,800</span>
                </div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-amber-700">
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    High Advisory Fees
                  </h4>
                  <p className="font-light">
                    Complex strategies on properties over €1 million can incur fees exceeding €20,000.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Legislative Volatility
                  </h4>
                  <p className="font-light">
                    Frequent rule changes demand ongoing review; outdated plans risk non-compliance.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Over-Complexity Risk
                  </h4>
                  <p className="font-light">
                    Excessive structuring may attract tax-authority scrutiny and administrative costs.
                  </p>
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
                For transactions above <span className="font-medium">€400,000</span> or portfolios with cross-border
                elements, the clear tax reductions and audit protection justify professional fees—provided clients match
                advisory scope to asset value.
              </p>
            </div>
          </div>

          {/* CTA */}
          {/* Footer */}
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
              <div className="text-sm text-gray-600 font-light">
                Expert tax strategies for Spanish real estate investments
              </div>
              <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-sm font-light rounded-xl transition-all duration-200 shrink-0">
                Contact Tax Advisor
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
