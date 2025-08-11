"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowLeft, Heart, FileCheck, CreditCard, BarChart3, Users, Shield } from "lucide-react"
import Link from "next/link"
import OAuthButtons from "@/components/oauth-buttons"
import { signIn } from "@/app/auth/actions"
import { useFormState } from "react-dom"

export default function KrankenkasseLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [state, formAction] = useFormState(signIn, undefined)

  const fillDemoCredentials = () => {
    const form = document.getElementById("login-form") as HTMLFormElement
    if (form) {
      ;(form.elements.namedItem("email") as HTMLInputElement).value = "krankenkasse@example.com"
      ;(form.elements.namedItem("password") as HTMLInputElement).value = "123456"
    }
  }

  const quickActions = [
    {
      icon: FileCheck,
      title: "Anträge prüfen",
      description: "Kostenübernahme-Anträge",
      href: "/dashboard/krankenkasse/antraege",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: CreditCard,
      title: "Abrechnungen",
      description: "Rechnungen bearbeiten",
      href: "/dashboard/krankenkasse/abrechnungen",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Users,
      title: "Versicherte",
      description: "Mitglieder verwalten",
      href: "/dashboard/krankenkasse/versicherte",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: BarChart3,
      title: "Berichte",
      description: "Kosten-Auswertungen",
      href: "/dashboard/krankenkasse/berichte",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: Heart,
      title: "Leistungen",
      description: "Leistungskatalog",
      href: "/dashboard/krankenkasse/leistungen",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: Shield,
      title: "Compliance",
      description: "Datenschutz & Audit",
      href: "/dashboard/krankenkasse/compliance",
      color: "bg-indigo-100 text-indigo-600",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <Link href="/login">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Krankenkassen-Portal</h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col justify-center px-4 py-8">
        <div className="w-full max-w-md mx-auto">
          {/* Logo/Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Krankenkassen-Zugang</h2>
            <p className="text-gray-600">Sicheres Portal für Kostenträger</p>
          </div>

          {/* GDPR Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800 mb-1">DSGVO-Konformität</p>
                <p className="text-xs text-green-700">
                  Höchste Datenschutzstandards für Gesundheitsdaten. Alle Übertragungen sind Ende-zu-Ende verschlüsselt.
                </p>
              </div>
            </div>
          </div>

          {/* Demo Credentials Banner */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Demo-Zugang testen</p>
                <p className="text-xs text-green-600">krankenkasse@example.com</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={fillDemoCredentials}
                className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent"
              >
                Ausfüllen
              </Button>
            </div>
          </div>

          {/* Login Form */}
          <form id="login-form" action={formAction} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Krankenkassen E-Mail-Adresse
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="vorname.nachname@krankenkasse.de"
                  className="h-12 mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Passwort
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ihr sicheres Passwort"
                    className="h-12 pr-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  className="border-gray-300"
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Angemeldet bleiben
                </Label>
              </div>
              <Link href="/passwort-vergessen" className="text-sm text-green-600 hover:text-green-700 font-medium">
                Passwort vergessen?
              </Link>
            </div>

            {state?.message && <p className="text-sm text-red-500 text-center">{state.message}</p>}

            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
            >
              Sicher anmelden
            </Button>
          </form>

          {/* OAuth Buttons */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-green-50 text-gray-500">Oder anmelden mit</span>
              </div>
            </div>
            <div className="mt-4">
              <OAuthButtons mode="login" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Kostenträger-Bereich</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 active:scale-[0.98]"
                >
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{action.title}</h4>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Registration Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Neue Krankenkasse?{" "}
              <Link
                href="/registrieren?type=krankenkasse"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Partnerschaft beantragen
              </Link>
            </p>
          </div>

          {/* User Type Switch */}
          <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-3">Anderer Benutzertyp?</p>
            <div className="grid grid-cols-3 gap-2">
              <Link href="/login/kunde">
                <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                  Kunde
                </Button>
              </Link>
              <Link href="/login/dolmetscher">
                <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                  Dolmetscher
                </Button>
              </Link>
              <Link href="/login/amt">
                <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                  Amt
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 text-center">
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <Link href="/hilfe" className="hover:text-gray-700">
            Support
          </Link>
          <Link href="/kontakt" className="hover:text-gray-700">
            Kontakt
          </Link>
          <Link href="/datenschutz" className="hover:text-gray-700">
            Datenschutz
          </Link>
        </div>
      </div>
    </main>
  )
}
