'use client'

import { useSearchParams } from 'next/navigation'
import { Card, Button } from "@nextui-org/react"
import { IconAlertCircle } from "@tabler/icons-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconAlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error === 'AccessDenied' 
                ? 'You do not have permission to sign in.'
                : error === 'Configuration' 
                ? 'There is a problem with the server configuration.'
                : 'An error occurred during authentication.'}
            </p>
            <Button 
              color="primary"
              href="/sign-in"
              as="a"
              className="w-full"
            >
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
