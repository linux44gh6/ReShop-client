/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useUser } from "@/Context/userContext"
import io from "socket.io-client"

type Message = {
  _id?: string
  message: string
  sender:string
  receiver:string
  createdAt: Date
  productId: string
}

type PayloadData = {
  _id: string
  title: string
  sellerAvatar?: string
  userID: {
    _id: string
    name: string
    avatar?: string
  }
}

type ChatDialogProps = {
  payload: {
    data: PayloadData
  }
}

// ⚡ connect to backend socket server
const socket = io("https://re-shop-ten.vercel.app", {
  transports: ["websocket"], // ensure stable connection
})

export function ChatDialog({ payload }: ChatDialogProps) {
  const seller = payload.data.userID
  const { _id, title, sellerAvatar } = payload.data
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const user = useUser()
  // form validation
  const formSchema = z.object({
    message: z.string().min(1, "Message cannot be empty"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  })

  // listen for incoming + history
  useEffect(() => {
    if (open) {
      socket.emit("getMessages") // request old messages
    }

    socket.on("messages", (msgs: Message[]) => {
      // only show messages for this product
      const filtered = msgs.filter((m) => m.productId === _id)
      setMessages(filtered)
    })

    socket.on("receiveMessage", (msg: Message) => {
      if (msg.productId === _id) {
        // setMessages((prev) => [...prev, msg])
      }
    })

    return () => {
      socket.off("messages")
      socket.off("receiveMessage")
    }
  }, [open, _id])

  // scroll to bottom on new message
  useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement | null
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight
    }
  }, [messages])

  // send message
  const handleSubmitMessage = (data: any) => {
    const newMsg: Message = {
      message: data.message,
      sender: user.user?._id as string,
      receiver: seller._id as string,
      createdAt: new Date(),
      productId: _id,
    }
     console.log(newMsg);
    socket.emit("sendMessage", newMsg) // send to backend
    setMessages((prev) => [...prev, newMsg]) // optimistic UI
    form.reset()
  }

  const formatTime = (date: Date) => {
    if (!(date instanceof Date)) date = new Date(date)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#10b981] hover:bg-[#10b981] cursor-pointer">Chat with Seller</Button>
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
          {messages.length > 0 ? (
            <ScrollArea className="flex-grow w-full h-[50vh]" ref={scrollAreaRef}>
              <div className="p-4 space-y-4">
                {messages.map((message, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-2 w-full">
                    {message.sender === seller._id && (
                      <div className="flex items-end gap-2">
                        <Avatar className="h-6 w-6 flex-shrink-0">
                          <AvatarImage src={sellerAvatar || "/placeholder.svg"} alt={seller.name} />
                          <AvatarFallback className="text-primary text-xs">
                            {seller.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted px-3 py-2 rounded-lg rounded-tl-none max-w-[85%]">
                          <p className="text-sm break-words whitespace-pre-wrap">{message.message}</p>
                          <p className="text-[10px] mt-1 opacity-70 text-left">
                            {formatTime(message.createdAt)}
                          </p>
                        </div>
                      </div>
                    )}
                    {message.sender === user.user?._id && (
                      <div className="flex items-end justify-end gap-2 col-start-2">
                        <div className="bg-[#10b981] text-primary-foreground px-3 py-2 rounded-lg rounded-tr-none max-w-[85%]">
                          <p className="text-sm break-words whitespace-pre-wrap">{message.message}</p>
                          <p className="text-[10px] mt-1 opacity-70 text-right">
                            {formatTime(message.createdAt)}
                          </p>
                        </div>
                        <Avatar className="h-6 w-6 flex-shrink-0">
                          <AvatarImage src={user?.avatar || "/placeholder.svg"} alt="You" />
                          <AvatarFallback className="bg-[#10b981] text-primary-foreground text-xs">
                            YOU
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center flex-grow text-muted-foreground">
              No messages yet. Start the conversation!
            </div>
          )}

          {/* Input form */}
          <div className="p-4 border-t">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitMessage)} className="flex gap-2 w-full">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Type your message..." {...field} className="w-full" />
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
