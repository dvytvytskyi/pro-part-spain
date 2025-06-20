import { usePropertyDetail } from "@/hooks/use-property-detail"

interface RentalDetailPageProps {
  params: {
    id: string
  }
}

export default function RentalDetailPage({ params }: RentalDetailPageProps) {
  const { property, loading, error } = usePropertyDetail(params.id)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!property) {
    return <div>Property not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{property.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div>
          <p className="text-2xl font-semibold mb-4">${property.price}/month</p>
          <p className="text-gray-600 mb-4">{property.description}</p>
          <div className="space-y-2">
            <p>
              <strong>Location:</strong> {property.location}
            </p>
            <p>
              <strong>Type:</strong> {property.type}
            </p>
            <p>
              <strong>Bedrooms:</strong> {property.bedrooms}
            </p>
            <p>
              <strong>Bathrooms:</strong> {property.bathrooms}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
