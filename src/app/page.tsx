'use client';

import Link from 'next/link';

import { useHydratedTranslation } from 'shared/i18n/hooks';
import { ProtectedRoute } from 'shared/lib';
import { Button, Card } from 'shared/ui';

export default function HomePage() {
  const { t } = useHydratedTranslation();

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="mb-6 text-6xl font-bold text-gray-900">
              {t('homepage.hero.title')}{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('homepage.hero.appName')}
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
              {t('homepage.hero.description')}
            </p>

            <div className="flex flex-col justify-center gap-4 md:flex-row">
              <Link href="/dashboard">
                <Button size="lg" className="px-8 py-3 text-lg">
                  {t('homepage.hero.goToDashboard')}
                </Button>
              </Link>
              <Link href="https://dzencode.com/" target="_blank">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  {t('homepage.hero.learnMore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              {t('homepage.features.title')}
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              {t('homepage.features.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {t('homepage.features.nextjs.title')}
              </h3>
              <p className="text-gray-600">
                {t('homepage.features.nextjs.description')}
              </p>
            </Card>

            <Card className="p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {t('homepage.features.typescript.title')}
              </h3>
              <p className="text-gray-600">
                {t('homepage.features.typescript.description')}
              </p>
            </Card>

            <Card className="p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {t('homepage.features.uiComponents.title')}
              </h3>
              <p className="text-gray-600">
                {t('homepage.features.uiComponents.description')}
              </p>
            </Card>

            <Card className="p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                <svg
                  className="h-6 w-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {t('homepage.features.modernTooling.title')}
              </h3>
              <p className="text-gray-600">
                {t('homepage.features.modernTooling.description')}
              </p>
            </Card>

            <Card className="p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {t('homepage.features.internationalization.title')}
              </h3>
              <p className="text-gray-600">
                {t('homepage.features.internationalization.description')}
              </p>
            </Card>

            <Card className="p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {t('homepage.features.authentication.title')}
              </h3>
              <p className="text-gray-600">
                {t('homepage.features.authentication.description')}
              </p>
            </Card>
          </div>
        </div>

        <div className="bg-gray-900 py-16 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              {t('homepage.cta.title')}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-300">
              {t('homepage.cta.description')}
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-gray-600 hover:bg-white hover:text-gray-900"
              >
                {t('homepage.cta.exploreDashboard')}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
