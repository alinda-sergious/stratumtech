"use client"

import type React from "react"
import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageCircle, User, Calendar, Star, Shield, CheckCircle } from "lucide-react"

interface Comment {
  id: string
  author: string
  email: string
  content: string
  rating: number
  date: string
  isVerified?: boolean
  verificationMethod?: "booking_confirmed" | "admin_verified" | "email_verified" | null
}

interface EventCommentsSectionProps {
  eventId: string
  eventTitle: string
}

// Sample comments data - in a real app, this would come from a database
const sampleComments: Comment[] = [
  {
    id: "1",
    author: "Sarah Johnson",
    email: "sarah.j@email.com",
    content:
      "Stratum Tech provided exceptional construction services for our corporate headquarters. Every detail was perfectly coordinated, and our stakeholders were thoroughly impressed with the quality and professionalism.",
    rating: 5,
    date: "2024-11-15",
    isVerified: true,
    verificationMethod: "booking_confirmed",
  },
  {
    id: "2",
    author: "Michael Chen",
    email: "m.chen@company.com",
    content:
      "Outstanding logistics management! The team handled our 500+ guest transportation seamlessly. Professional drivers, luxury vehicles, and impeccable timing. Highly recommended!",
    rating: 5,
    date: "2024-11-10",
    isVerified: true,
    verificationMethod: "booking_confirmed",
  },
  {
    id: "3",
    author: "Emma Williams",
    email: "emma.w@email.com",
    content:
      "We used Stratum Tech for our residential construction project and they exceeded all expectations. The quality of work was exceptional and the project was completed perfectly on schedule.",
    rating: 5,
    date: "2024-10-28",
    isVerified: false,
    verificationMethod: null,
  },
]

