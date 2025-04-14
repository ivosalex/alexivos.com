"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function submitMessage(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    // Validate the form data
    if (!name || !email || !message) {
      return {
        success: false,
        error: "All fields are required",
      }
    }

    // Create a Supabase client
    const supabase = createServerActionClient({ cookies })

    // Insert the message into the database
    const { error } = await supabase.from("messages").insert([{ name, email, message }])

    if (error) {
      console.error("Error inserting message:", error)
      return {
        success: false,
        error: "Failed to save message",
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error in submitMessage:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}
