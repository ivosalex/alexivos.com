"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { submitMessage } from "@/app/actions"
import { Loader2, Send } from "lucide-react"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setFormStatus({ type: null, message: "" })

    try {
      const result = await submitMessage(formData)

      if (result.success) {
        setFormStatus({
          type: "success",
          message: "Message sent successfully!",
        })
        // Reset the form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form.reset()
      } else {
        setFormStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        })
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      id="contact-form"
      action={handleSubmit}
      className="space-y-5 bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10 shadow-glow transition-all duration-300 hover:border-white/20"
    >
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-mono text-gray-300">
          name
        </label>
        <Input
          id="name"
          name="name"
          required
          placeholder="your name"
          className="bg-black/50 border-gray-800 font-mono focus:border-purple-500 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-mono text-gray-300">
          email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="your.email@example.com"
          className="bg-black/50 border-gray-800 font-mono focus:border-purple-500 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-mono text-gray-300">
          message
        </label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="your message here..."
          rows={4}
          className="bg-black/50 border-gray-800 font-mono focus:border-purple-500 transition-all duration-300"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-mono group"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> sending...
          </>
        ) : (
          <>
            send message <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </Button>

      {formStatus.type && (
        <div
          className={`p-3 rounded font-mono text-sm animate-fade-in ${
            formStatus.type === "success"
              ? "bg-green-900/50 text-green-100 border border-green-700"
              : "bg-red-900/50 text-red-100 border border-red-700"
          }`}
        >
          {formStatus.message}
        </div>
      )}
    </form>
  )
}
