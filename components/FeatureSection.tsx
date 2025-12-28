import { SectionTitle } from './SectionTitle'

interface Feature {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: '🌐',
    title: '60 Countries/Regions Covered',
    description:
      'Comprehensive coverage across Asia-Pacific, Europe, Americas, Middle East, and Africa with accurate regional data.',
  },
  {
    icon: '📅',
    title: 'Historical & Future Data',
    description:
      'Access holiday data from 2020 through 2025, with accurate dates for all years.',
  },
  {
    icon: '🎯',
    title: 'Rich Metadata',
    description: 'Includes local names, holiday types, duration support.',
  },
]

export const FeatureSection = () => {
  return (
    <section>
      <SectionTitle>Why Choose Our API?</SectionTitle>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-xl shadow-md p-8 dark:bg-gray-800"
          >
            <div className="mb-4 text-4xl">{feature.icon}</div>
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
