import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PriceCalculator } from "@/components/PriceCalculator";
import { EscrowSteps } from "@/components/EscrowSteps";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Clock, DollarSign, ArrowRight } from 'lucide-react';
import '@/styles.css';
import Image from "next/image";
import Link from "next/link";

export default function EscrowPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-b from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-1 text-left space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Experience Real Estate Transactions Like Never Before</h1>
            <p className="text-xl text-muted-foreground max-w-md">
              Discover a new level of security and efficiency with Reskrow's innovative escrow services.
            </p>
            <Card className="shadow-lg">
              <CardHeader className="bg-secondary/10 border-b">
                <CardTitle className="text-xl text-secondary">Why Choose Us?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="shadow-md mt-5">
                  <CardHeader>
                    <CardTitle className="text-lg">Seamless Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Our platform ensures a smooth transaction process from start to finish.</p>
                  </CardContent>
                </Card>
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Advanced Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">State-of-the-art security measures protect your transactions.</p>
                  </CardContent>
                </Card>
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Expert Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Our team is here to assist you every step of the way.</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1">
            <div className="window-frame">
              <Image 
                src="/escrow-img.webp" 
                alt="Modern Architecture" 
                width={800} 
                height={600}
                className="rounded-t-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader className="bg-secondary/10 border-b">
                <CardTitle className="text-2xl text-secondary">Escrow Calculator</CardTitle>
                <CardDescription>Calculate your escrow fees and see how much you'll receive</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <PriceCalculator />
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-primary/10 border-b">
                <CardTitle className="text-2xl text-primary">How Escrow Works</CardTitle>
                <CardDescription>Understand the process of buying or selling with Reskrow</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <EscrowSteps />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-accent/5 py-20">
        <div className="container mx-auto px-4 space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-accent-foreground">Why Choose Reskrow Escrow Services?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Secure Transactions", description: "Your money is protected throughout the entire process" },
              { icon: Lock, title: "Confidentiality", description: "Your personal and financial information is kept private" },
              { icon: Clock, title: "Timely Process", description: "We ensure a smooth and efficient escrow process" },
              { icon: DollarSign, title: "Competitive Rates", description: "Transparent pricing with no hidden fees" },
            ].map((feature, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-accent mb-2" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-secondary/10 to-secondary/5 py-20">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're buying or selling, our escrow services ensure a safe and smooth transaction.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="text-lg px-8 py-6">
              <Link href="/buy">I'm Buying</Link>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" >
              <Link href="/sell">I'm Selling</Link>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

