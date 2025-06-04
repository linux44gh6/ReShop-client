"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Reply, Trash } from "lucide-react";
import { Button } from "../ui/button";


const defaultMessages = [
  {
    id: "1",
    subject: "Welcome to ReShop!",
    body: "Thank you for joining ReShop. Explore and enjoy buying and selling second-hand items.",
    sender: "Admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    subject: "Tips for Successful Selling",
    body: "Make sure to upload clear photos and provide detailed descriptions for your items.",
    sender: "Support",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "3",
    subject: "Your Recent Purchase",
    body: "Your order #123456 has been shipped. Thank you for shopping with ReShop!",
    sender: "Sales Team",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
];

export default function UserMessages() {
  // Directly use the defaultMessages array
  const [messages] = useState(defaultMessages);

  return (
    <div className="flex justify-center  min-h-screen bg-gray-100 p-4">
      <Card className="w-full  rounded-lg">
        <CardHeader>
          <CardTitle>Your Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map(({ id, subject, body, sender, createdAt }) => (
                <TableRow key={id}>
                  <TableCell className="font-medium">{subject || "-"}</TableCell>
                  <TableCell className="max-w-xs truncate" title={body}>
                    {body.length > 100 ? `${body.slice(0, 100)}...` : body}
                  </TableCell>
                  <TableCell>{sender || "-"}</TableCell>
                  <TableCell>
                    {createdAt ? format(new Date(createdAt), "PPP p") : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                        <Button variant={"outline"}><Reply/></Button>
                        <Button variant={"outline"} className="text-red-500"><Trash/></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
