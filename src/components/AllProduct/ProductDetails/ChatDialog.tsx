/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState, useRef } from "react"
import { Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getMessage } from "@/Service/Message"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useUser } from "@/Context/userContext"

type Message = {
  id: string
  text: string
  sender: "user" | "seller"
  createdAt: Date
}

type PayloadData = {
  _id: string
  title: string
  sellerAvatar?: string
  userID: {
    name: string
    avatar?: string
  }
}

type ChatDialogProps = {
  payload: {
    data: PayloadData
  }
}

export function ChatDialog({ payload }: ChatDialogProps) {
  const seller = payload.data.userID
  const { _id, title, sellerAvatar } = payload.data
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const user=useUser()
  console.log(user);
  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true)
      try {
        const result = await getMessage(payload.data._id)
        if (result.data?.message) {
          setMessages(result.data.message)
        }
      } catch (error) {
        console.error("Error fetching messages:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (open) {
      fetchMessages()
    }
  }, [payload.data._id, open])

  // Scroll to bottom when messages change
  useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement | null
    if (scrollContainer) {
      const resizeObserver = new ResizeObserver(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      })
      resizeObserver.observe(scrollContainer)
      return () => resizeObserver.disconnect()
    }
  }, [messages])

 
const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
})

// Add inside your component
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    message: "",
  },
})

const handleSubmitMessage=async(data:any)=>{
  const messageData={
    buyerId:user?.user?._id,
    message:[
      {
        text:data.message,
      }
    ],
    productId:_id
  }
  console.log(messageData);
}

  const formatTime = (date: Date) => {
    if (!(date instanceof Date)) date = new Date(date)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">Chat with Seller</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl">
        <DialogHeader className="mb-2">
          <DialogTitle className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={sellerAvatar || "/placeholder.svg"} alt={seller.name} />
              <AvatarFallback className="bg-primary/20 text-primary text-xs">
                {seller.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>Chat with {seller.name}</span>
          </DialogTitle>
          <DialogDescription className="truncate">About: {title}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col h-[500px]">
          {isLoading ? (
            <div className="flex items-center justify-center flex-grow">
              <div className="animate-pulse text-primary">Loading messages...</div>
            </div>
          ) : messages.length > 0 ? (
            <ScrollArea className="flex-grow w-full h-[50vh]" ref={scrollAreaRef}>
              <div className="p-4 space-y-4">
                {messages.map((message,idx) => (
                  <div
                    key={idx}
                    className={cn("flex w-full", message.sender === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "flex items-end gap-2 max-w-[85%]",
                        message.sender === "user" ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <Avatar className="h-6 w-6 flex-shrink-0">
                        {message.sender === "seller" ? (
                          <>
                            <AvatarImage src={sellerAvatar || "/placeholder.svg"} alt={seller.name} />
                            <AvatarFallback className="bg-primary/20 text-primary text-xs">
                              {seller.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </>
                        ) : (
                          <>
                            <AvatarImage src="/placeholder.svg" alt="You" />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              YOU
                            </AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      <div
                        className={cn(
                          "px-3 py-2 rounded-lg relative",
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted rounded-tl-none"
                        )}
                      >
                        <p className="text-sm break-words whitespace-pre-wrap">{message.text}</p>
                        <p
                          className={cn(
                            "text-[10px] mt-1 opacity-70",
                            message.sender === "user" ? "text-right" : "text-left"
                          )}
                        >
                          {formatTime(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center flex-grow text-muted-foreground">
              No messages yet. Start the conversation!
            </div>
          )}

          <div className="p-4 border-t">
          <Form {...form}>
  <form onSubmit={form.handleSubmit(handleSubmitMessage)} className="flex gap-2 w-full">
    <FormField
      control={form.control}
      name="message"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormControl>
            <Input
              placeholder="Type your message..."
              {...field}
              className="w-full"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button
      type="submit"
      size="icon"
      className="bg-primary hover:bg-primary/90 flex-shrink-0"
      disabled={form.formState.isSubmitting}
    >
      <Send className="h-4 w-4" />
      <span className="sr-only">Send message</span>
    </Button>
  </form>
</Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}