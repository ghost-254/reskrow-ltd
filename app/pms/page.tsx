'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, BarChart, Users, Calendar, Settings, DollarSign, Clock, Shield, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function PMSPage() {
  const features = [
    { icon: CheckCircle, title: "Property Listing Management", description: "Easily manage and update property listings with detailed information and media." },
    { icon: BarChart, title: "Financial Reporting", description: "Generate comprehensive financial reports for better decision-making." },
    { icon: Users, title: "Tenant Portal", description: "Provide tenants with a self-service portal for rent payments and maintenance requests." },
    { icon: Calendar, title: "Maintenance Scheduling", description: "Schedule and track property maintenance tasks efficiently." },
    { icon: Settings, title: "Automated Workflows", description: "Streamline operations with customizable, automated workflows." },
    { icon: DollarSign, title: "Rent Collection", description: "Simplify rent collection with integrated payment processing." },
  ]

  const keyBenefits = [
    { icon: Clock, title: "Save Time", description: "Automate routine tasks and reduce manual work." },
    { icon: BarChart, title: "Increase Efficiency", description: "Streamline operations and improve overall productivity." },
    { icon: DollarSign, title: "Boost Revenue", description: "Optimize rent collection and reduce vacancy rates." },
    { icon: Shield, title: "Enhance Security", description: "Secure data management and access control." },
  ]

  return (
    <div className="relative">
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80 dark:from-gray-900 dark:to-gray-800 text-foreground dark:text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bg-wireframe.png')] opacity-10 dark:opacity-20 -z-10"></div>
        <div className="relative z-0">
          <section className="container mx-auto px-4 py-16 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-b-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary dark:from-primary-foreground dark:to-secondary-foreground"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Next-Gen Property Management Software
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-24">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/20 dark:bg-primary/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-secondary/20 dark:bg-secondary/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-10 left-10 w-20 h-20 bg-accent/20 dark:bg-accent/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative bg-card dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-border">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary dark:from-primary-foreground dark:to-secondary-foreground">Revolutionize Your Property Management</h2>
                  <p className="text-base md:text-lg text-muted-foreground dark:text-gray-300 mb-6">
                    Our cutting-edge PMS offers a comprehensive solution to transform your property management tasks. From AI-powered tenant screening to real-time financial analytics, we've redefined efficiency.
                  </p>
                  <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground">
                    <Link href="#features">
                      Explore Features <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {keyBenefits.map((benefit, index) => (
                  <Card key={benefit.title} className="bg-card/50 dark:bg-gray-800/50 border-border hover:bg-card/80 dark:hover:bg-gray-700/80 transition-colors duration-300">
                    <CardHeader>
                      <benefit.icon className="w-10 h-10 text-primary dark:text-primary-foreground mb-4" />
                      <CardTitle className="text-xl font-semibold text-foreground dark:text-gray-100">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground dark:text-gray-300">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="bg-secondary/5 dark:bg-secondary/10 py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="relative h-64 md:h-96 mb-24 rounded-3xl overflow-hidden"
              >
                <Image
                  src="/pms-dashboard.png"
                  alt="PMS Dashboard"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 90vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 dark:from-gray-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-foreground dark:text-white">
                  <h3 className="text-2xl font-semibold mb-2">Intuitive Dashboard</h3>
                  <p className="text-muted-foreground dark:text-gray-300">Get a bird's-eye view of your entire property portfolio with our state-of-the-art dashboard.</p>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="features" className="bg-primary/5 dark:bg-primary/10 py-24">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary dark:from-primary-foreground dark:to-secondary-foreground">Cutting-Edge Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-card dark:bg-gray-800 border-border hover:bg-card/80 dark:hover:bg-gray-700/80 transition-colors duration-300">
                      <CardHeader>
                        <feature.icon className="w-12 h-12 text-primary dark:text-primary-foreground mb-4" />
                        <CardTitle className="text-xl font-semibold text-foreground dark:text-gray-100">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground dark:text-gray-300">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-accent/5 dark:bg-accent/10 py-24">
            <div className="container mx-auto px-4">
              <div className="bg-card dark:bg-gray-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/bg-wireframe.png')] opacity-5 dark:opacity-10"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary dark:from-primary-foreground dark:to-secondary-foreground">Why Choose Our PMS?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-secondary dark:text-secondary-foreground">For Property Managers</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground dark:text-gray-300">Centralized property and tenant management</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground dark:text-gray-300">Automated rent collection and late fee calculation</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground dark:text-gray-300">Comprehensive financial reporting</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground dark:text-gray-300">Streamlined maintenance request handling</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-secondary dark:text-secondary-foreground">For Property Owners</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground dark:text-gray-300">Real-time property performance insights</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground dark:text-gray-300">Increased operational efficiency</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground dark:text-gray-300">Enhanced tenant satisfaction</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground dark:text-gray-300">Improved decision-making with data-driven reports</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-b from-background to-background/80 dark:from-gray-900 dark:to-gray-800 py-24">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary dark:from-primary-foreground dark:to-secondary-foreground">Ready to Transform Your Property Management?</h2>
              <p className="text-xl text-muted-foreground dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied property managers and owners who have revolutionized their operations with our next-gen PMS.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground text-lg px-8 py-4 rounded-full">
                Get Started Today
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

