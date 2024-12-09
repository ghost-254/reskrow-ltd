
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'

export function VerificationSuccess() {
  const [open, setOpen] = useState(true)
  const router = useRouter()

  const handleProceed = () => {
    setOpen(false)
    router.push('/auth?tab=signin')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Email Verified Successfully</DialogTitle>
          <DialogDescription>
            Your email has been verified. You can now proceed to log in to your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleProceed}>Proceed to Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

