"use client"

import { useState } from "react"
import { X, Handshake, TrendingUp, Users, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CommercialNegotiationsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CommercialNegotiationsModal({ isOpen, onClose }: CommercialNegotiationsModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <Handshake className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Commercial Negotiations</h2>
              <p className="text-sm text-gray-600 font-light">Strategic partnership for optimal deal terms</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4 text-black" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "overview" ? "text-black border-b-2 border-black" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("process")}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "process" ? "text-black border-b-2 border-black" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Process
          </button>
          <button
            onClick={() => setActiveTab("analysis")}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "analysis" ? "text-black border-b-2 border-black" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Analysis
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-light text-blue-600 mb-1">3-5%</div>
                  <div className="text-xs text-blue-700 font-light">Average Price Reduction</div>
                </div>
                <div className="bg-green-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-light text-green-600 mb-1">€1.2M</div>
                  <div className="text-xs text-green-700 font-light">Nueva Andalucía Reference</div>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-light text-purple-600 mb-1">1-2%</div>
                  <div className="text-xs text-purple-700 font-light">Success Fee Range</div>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 font-light leading-relaxed">
                  Commercial negotiation specialists on the Costa del Sol act as strategic partners in securing optimal
                  terms for property acquisitions, leases, and joint-venture agreements. Leveraging local market
                  intelligence—from Marbella's luxury segment to Fuengirola's rental-investment market—these experts
                  engage counterparties, draft negotiation strategies, and manage counterpart due diligence.
                </p>
                <p className="text-gray-700 font-light leading-relaxed">
                  Their involvement spans pre-contract offers ("oferta vinculante"), escalation of price or payment
                  milestones, and enforcement of performance guarantees.
                </p>
              </div>

              {/* Advantages */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Key Advantages
                </h3>
                <div className="space-y-3">
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-medium text-green-900 mb-2">Market-Grounded Leverage</h4>
                    <p className="text-sm text-green-800 font-light leading-relaxed">
                      Advisors bring real-time transaction data (e.g., recent €1.2 million villa sales in Nueva
                      Andalucía) to justify price proposals and counteroffers, often reducing purchase prices by 3%–5%
                      on high-end assets.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-medium text-green-900 mb-2">Structured Process Management</h4>
                    <p className="text-sm text-green-800 font-light leading-relaxed">
                      Formalized negotiation playbooks cover term-sheet drafting, risk allocation clauses, and
                      escalation protocols—ensuring systematic responses to seller tactics and preventing last-minute
                      concession creep.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-medium text-green-900 mb-2">Multilateral Coordination</h4>
                    <p className="text-sm text-green-800 font-light leading-relaxed">
                      Professionals liaise not only with vendors but also with project developers, community-association
                      boards, and co-investors, aligning commercial, legal, and financing objectives in complex deals
                      such as syndicated holiday-rental ventures.
                    </p>
                  </div>
                </div>
              </div>

              {/* Disadvantages */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Considerations
                </h3>
                <div className="space-y-3">
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <h4 className="font-medium text-yellow-900 mb-2">Fee Premiums for Specialist Expertise</h4>
                    <p className="text-sm text-yellow-800 font-light leading-relaxed">
                      Advanced negotiation mandates—particularly for multi-party joint ventures—can incur retainers of
                      €5,000–€10,000 plus success fees (1%–2% of deal value), which may outweigh savings on smaller
                      transactions.
                    </p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <h4 className="font-medium text-yellow-900 mb-2">Potential Over-Structuring</h4>
                    <p className="text-sm text-yellow-800 font-light leading-relaxed">
                      Rigid adherence to negotiation frameworks can slow down deal velocity, risking lost opportunities
                      in competitive markets where speed of offer is critical.
                    </p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <h4 className="font-medium text-yellow-900 mb-2">Variable Counterparty Responsiveness</h4>
                    <p className="text-sm text-yellow-800 font-light leading-relaxed">
                      While advisors can streamline internal coordination, they cannot control external parties'
                      responsiveness; protracted replies from developers or homeowners' associations can delay closings
                      despite best efforts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "process" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Negotiation Process</h3>

              {/* Process Steps */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Market Intelligence Gathering</h4>
                    <p className="text-sm text-gray-600 font-light">
                      Collect real-time transaction data and comparable sales to establish negotiation baseline
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Strategy Development</h4>
                    <p className="text-sm text-gray-600 font-light">
                      Draft negotiation playbooks covering term-sheets, risk allocation, and escalation protocols
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Counterparty Engagement</h4>
                    <p className="text-sm text-gray-600 font-light">
                      Coordinate with vendors, developers, community boards, and co-investors
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Contract Execution</h4>
                    <p className="text-sm text-gray-600 font-light">
                      Manage oferta vinculante, payment milestones, and performance guarantees
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-medium text-gray-900 mb-4">Specialized Areas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700 font-light">Resort Acquisitions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700 font-light">Joint Ventures</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700 font-light">Mixed-Use Developments</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Handshake className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700 font-light">Co-Investment Structures</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analysis" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Cost-Benefit Analysis</h3>

              {/* Fee Structure */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-medium text-gray-900 mb-4">Fee Structure</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-light">Retainer Fee</span>
                    <span className="text-sm font-medium text-gray-900">€5,000 - €10,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-light">Success Fee</span>
                    <span className="text-sm font-medium text-gray-900">1% - 2% of deal value</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-light">Average Savings</span>
                    <span className="text-sm font-medium text-green-600">3% - 5% purchase price</span>
                  </div>
                </div>
              </div>

              {/* ROI Example */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h4 className="font-medium text-blue-900 mb-4">Example: €2M Property Transaction</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-800 font-light">Original asking price:</span>
                    <span className="font-medium text-blue-900">€2,000,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800 font-light">Negotiated price (4% reduction):</span>
                    <span className="font-medium text-blue-900">€1,920,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800 font-light">Negotiation fees (1.5%):</span>
                    <span className="font-medium text-blue-900">€30,000</span>
                  </div>
                  <div className="border-t border-blue-200 pt-2 flex justify-between">
                    <span className="text-blue-800 font-medium">Net savings:</span>
                    <span className="font-semibold text-green-600">€50,000</span>
                  </div>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-black rounded-2xl p-6 text-white">
                <h4 className="font-medium text-white mb-3">Summary</h4>
                <p className="text-sm text-white/90 font-light leading-relaxed">
                  For investors and developers undertaking significant commercial transactions on the Costa del Sol—such
                  as resort acquisitions, mixed-use developments, or co-investment structures—engaging a dedicated
                  commercial negotiation team delivers measurable value through price improvements, risk-adjusted deal
                  architecture, and stakeholder alignment.
                </p>
                <p className="text-sm text-white/90 font-light leading-relaxed mt-3">
                  Budget-sensitive or opportunistic buyers should weigh these benefits against the service's fee
                  structure and the potential for procedural complexity.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
            <div className="text-sm text-gray-600 font-light">
              Professional commercial negotiation services for Costa del Sol real estate
            </div>
            <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-sm font-light rounded-xl transition-all duration-200 shrink-0">
              Request Negotiation Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
