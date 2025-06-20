"use client"

import { useState } from "react"
import { X, FileText, CheckCircle, AlertTriangle, Clock, Users, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TransactionSupportModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TransactionSupportModal({ isOpen, onClose }: TransactionSupportModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Transaction Support</h2>
              <p className="text-sm text-gray-600 font-light">Complete legal support for property transactions</p>
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
            onClick={() => setActiveTab("pricing")}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "pricing" ? "text-black border-b-2 border-black" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Pricing
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Description */}
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 font-light leading-relaxed">
                  Comprehensive transaction support on the Costa del Sol encompasses all legal steps—from preparation of
                  sale and purchase agreements (Contrato de Compraventa) to notarial execution and Land Registry
                  registration in Málaga‐province offices. By integrating document drafting, due‐diligence coordination,
                  and closing logistics, these services aim to streamline complex coastal property deals in Marbella,
                  Estepona, and surrounding areas.
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-light text-blue-600 mb-1">4-8</div>
                  <div className="text-xs text-blue-700 font-light">Weeks to Complete</div>
                </div>
                <div className="bg-green-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-light text-green-600 mb-1">0.8-1.2%</div>
                  <div className="text-xs text-green-700 font-light">Typical Fee Range</div>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-light text-purple-600 mb-1">€350K+</div>
                  <div className="text-xs text-purple-700 font-light">Recommended Minimum</div>
                </div>
              </div>

              {/* Advantages */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Key Advantages
                </h3>
                <div className="space-y-3">
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-medium text-green-900 mb-2">End-to-End Coverage</h4>
                    <p className="text-sm text-green-800 font-light leading-relaxed">
                      Single‐provider management of contracts, escrow arrangements, and registry filings reduces risk of
                      omissions and miscommunication between multiple parties.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-medium text-green-900 mb-2">Fixed-Fee Transparency</h4>
                    <p className="text-sm text-green-800 font-light leading-relaxed">
                      Many firms offer flat-fee packages (typically 0.8%–1.2% of property price) that cover document
                      preparation, notary attendance, and registry submissions—enabling precise budgeting.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-medium text-green-900 mb-2">Accelerated Closings</h4>
                    <p className="text-sm text-green-800 font-light leading-relaxed">
                      Established relationships with local notaries and registrars can compress registration timelines
                      from eight weeks to as few as four, protecting clients from market-rate fluctuations.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-medium text-green-900 mb-2">Regulatory Compliance</h4>
                    <p className="text-sm text-green-800 font-light leading-relaxed">
                      Expert handling of formal requirements—such as energy-performance certificates (EPC) and
                      community‐fee clearances—avoids post-closing liabilities.
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
                    <h4 className="font-medium text-yellow-900 mb-2">Advisory Costs</h4>
                    <p className="text-sm text-yellow-800 font-light leading-relaxed">
                      Even at 1.0% of a €600,000 property, fees can reach €6,000, which may deter buyers in the
                      €200,000–€300,000 segment.
                    </p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <h4 className="font-medium text-yellow-900 mb-2">Process Standardization</h4>
                    <p className="text-sm text-yellow-800 font-light leading-relaxed">
                      Package services sometimes follow rigid templates that may overlook bespoke contract clauses or
                      unique financing conditions.
                    </p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <h4 className="font-medium text-yellow-900 mb-2">Dependency on Third Parties</h4>
                    <p className="text-sm text-yellow-800 font-light leading-relaxed">
                      Despite proactive coordination, external delays—such as notary backlogs or registry system
                      outages—can still postpone final registration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "process" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Transaction Process</h3>

              {/* Process Steps */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Document Preparation</h4>
                    <p className="text-sm text-gray-600 font-light">
                      Draft sale and purchase agreements (Contrato de Compraventa) and coordinate due diligence
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Legal Verification</h4>
                    <p className="text-sm text-gray-600 font-light">
                      Verify energy-performance certificates (EPC) and community fee clearances
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Notarial Execution</h4>
                    <p className="text-sm text-gray-600 font-light">
                      Coordinate notary appointments and manage escrow arrangements
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Registry Registration</h4>
                    <p className="text-sm text-gray-600 font-light">
                      Complete Land Registry registration in Málaga province offices
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-medium text-gray-900 mb-4">Coverage Areas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700 font-light">Marbella</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700 font-light">Estepona</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700 font-light">Benahavis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700 font-light">Surrounding Areas</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h4 className="font-medium text-blue-900 mb-4">Typical Timeline</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-800 font-light">Document Preparation</span>
                    <span className="text-sm font-medium text-blue-900">1-2 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-800 font-light">Due Diligence & Verification</span>
                    <span className="text-sm font-medium text-blue-900">1-2 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-800 font-light">Notarial Process</span>
                    <span className="text-sm font-medium text-blue-900">1 week</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-800 font-light">Registry Registration</span>
                    <span className="text-sm font-medium text-blue-900">1-3 weeks</span>
                  </div>
                  <div className="border-t border-blue-200 pt-2 flex justify-between items-center">
                    <span className="text-sm text-blue-800 font-medium">Total Duration</span>
                    <span className="text-sm font-semibold text-blue-900">4-8 weeks</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Fee Structure</h3>

              {/* Fee Structure */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-medium text-gray-900 mb-4">Standard Fees</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-light">Transaction Support Fee</span>
                    <span className="text-sm font-medium text-gray-900">0.8% - 1.2% of property value</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-light">Document Preparation</span>
                    <span className="text-sm font-medium text-gray-900">Included</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-light">Notary Attendance</span>
                    <span className="text-sm font-medium text-gray-900">Included</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-light">Registry Submissions</span>
                    <span className="text-sm font-medium text-gray-900">Included</span>
                  </div>
                </div>
              </div>

              {/* Pricing Examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h4 className="font-medium text-blue-900 mb-4">€600,000 Property</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-800 font-light">Property value:</span>
                      <span className="font-medium text-blue-900">€600,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800 font-light">Service fee (1.0%):</span>
                      <span className="font-medium text-blue-900">€6,000</span>
                    </div>
                    <div className="border-t border-blue-200 pt-2 flex justify-between">
                      <span className="text-blue-800 font-medium">Total cost:</span>
                      <span className="font-semibold text-blue-900">€6,000</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-2xl p-6">
                  <h4 className="font-medium text-green-900 mb-4">€1,200,000 Property</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-800 font-light">Property value:</span>
                      <span className="font-medium text-green-900">€1,200,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-800 font-light">Service fee (0.9%):</span>
                      <span className="font-medium text-green-900">€10,800</span>
                    </div>
                    <div className="border-t border-green-200 pt-2 flex justify-between">
                      <span className="text-green-800 font-medium">Total cost:</span>
                      <span className="font-semibold text-green-900">€10,800</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-black rounded-2xl p-6 text-white">
                <h4 className="font-medium text-white mb-3">Recommendation</h4>
                <p className="text-sm text-white/90 font-light leading-relaxed">
                  For buyers and sellers engaged in mid- to high-value Costa del Sol transactions (above €350,000), full
                  transaction support services deliver measurable efficiency and legal certainty. Budget-sensitive
                  clients should compare fee structures and ensure contract customizations align with their specific
                  financing and due-diligence needs.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
            <div className="text-sm text-gray-600 font-light flex-1">
              Complete transaction support for Costa del Sol property deals
            </div>
            <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-sm font-light rounded-xl transition-all duration-200 shrink-0 w-full sm:w-auto">
              Request Transaction Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
