'use client'

import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { SectionTitle } from '@/components/SectionTitle'
import { FeatureSection } from '@/components/FeatureSection'
import { TryIt } from '@/components/TryIt'
import { QueryParams } from '@/components/QueryParams'
import { ResponseFormat } from '@/components/ResponseFormat'
import { ExampleUsage } from '@/components/ExampleUsage'
import { Card } from '@/components/Card'
import { CardTitle } from '@/components/CardTitle'
import { SupportedCountries } from '@/components/SupportedCountries'

export default function Home() {
  return (
    <div className="bg-gradient-to-b to-white min-h-screen from-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="mx-auto space-y-14 mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />

        <FeatureSection />

        <TryIt />

        {/* Documentation Section */}
        <section id="documentation" className="pb-20">
          <SectionTitle>API Documentation</SectionTitle>

          <div className="mx-auto space-y-8 max-w-4xl">
            <Card>
              <CardTitle>Endpoint</CardTitle>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <code className="text-blue-600 dark:text-blue-400">
                  GET /api/public-holidays
                </code>
              </div>
            </Card>
            <QueryParams />
            <ResponseFormat />
            <SupportedCountries />
            <ExampleUsage />
          </div>
        </section>
      </main>
    </div>
  )
}
