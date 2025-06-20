"use client"

import { X, CreditCard, CheckCircle, AlertTriangle, TrendingUp, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FinancingGuaranteesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function FinancingGuaranteesModal({ isOpen, onClose }: FinancingGuaranteesModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-light text-gray-900">Financing and Guarantees</h2>
              <p className="text-sm text-gray-600 font-light">Costa del Sol Real Estate Services</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4 text-black font-light" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Overview */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Overview</h3>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              Specialist financing and guarantee services on the Costa del Sol address the unique challenges of securing
              mortgages, deposit bonds, and performance guarantees in a market characterized by high non-resident demand
              and variable bank policies. Advisors negotiate loan-to-value ratios (commonly <strong>65%–75%</strong>),
              compare fixed versus variable interest options (<strong>1.8%–3.2%</strong> annual rates), and arrange
              guarantees—such as bank bonds or insurance-backed deposits—to satisfy vendor pre-contract requirements and
              EPC energy-efficiency stipulations.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-light text-blue-900 mb-1">65-75%</div>
              <div className="text-xs text-blue-700 font-light">Typical LTV Ratio</div>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-light text-green-900 mb-1">1.8-3.2%</div>
              <div className="text-xs text-green-700 font-light">Interest Rates</div>
            </div>
            <div className="bg-purple-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-light text-purple-900 mb-1">4 weeks</div>
              <div className="text-xs text-purple-700 font-light">Approval Time</div>
            </div>
          </div>

          {/* Advantages */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Advantages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-900">Competitive Mortgage Terms</h4>
                </div>
                <p className="text-sm text-green-800 font-light leading-relaxed">
                  Through panel banks in Málaga and Marbella, clients typically secure 70% LTV at 1.9% fixed over 20
                  years, locking in predictable payments and shielding against Euribor volatility.
                </p>
              </div>
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-900">Tailored Guarantee Structures</h4>
                </div>
                <p className="text-sm text-green-800 font-light leading-relaxed">
                  Bank guarantees and escrow services protect both parties—buyers defer full payment until registration,
                  while sellers enjoy enforceable deposit security. In one Estepona purchase, a €30,000 guarantee
                  replaced an outright deposit, improving buyer cash-flow.
                </p>
              </div>
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-900">Streamlined Approval Process</h4>
                </div>
                <p className="text-sm text-green-800 font-light leading-relaxed">
                  Legal-finance teams coordinate property valuations, credit dossiers, and notary authorizations,
                  reducing approval times from eight to four weeks.
                </p>
              </div>
            </div>
          </div>

          {/* Example Calculation */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="font-medium text-gray-900 mb-4">Example: €500,000 Property Financing</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Property Value</span>
                  <span className="text-sm font-medium text-gray-900">€500,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">LTV (70%)</span>
                  <span className="text-sm font-medium text-gray-900">€350,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Interest Rate (Fixed)</span>
                  <span className="text-sm font-medium text-gray-900">1.9%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Term</span>
                  <span className="text-sm font-medium text-gray-900">20 years</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Monthly Payment</span>
                  <span className="text-sm font-medium text-gray-900">€1,785</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Arrangement Fee (1.5%)</span>
                  <span className="text-sm font-medium text-gray-900">€5,250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Valuation Cost</span>
                  <span className="text-sm font-medium text-gray-900">€500</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <span className="text-sm font-medium text-gray-900">Total Initial Costs</span>
                  <span className="text-sm font-semibold text-gray-900">€155,750</span>
                </div>
              </div>
            </div>
          </div>

          {/* Considerations */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Considerations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="h-5 w-5 text-amber-600" />
                  <h4 className="font-medium text-amber-900">Upfront Fees and Commissions</h4>
                </div>
                <p className="text-sm text-amber-800 font-light leading-relaxed">
                  Arrangement fees (1.0%–1.5% of loan amount), guarantee commissions (0.5% annually), and valuation
                  costs (€350–€600) can add 2%–3% to financing expenses.
                </p>
              </div>
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-amber-600" />
                  <h4 className="font-medium text-amber-900">Complex Eligibility Criteria</h4>
                </div>
                <p className="text-sm text-amber-800 font-light leading-relaxed">
                  Non-resident buyers often face stricter income proofs and higher down payments, limiting leverage for
                  smaller investors.
                </p>
              </div>
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-5 w-5 text-amber-600" />
                  <h4 className="font-medium text-amber-900">Interest-Rate Exposure</h4>
                </div>
                <p className="text-sm text-amber-800 font-light leading-relaxed">
                  Variable-rate options, though initially cheaper, carry refinancing risk if Euribor spikes, potentially
                  doubling monthly repayments over the term.
                </p>
              </div>
            </div>
          </div>

          {/* Conclusion */}
        </div>
        {/* Footer */}
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
            <div className="text-sm text-gray-600 font-light">
              Competitive financing and guarantee solutions for Costa del Sol
            </div>
            <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-sm font-light rounded-xl transition-all duration-200 shrink-0">
              Contact Financing Advisor
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
