import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: 'Terms of Service | Reskrow Real Estate',
  description: 'Terms and conditions for using Reskrow Real Estate services',
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">Terms of Service</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Welcome to Reskrow Real Estate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              These Terms of Service govern your use of Reskrow Real Estate's website and services. 
              By accessing or using our services, you agree to be bound by these terms. 
              Please read them carefully.
            </p>
          </CardContent>
        </Card>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold">1. Acceptance of Terms</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              By accessing or using Reskrow Real Estate services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold">2. Use of Services</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              You agree to use Reskrow Real Estate services only for lawful purposes and in accordance with these Terms of Service. You are prohibited from violating or attempting to violate the security of the website or services.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold">3. User Accounts</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              To access certain features of our services, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold">4. Property Listings</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Reskrow Real Estate strives to ensure the accuracy of all property listings. However, we do not guarantee the accuracy, completeness, or reliability of any listing information. Users are advised to verify all information independently.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-semibold">5. Escrow Services</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Our escrow services are governed by additional terms and conditions. By using our escrow services, you agree to comply with these additional terms, which will be provided to you at the time of transaction.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg font-semibold">6. Intellectual Property</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              All content on the Reskrow Real Estate website, including text, graphics, logos, and software, is the property of Reskrow Real Estate or its content suppliers and is protected by copyright laws.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="text-lg font-semibold">7. Limitation of Liability</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Reskrow Real Estate shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use or inability to use the services.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger className="text-lg font-semibold">8. Changes to Terms</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Reskrow Real Estate reserves the right to modify these Terms of Service at any time. We will notify users of any significant changes. Your continued use of our services after such modifications constitutes your acceptance of the updated terms.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2">If you have any questions about these Terms of Service, please contact us at:</p>
            <p className="text-muted-foreground">
              Reskrow Real Estate<br />
              Email: legal@reskrow.com<br />
              Phone: +254 208000664
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

