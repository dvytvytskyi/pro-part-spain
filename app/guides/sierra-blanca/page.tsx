import Hero from "@/components/Hero"
import Overview from "@/components/Overview"
import Itinerary from "@/components/Itinerary"
import ThingsToDo from "@/components/ThingsToDo"
import WhereToStay from "@/components/WhereToStay"
import GettingAround from "@/components/GettingAround"
import Faq from "@/components/Faq"

const SierraBlancaPage = () => {
  const heroContent = {
    title: "Discover Sierra Blanca",
    subtitle: "A Luxurious Enclave in Marbella",
    image: "/images/sierra-blanca/hero.jpg",
    imageAlt: "Sierra Blanca street view",
  }

  const overviewContent = {
    title: "Sierra Blanca Overview",
    content: [
      "Sierra Blanca is an exclusive residential area located on the slopes of La Concha mountain, just a few minutes from Marbella city center. Known as the 'Beverly Hills of Marbella,' it offers stunning views, luxurious villas, and impeccable security.",
      "This prestigious neighborhood is characterized by its elegant architecture, lush gardens, and tranquil atmosphere. It's a favorite among affluent residents seeking privacy and exclusivity.",
    ],
    image: "/images/sierra-blanca/overview.jpg",
    imageAlt: "Sierra Blanca villa",
  }

  const itineraryContent = {
    title: "Suggested Itinerary",
    days: [
      {
        day: "Day 1: Arrival and Exploration",
        activities: [
          "Arrive at Malaga Airport and transfer to your accommodation in Sierra Blanca.",
          "Settle in and take a leisurely stroll through the neighborhood, admiring the beautiful villas and gardens.",
          "Enjoy a welcome dinner at a local restaurant in Marbella.",
        ],
      },
      {
        day: "Day 2: Beach and Relaxation",
        activities: [
          "Spend the morning relaxing on one of Marbella's beautiful beaches.",
          "Have lunch at a beachfront chiringuito (beach bar).",
          "In the afternoon, indulge in a spa treatment at a luxury hotel.",
        ],
      },
      {
        day: "Day 3: Golf and Glamour",
        activities: [
          "Play a round of golf at one of the many world-class golf courses in the area.",
          "Visit Puerto Banús, known for its luxury yachts, designer boutiques, and vibrant nightlife.",
          "Enjoy a gourmet dinner at a top-rated restaurant in Puerto Banús.",
        ],
      },
    ],
  }

  const thingsToDoContent = {
    title: "Things to Do in Sierra Blanca",
    activities: [
      {
        name: "Explore the Golden Mile",
        description:
          "Take a walk or bike ride along Marbella's famous Golden Mile, lined with luxury hotels, restaurants, and shops.",
        image: "/images/sierra-blanca/golden-mile.jpg",
        imageAlt: "Golden Mile Marbella",
      },
      {
        name: "Visit Puerto Banús",
        description:
          "Experience the glamour and excitement of Puerto Banús, with its luxury yachts, designer boutiques, and lively nightlife.",
        image: "/images/sierra-blanca/puerto-banus.jpg",
        imageAlt: "Puerto Banus harbor",
      },
      {
        name: "Play Golf",
        description: "Enjoy a round of golf at one of the many world-class golf courses in the Marbella area.",
        image: "/images/sierra-blanca/golf.jpg",
        imageAlt: "Golf course Marbella",
      },
    ],
  }

  const whereToStayContent = {
    title: "Where to Stay in Sierra Blanca",
    hotels: [
      {
        name: "Marbella Club Hotel",
        description: "A legendary luxury hotel located on the Golden Mile, offering exceptional service and amenities.",
        image: "/images/sierra-blanca/marbella-club.jpg",
        imageAlt: "Marbella Club Hotel",
      },
      {
        name: "Puente Romano Beach Resort",
        description: "A stunning beachfront resort with lush gardens, a Roman bridge, and a variety of dining options.",
        image: "/images/sierra-blanca/puente-romano.jpg",
        imageAlt: "Puente Romano Resort",
      },
    ],
  }

  const gettingAroundContent = {
    title: "Getting Around Sierra Blanca",
    options: [
      {
        name: "Taxi",
        description: "Taxis are readily available in Marbella and can be a convenient way to get around.",
      },
      {
        name: "Rental Car",
        description:
          "Renting a car provides flexibility and allows you to explore the surrounding area at your own pace.",
      },
      {
        name: "Private Transfer",
        description:
          "Arrange for a private transfer from the airport or to other destinations for a more comfortable and hassle-free experience.",
      },
    ],
  }

  const faqContent = {
    title: "Frequently Asked Questions",
    questions: [
      {
        question: "What is the best time to visit Sierra Blanca?",
        answer:
          "The best time to visit Sierra Blanca is during the spring or fall, when the weather is mild and the crowds are smaller.",
      },
      {
        question: "How far is Sierra Blanca from Malaga Airport?",
        answer: "Sierra Blanca is approximately 60 kilometers from Malaga Airport, a drive of about 45 minutes.",
      },
      {
        question: "Is Sierra Blanca a safe neighborhood?",
        answer: "Yes, Sierra Blanca is considered a very safe neighborhood with 24-hour security.",
      },
    ],
  }

  return (
    <div>
      <Hero {...heroContent} />
      <Overview {...overviewContent} />
      <Itinerary {...itineraryContent} />
      <ThingsToDo {...thingsToDoContent} />
      <WhereToStay {...whereToStayContent} />
      <GettingAround {...gettingAroundContent} />
      <Faq {...faqContent} />
    </div>
  )
}

export default SierraBlancaPage
