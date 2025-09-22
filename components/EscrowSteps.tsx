import { FaFileContract, FaMoneyCheckAlt, FaSearch, FaHandshake, FaKey } from "react-icons/fa"
import { MdVerifiedUser } from "react-icons/md"

export function EscrowSteps() {
  const steps = [
    {
      icon: FaFileContract,
      title: "Open Escrow",
      description: "Submit your purchase agreement and initial deposit to begin the escrow process.",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: FaSearch,
      title: "Title Search",
      description: "We conduct a comprehensive title search to ensure clear ownership and identify any issues.",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: MdVerifiedUser,
      title: "Verification",
      description: "All documents, funds, and conditions are verified to meet the terms of your agreement.",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: FaMoneyCheckAlt,
      title: "Fund Transfer",
      description: "Secure transfer of funds between all parties according to the escrow instructions.",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: FaHandshake,
      title: "Final Review",
      description: "Final walkthrough and document review to ensure all conditions have been met.",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
    },
    {
      icon: FaKey,
      title: "Close Escrow",
      description: "Transfer ownership, record the deed, and distribute funds. You get your keys!",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
  ]

  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4 group">
          <div className="flex-shrink-0">
            <div
              className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
            >
              <step.icon className={`w-6 h-6 ${step.color}`} />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-full">
                STEP {index + 1}
              </span>
              <h3 className="font-semibold text-lg">{step.title}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        </div>
      ))}

      <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <FaHandshake className="w-4 h-4 text-primary" />
          </div>
          <h4 className="font-semibold text-primary">Typical Timeline</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          Most escrow transactions close within <strong>30-45 days</strong> from opening. We'll keep you informed every
          step of the way with real-time updates.
        </p>
      </div>
    </div>
  )
}
