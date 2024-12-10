'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Newspaper, Clock, Tag, ThumbsUp, MessageCircle, Share2, AlertTriangle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const placeholderArticles = [
  {
    title: "The Future of Real Estate in the Digital Age",
    excerpt: "Explore how technology is reshaping the real estate industry...",
    category: "Technology",
    readTime: "5 min read",
    likes: 42,
    comments: 8
  },
  {
    title: "Top 10 Home Staging Tips for a Quick Sale",
    excerpt: "Learn the secrets to presenting your home in the best light...",
    category: "Selling",
    readTime: "7 min read",
    likes: 38,
    comments: 12
  },
  {
    title: "Understanding Property Taxes: A Comprehensive Guide",
    excerpt: "Navigate the complex world of property taxes with our expert insights...",
    category: "Finance",
    readTime: "10 min read",
    likes: 55,
    comments: 15
  }
]

export default function BlogPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        { email },
        'YOUR_PUBLIC_KEY'
      )
      toast({
        title: "Subscription Successful",
        description: "You've been added to our mailing list!",
      })
      setEmail('')
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "There was an error. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">Reskrow Real Estate Blog</h1>
      
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <AlertTriangle className="mr-2 text-yellow-500" /> Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            We're currently crafting insightful articles to keep you informed about the latest trends, tips, and news in real estate. Stay tuned for upcoming content that will help you navigate the property market with confidence!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                'Notify Me'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-6">Featured Articles Preview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {placeholderArticles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Tag className="mr-2 h-4 w-4" />
                  <span>{article.category}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    {article.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <MessageCircle className="mr-1 h-4 w-4" />
                    {article.comments}
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Newspaper className="mr-2 text-primary" /> Stay Informed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            Our team of real estate experts is working hard to bring you valuable insights, market trends, and practical advice. Check back soon for:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>In-depth market analysis</li>
            <li>Home buying and selling tips</li>
            <li>Investment strategies</li>
            <li>Property management advice</li>
            <li>Legal and financial guidance</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

