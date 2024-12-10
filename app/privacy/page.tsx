import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: 'Privacy Policy | Reskrow Real Estate',
  description: 'Privacy policy for Reskrow Real Estate services',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">Privacy Policy</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Your Privacy Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              At Reskrow Real Estate, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
          </CardContent>
        </Card>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold">1. Information We Collect</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p>We collect information that you provide directly to us, such as:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Personal information (e.g., name, email address, phone number)</li>
                <li>Account information when you create an account</li>
                <li>Property information when you list a property</li>
                <li>Communication data when you contact us</li>
              </ul>
              <p className="mt-2">We also automatically collect certain information about your device and how you interact with our website.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold">2. How We Use Your Information</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Communicate with you about products, services, offers, and events</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold">3. Sharing of Information</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p>We may share your information with:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Service providers who perform services on our behalf</li>
                <li>Professional advisors, such as lawyers, bankers, auditors, and insurers</li>
                <li>Government bodies that require us to report processing activities</li>
                <li>Third parties in connection with a business transfer</li>
              </ul>
              <p className="mt-2">We do not sell your personal information to third parties.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold">4. Data Security</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-semibold">5. Your Rights and Choices</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>The right to access your personal information</li>
                <li>The right to rectify inaccurate personal information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to restrict processing of your personal information</li>
                <li>The right to data portability</li>
              </ul>
              <p className="mt-2">To exercise these rights, please contact us using the information provided at the end of this policy.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg font-semibold">6. Changes to This Privacy Policy</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date at the top of this policy.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2">If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="text-muted-foreground">
              Reskrow Real Estate<br />
              Email: privacy@reskrow.com<br />
              Phone: +254 208000664
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

