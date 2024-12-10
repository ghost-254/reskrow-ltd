import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Shield, Lock, Scale, Eye, FileText, Bell, Mail, DollarSign, Clock, UserCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Escrow Terms & Privacy Policy | Reskrow Real Estate',
  description: 'Escrow terms and privacy policy for Reskrow Real Estate services',
}

export default function EscrowTermsPrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Escrow Terms & Privacy Policy</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader>
            <Shield className="w-12 h-12 text-primary mb-4" />
            <CardTitle className="text-xl font-semibold text-primary">Secure Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Protect your funds and ensure a safe property transaction with our trusted escrow service.</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader>
            <DollarSign className="w-12 h-12 text-secondary mb-4" />
            <CardTitle className="text-xl font-semibold text-secondary">Fair Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Transparent fees and competitive rates to make your real estate transaction affordable.</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader>
            <Clock className="w-12 h-12 text-accent mb-4" />
            <CardTitle className="text-xl font-semibold text-accent">Efficient Process</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Streamlined escrow process to ensure quick and hassle-free property transactions.</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="escrow-terms" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="escrow-terms">Escrow Terms</TabsTrigger>
          <TabsTrigger value="privacy-policy">Privacy Policy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="escrow-terms">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center">
                <Scale className="w-5 h-5 mr-2 text-primary" /> Escrow Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                These Escrow Terms govern the use of Reskrow Real Estate's escrow services. By using our escrow services, you agree to these terms.
              </p>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors duration-300">
                    <Shield className="w-5 h-5 mr-2 text-primary" /> 1. Escrow Process
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>Our escrow process involves the following steps:</p>
                    <ol className="list-decimal pl-5 mt-2">
                      <li>Buyer and seller agree on terms</li>
                      <li>Funds are deposited into the escrow account</li>
                      <li>Seller transfers property ownership</li>
                      <li>Buyer confirms receipt and approves the transaction</li>
                      <li>Funds are released to the seller</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors duration-300">
                    <Lock className="w-5 h-5 mr-2 text-primary" /> 2. Security of Funds
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>All funds held in escrow are kept in secure, segregated accounts. We use industry-standard security measures to protect your funds and personal information.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors duration-300">
                    <FileText className="w-5 h-5 mr-2 text-primary" /> 3. Fees and Charges
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>Our escrow service fees are as follows:</p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>1.5% of the transaction value</li>
                      <li>Minimum fee: $100</li>
                      <li>Maximum fee: $5,000</li>
                    </ul>
                    <p className="mt-2">Additional fees may apply for wire transfers or other special services.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy-policy">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center">
                <Eye className="w-5 h-5 mr-2 text-primary" /> Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This Privacy Policy explains how we collect, use, and protect your personal information when you use our escrow services.
              </p>
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors duration-300">
                    <FileText className="w-5 h-5 mr-2 text-primary" /> 1. Information We Collect
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>We collect the following types of information:</p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>Personal identification information</li>
                      <li>Transaction details</li>
                      <li>Financial information</li>
                      <li>Communication records</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors duration-300">
                    <Lock className="w-5 h-5 mr-2 text-primary" /> 2. How We Protect Your Information
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>We implement strict security measures to protect your information, including:</p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>Encryption of sensitive data</li>
                      <li>Regular security audits</li>
                      <li>Access controls and authentication</li>
                      <li>Compliance with industry standards</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors duration-300">
                    <UserCheck className="w-5 h-5 mr-2 text-primary" /> 3. Your Rights and Choices
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>Access your personal information</li>
                      <li>Request corrections to your data</li>
                      <li>Opt-out of marketing communications</li>
                      <li>Request deletion of your account</li>
                    </ul>
                    <p className="mt-2">Contact us to exercise these rights.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8 bg-primary/5 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <Mail className="w-5 h-5 mr-2 text-primary" /> Contact Us
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-2">If you have any questions about our Escrow Terms or Privacy Policy, please contact us at:</p>
          <p className="text-muted-foreground">
            <strong>Reskrow Real Estate</strong><br />
            Email: <a href="mailto:escrow@reskrow.com" className="text-primary hover:underline">escrow@reskrow.com</a><br />
            Phone: <a href="tel:+254208000664" className="text-primary hover:underline">+254 208000664</a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

