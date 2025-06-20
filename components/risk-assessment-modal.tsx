"use client"

import { X, Shield, CheckCircle, AlertTriangle, TrendingDown, BarChart3, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RiskAssessmentModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RiskAssessmentModal({ isOpen, onClose }: RiskAssessmentModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-light text-gray-900">Risk Assessment</h2>
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
              Risk assessment on the Costa del Sol delivers a structured analysis of legal, environmental, and market
              risks—combining title-search reports, structural surveys, zoning checks, and price-trend models. By
              integrating Málaga-province registry data with S1 flood-risk maps and local market indices, these services
              quantify potential liabilities for properties in Marbella, Fuengirola, and Estepona.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-light text-blue-900 mb-1">€550-800</div>
              <div className="text-xs text-blue-700 font-light">Assessment Cost</div>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-light text-green-900 mb-1">0.3%</div>
              <div className="text-xs text-green-700 font-light">Insurance Rate</div>
            </div>
            <div className="bg-purple-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-light text-purple-900 mb-1">€400k+</div>
              <div className="text-xs text-purple-700 font-light">Recommended Value</div>
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
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-900">Data-Driven Identification</h4>
                </div>
                <p className="text-sm text-green-800 font-light leading-relaxed">
                  Combining registry searches with geotechnical and coastal-erosion reports uncovers issues—buyers
                  negotiating a €450,000 Fuengirola villa secured a €15,000 discount after a hidden easement was
                  revealed.
                </p>
              </div>
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-900">Unified Risk Scoring</h4>
                </div>
                <p className="text-sm text-green-800 font-light leading-relaxed">
                  Holistic packages (€550–€800) + legal review (&lt;1% purchase price) produce a single risk metric,
                  simplifying decision-making and reducing reliance on multiple consultants.
                </p>
              </div>
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-900">Mitigation Recommendations</h4>
                </div>
                <p className="text-sm text-green-800 font-light leading-relaxed">
                  Early detection of planning-permission gaps or flood exposures enables clients to secure tailored
                  indemnity insurance at 0.3% of property value, shielding against future claims.
                </p>
              </div>
            </div>
          </div>

          {/* Example Case Study */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="font-medium text-gray-900 mb-4">Case Study: €450,000 Fuengirola Villa</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Original Asking Price</span>
                  <span className="text-sm font-medium text-gray-900">€450,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Risk Assessment Cost</span>
                  <span className="text-sm font-medium text-gray-900">€650</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Hidden Easement Discovered</span>
                  <span className="text-sm font-medium text-red-600">Yes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Legal Review Cost</span>
                  <span className="text-sm font-medium text-gray-900">€4,200</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Price Reduction Negotiated</span>
                  <span className="text-sm font-medium text-green-600">€15,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Final Purchase Price</span>
                  <span className="text-sm font-medium text-gray-900">€435,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Assessment Costs</span>
                  <span className="text-sm font-medium text-gray-900">€4,850</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <span className="text-sm font-medium text-gray-900">Net Savings</span>
                  <span className="text-sm font-semibold text-green-600">€10,150</span>
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
                  <TrendingDown className="h-5 w-5 text-amber-600" />
                  <h4 className="font-medium text-amber-900">Upfront Expense</h4>
                </div>
                <p className="text-sm text-amber-800 font-light leading-relaxed">
                  Comprehensive assessments can total 1.5%–2.0% of purchase price (≈€8,250–€11,000 on a €550,000 villa),
                  which may deter cost-sensitive buyers.
                </p>
              </div>
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                  <h4 className="font-medium text-amber-900">Variable Report Quality</h4>
                </div>
                <p className="text-sm text-amber-800 font-light leading-relaxed">
                  Smaller firms sometimes issue generic summaries lacking actionable detail, requiring follow-up surveys
                  at extra cost.
                </p>
              </div>
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <h4 className="font-medium text-amber-900">Forecast Uncertainty</h4>
                </div>
                <p className="text-sm text-amber-800 font-light leading-relaxed">
                  Reliance on historical price-trend projections (e.g., 3% annual growth) may misalign with sudden
                  market shifts, reducing long-term accuracy.
                </p>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
              <div className="text-sm text-gray-600 font-light">
                Comprehensive risk analysis for informed property decisions
              </div>
              <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-sm font-light rounded-xl transition-all duration-200 shrink-0">
                Request Risk Assessment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