export default function EventCommentsSection({ eventId, eventTitle }: EventCommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(sampleComments)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [formData, setFormData] = useState({
    author: "",
    email: "",
    content: "",
    rating: 5,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.author.trim()) newErrors.author = "Name is required."
    if (!formData.email.trim()) {
      newErrors.email = "Email is required."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address."
    }
    if (!formData.content.trim()) {
      newErrors.content = "Comment is required."
    } else if (formData.content.trim().length < 10) {
      newErrors.content = "Comment must be at least 10 characters long."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const success = Math.random() > 0.1

    if (success) {
      const isVerifiedClient = await checkIfVerifiedClient(formData.email)

      const newComment: Comment = {
        id: Date.now().toString(),
        author: formData.author,
        email: formData.email,
        content: formData.content,
        rating: formData.rating,
        date: new Date().toISOString().split("T")[0],
        isVerified: isVerifiedClient.verified,
        verificationMethod: isVerifiedClient.method,
      }
      setComments((prev) => [newComment, ...prev])
      setFormData({ author: "", email: "", content: "", rating: 5 })
      setSubmitStatus("success")
    } else {
      setSubmitStatus("error")
    }
    setIsSubmitting(false)
  }

  const checkIfVerifiedClient = async (
    email: string,
  ): Promise<{ verified: boolean; method: Comment["verificationMethod"] }> => {
    if (email.includes("@company.com") || email.includes("@corp.com")) {
      return { verified: true, method: "booking_confirmed" }
    }
    return { verified: false, method: null }
  }

  const getVerificationBadge = (comment: Comment) => {
    if (!comment.isVerified) return null

    const badgeConfig = {
      booking_confirmed: {
        text: "Verified",
        icon: <Shield className="w-3 h-3" />,
        className: "bg-green-100 text-green-800",
        tooltip: "This client has a confirmed project with Stratum Tech",
      },
      admin_verified: {
        text: "Admin Verified",
        icon: <CheckCircle className="w-3 h-3" />,
        className: "bg-blue-100 text-blue-800",
        tooltip: "This review has been verified by Stratum Tech staff",
      },
      email_verified: {
        text: "Email Verified",
        icon: <CheckCircle className="w-3 h-3" />,
        className: "bg-purple-100 text-purple-800",
        tooltip: "This client's email address has been verified",
      },
    }

    const config = badgeConfig[comment.verificationMethod || "booking_confirmed"]

    return (
      <span
        className={`text-xs px-2 py-1 rounded-full flex items-center space-x-1 ${config.className} whitespace-nowrap flex-shrink-0`}
        title={config.tooltip}
      >
        {config.icon}
        <span className="hidden sm:inline">{config.text}</span>
        <span className="sm:hidden">✓</span>
      </span>
    )
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
            className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}
            disabled={!interactive}
          >
            <Star
              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                star <= rating ? "text-royal-gold fill-royal-gold" : "text-gray-300"
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <section className="py-8 sm:py-12 bg-gray-50 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 w-full max-w-full">
          <div className="flex items-center mb-6 sm:mb-8">
            <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-royal-gold mr-2 sm:mr-3 flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-royal-blue font-arizona break-words">
              Comments & Reviews ({comments.length})
            </h2>
          </div>

          {/* Verification Info Box */}
          <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-blue-900 mb-1 text-sm sm:text-base">About Verified Reviews</h4>
                <p className="text-xs sm:text-sm text-blue-700 break-words">
                  Verified reviews come from clients who have confirmed projects with Stratum Tech. We verify reviews to
                  ensure authenticity and help you make informed decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Comment Form */}
          <div className="mb-8 sm:mb-12 p-4 sm:p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg sm:text-xl font-semibold text-royal-blue mb-3 sm:mb-4 font-arizona">
              Share Your Experience
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author" className="text-gray-700 text-sm sm:text-base">
                    Your Name <span className="text-royal-gold">*</span>
                  </Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className={`mt-1 text-sm sm:text-base ${
                      errors.author ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-royal-gold"
                    }`}
                    required
                  />
                  {errors.author && <p className="mt-1 text-xs text-red-500 break-words">{errors.author}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700 text-sm sm:text-base">
                    Email Address <span className="text-royal-gold">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`mt-1 text-sm sm:text-base ${
                      errors.email ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-royal-gold"
                    }`}
                    required
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500 break-words">{errors.email}</p>}
                  <p className="mt-1 text-xs text-gray-500 break-words">
                    If you're a Stratum Tech client, we'll automatically verify your review
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-gray-700 text-sm sm:text-base">
                  Rating <span className="text-royal-gold">*</span>
                </Label>
                <div className="mt-2">{renderStars(formData.rating, true, handleRatingChange)}</div>
              </div>

              <div>
                <Label htmlFor="content" className="text-gray-700 text-sm sm:text-base">
                  Your Comment <span className="text-royal-gold">*</span>
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Share your experience with this event..."
                  rows={4}
                  className={`mt-1 resize-none text-sm sm:text-base ${
                    errors.content ? "border-red-500 focus-visible:ring-red-500" : "focus-visible:ring-royal-gold"
                  }`}
                  required
                />
                {errors.content && <p className="mt-1 text-xs text-red-500 break-words">{errors.content}</p>}
              </div>

              {submitStatus === "success" && (
                <p className="text-xs sm:text-sm text-green-600 p-3 bg-green-50 rounded-md break-words">
                  Thank you for your comment! It has been submitted successfully and will appear after review.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-xs sm:text-sm text-red-600 p-3 bg-red-50 rounded-md break-words">
                  Sorry, there was an error submitting your comment. Please try again.
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-royal-gold text-royal-blue font-semibold hover:bg-royal-gold/90 py-3 px-4 sm:px-6 transition-transform hover:scale-105 text-sm sm:text-base"
              >
                {isSubmitting ? "Submitting..." : "Submit Comment"}
              </Button>
            </form>
          </div>

          {/* Comments List */}
          <div className="space-y-4 sm:space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-4 sm:pb-6 last:border-b-0">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-royal-gold/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-royal-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-2 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-royal-blue text-sm sm:text-base break-words">
                              {comment.author}
                            </h4>
                            {getVerificationBadge(comment)}
                          </div>
                          <div className="flex items-center space-x-2">{renderStars(comment.rating)}</div>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {new Date(comment.date).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed break-words text-sm sm:text-base">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-6 sm:py-8 text-sm sm:text-base">
                No comments yet. Be the first to share your experience!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
