"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Download, Plus, Trash2, CheckCircle, Calendar, DollarSign, FileText } from "lucide-react"

interface AuthUser {
  email: string
  name: string
  role: "agent" | "autonomous" | "agency"
}

interface PaymentMethod {
  id: string
  type: "card"
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  isDefault: boolean
}

interface Invoice {
  id: string
  date: string
  amount: number
  status: "paid" | "pending" | "failed"
  description: string
  downloadUrl: string
}

interface Subscription {
  id: string
  plan: string
  status: "active" | "cancelled" | "past_due"
  currentPeriodStart: string
  currentPeriodEnd: string
  amount: number
  interval: "month" | "year"
}

export default function BillingPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Mock data
  const [subscription] = useState<Subscription>({
    id: "sub_1",
    plan: "Professional",
    status: "active",
    currentPeriodStart: "2024-05-01",
    currentPeriodEnd: "2024-06-01",
    amount: 99,
    interval: "month",
  })

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm_1",
      type: "card",
      last4: "4242",
      brand: "visa",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
    {
      id: "pm_2",
      type: "card",
      last4: "5555",
      brand: "mastercard",
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false,
    },
  ])

  const [invoices] = useState<Invoice[]>([
    {
      id: "inv_1",
      date: "2024-05-01",
      amount: 99,
      status: "paid",
      description: "Professional Plan - May 2024",
      downloadUrl: "#",
    },
    {
      id: "inv_2",
      date: "2024-04-01",
      amount: 99,
      status: "paid",
      description: "Professional Plan - April 2024",
      downloadUrl: "#",
    },
    {
      id: "inv_3",
      date: "2024-03-01",
      amount: 99,
      status: "paid",
      description: "Professional Plan - March 2024",
      downloadUrl: "#",
    },
  ])

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}")
    if (user && user.email) {
      setCurrentUser(user as AuthUser)
    } else {
      router.push("/auth")
    }
  }, [router])

  const handleRemovePaymentMethod = async (paymentMethodId: string) => {
    if (!confirm("Are you sure you want to remove this payment method?")) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setPaymentMethods((prev) => prev.filter((pm) => pm.id !== paymentMethodId))
      alert("Payment method removed successfully!")
    } catch (error) {
      console.error("Error removing payment method:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetDefaultPaymentMethod = async (paymentMethodId: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setPaymentMethods((prev) =>
        prev.map((pm) => ({
          ...pm,
          isDefault: pm.id === paymentMethodId,
        })),
      )
      alert("Default payment method updated!")
    } catch (error) {
      console.error("Error updating default payment method:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPaymentMethod = () => {
    // In a real app, this would open a payment method form or Stripe Elements
    alert("Add payment method functionality would be implemented here")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getCardBrandIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return "💳"
      case "mastercard":
        return "💳"
      case "amex":
        return "💳"
      default:
        return "💳"
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* AuthHeader додається в layout.tsx */}

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-light text-gray-900 mb-2">Billing</h1>
          <p className="text-gray-600 font-light">Manage your subscription and payment methods</p>
        </div>

        <Tabs defaultValue="subscription" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          {/* Subscription Tab */}
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-gray-600" />
                  <span>Current Subscription</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#5784FF] rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{subscription.plan} Plan</div>
                        <div className="text-sm text-gray-500">
                          {formatAmount(subscription.amount)}/{subscription.interval}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={subscription.status === "active" ? "default" : "destructive"}
                      className={subscription.status === "active" ? "bg-green-100 text-green-800" : ""}
                    >
                      {subscription.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Current Period</label>
                      <div className="text-sm text-gray-900">
                        {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Next Billing Date</label>
                      <div className="text-sm text-gray-900 flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {formatDate(subscription.currentPeriodEnd)}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button variant="outline" className="font-light">
                      Change Plan
                    </Button>
                    <Button variant="outline" className="font-light text-red-600 border-red-200 hover:bg-red-50">
                      Cancel Subscription
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment-methods">
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <span>Payment Methods</span>
                  </CardTitle>
                  <Button
                    onClick={handleAddPaymentMethod}
                    className="bg-[#5784FF] hover:bg-[#4a70e0] text-white font-light"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{getCardBrandIcon(method.brand)}</div>
                          <div>
                            <div className="font-medium text-gray-900 capitalize">
                              {method.brand} •••• {method.last4}
                            </div>
                            <div className="text-sm text-gray-500">
                              Expires {method.expiryMonth.toString().padStart(2, "0")}/{method.expiryYear}
                            </div>
                          </div>
                          {method.isDefault && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Default
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {!method.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSetDefaultPaymentMethod(method.id)}
                              disabled={isLoading}
                              className="font-light"
                            >
                              Set Default
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemovePaymentMethod(method.id)}
                            disabled={isLoading || method.isDefault}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <span>Invoices</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{invoice.description}</div>
                          <div className="text-sm text-gray-500">{formatDate(invoice.date)}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium text-gray-900">{formatAmount(invoice.amount)}</div>
                          <Badge
                            variant={
                              invoice.status === "paid"
                                ? "default"
                                : invoice.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              invoice.status === "paid"
                                ? "bg-green-100 text-green-800"
                                : invoice.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : ""
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm" className="font-light">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
