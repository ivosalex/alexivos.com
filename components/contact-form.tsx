"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { submitMessage } from "@/app/actions"

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
      className="space-y-4 bg-black bg-opacity-50 p-6 rounded-lg border border-gray-800"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-mono mb-1">
          name
        </label>
        <Input id="name" name="name" required placeholder="your name" className="bg-black border-gray-700 font-mono" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-mono mb-1">
          email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="your.email@example.com"
          className="bg-black border-gray-700 font-mono"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-mono mb-1">
          message
        </label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="your message here..."
          rows={4}
          className="bg-black border-gray-700 font-mono"
        />
      </div>

      <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 font-mono" disabled={isSubmitting}>
        {isSubmitting ? "sending..." : "send message"}
      </Button>

      {formStatus.type && (
        <div
          className={`p-3 rounded font-mono text-sm ${
            formStatus.type === "success" ? "bg-green-900 text-green-100" : "bg-red-900 text-red-100"
          }`}
        >
          {formStatus.message}
        </div>
      )}
    </form>
  )
}
