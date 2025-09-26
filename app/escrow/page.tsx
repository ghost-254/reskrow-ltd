import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PriceCalculator } from "@/components/PriceCalculator"
import { EscrowSteps } from "@/components/EscrowSteps"
import { Button } from "@/components/ui/button"
import {
  FaShieldAlt,
  FaDollarSign,
  FaArrowRight,
  FaHandshake,
  FaChartLine,
  FaUsers,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa"
import { MdSpeed } from "react-icons/md"
import Image from "next/image"

export default function EscrowPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/20 to-primary/10 py-24 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <FaCheckCircle className="w-4 h-4" />
                Trusted by 10,000+ transactions
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-balance leading-tight">
                  Secure Real Estate
                  <span className="text-primary block">Escrow Services</span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Experience seamless, secure, and transparent real estate transactions with Reskrow's innovative escrow
                  platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6 group">
                  Start Your Transaction
                  <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                  Calculate Fees
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">$2.5M+</div>
                  <div className="text-sm text-muted-foreground">Secured</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Transactions</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">4.9/5 Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 float-animation">
                <Image
                  src="/modern-luxury-real-estate-building-with-glass-faca.jpg"
                  alt="Modern Real Estate Architecture"
                  width={800}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/30 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent, and secure. Get started in minutes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-accent/5">
              <CardHeader className="pb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FaDollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Escrow Calculator</CardTitle>
                    <CardDescription className="text-base">Calculate your fees instantly</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <PriceCalculator />
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-primary/5">
              <CardHeader className="pb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FaHandshake className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Process Overview</CardTitle>
                    <CardDescription className="text-base">Step-by-step guidance</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <EscrowSteps />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        className="relative py-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/escrow-security.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Why Choose Reskrow?</h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Industry-leading security, transparency, and support for your peace of mind.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaShieldAlt,
                title: "Bank-Level Security",
                description: "Your funds are protected with enterprise-grade encryption and security protocols.",
                color: "text-blue-400",
              },
              {
                icon: MdSpeed,
                title: "Lightning Fast",
                description: "Complete transactions 3x faster than traditional escrow services.",
                color: "text-green-400",
              },
              {
                icon: FaUsers,
                title: "Expert Support",
                description: "Dedicated escrow specialists available 24/7 to guide you through every step.",
                color: "text-purple-400",
              },
              {
                icon: FaChartLine,
                title: "Transparent Pricing",
                description: "No hidden fees. Clear, competitive pricing with detailed breakdowns.",
                color: "text-orange-400",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:-translate-y-2"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
