"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, X, ArrowLeft, Trash2, Check, CheckCheck } from "lucide-react"
import { Message, SelectedConversation } from "@/types/users"
import { timeAgo } from "@/utils/date-format"
import Link from "next/link"
import { formatCurrency } from "@/utils/format-currency"
import EmptyConversationState from "./empty-conversation"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface MessageChatAreaProps {
  selectedConversation?: SelectedConversation | null;
  messages: Message[];
  userId?: number | null;
  selectedImage: File | null;
  imagePreview: string | null;
  handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedConversation: (conversation: SelectedConversation | null) => void;
  removeSelectedImage: () => void;
  messageText: string;
  setMessageText: (text: string) => void;
  sendMessage: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  onDeleteMessage?: (messageId: number | string) => void;
}

export default function MessageChatArea({
  selectedConversation,
  messages,
  userId,
  selectedImage,
  imagePreview,
  handleImageSelect,
  removeSelectedImage,
  messageText,
  setMessageText,
  setSelectedConversation,
  sendMessage,
  messagesEndRef,
  onDeleteMessage,
}: MessageChatAreaProps) {
  const [hoveredMessageId, setHoveredMessageId] = useState<string | number | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<string | number | null>(null)

  const handleDeleteClick = (messageId: string | number) => {
    setMessageToDelete(messageId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (messageToDelete && onDeleteMessage) {
      onDeleteMessage(messageToDelete)
    }
    setDeleteDialogOpen(false)
    setMessageToDelete(null)
  }

  return (
    <>
      <div className="lg:col-span-2 shadow-sm border-r border-t border-b border-border overflow-hidden flex flex-col min-h-[calc(80vh-10rem)] bg-background">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedConversation(null)}
                  className="md:hidden hover:bg-muted/50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>

                <Link
                  className="flex gap-3 items-center group"
                  href={`/vendor/${selectedConversation?.user?.publicId}`}
                >
                  <div className="relative">
                    <Avatar className="ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-300">
                      <AvatarImage
                        src={selectedConversation?.avatar || "/placeholder.svg"}
                        alt={selectedConversation?.name}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5">
                        {selectedConversation?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation?.user?.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {selectedConversation?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedConversation?.user?.online
                        ? "Online"
                        : "Last seen " + timeAgo(selectedConversation?.user?.lastSeen || new Date())}
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Product Info */}
            <Link
              href={`/categories/${selectedConversation?.product?.subCategory?.slug}/${selectedConversation?.product?.slug}`}
              className="group"
            >
              <div className="flex w-full px-4 py-3 gap-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-b border-amber-200 dark:border-amber-800/30 hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-950/30 dark:hover:to-orange-950/30 transition-all duration-300">
                <div className="relative flex-shrink-0">
                  <Image
                    src={selectedConversation?.product?.avatar[0] || "/fallback.png"}
                    alt={selectedConversation?.product?.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-cover rounded-lg ring-2 ring-amber-200/50 dark:ring-amber-800/30 group-hover:ring-amber-300 dark:group-hover:ring-amber-700/50 transition-all"
                  />
                </div>
                <div className="flex flex-col justify-center min-w-0 flex-1">
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-100 line-clamp-1 group-hover:text-amber-950 dark:group-hover:text-amber-50 transition-colors">
                    {selectedConversation?.product?.name}
                  </p>
                  <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                    {formatCurrency(selectedConversation?.product?.price)}
                  </p>
                </div>
              </div>
            </Link>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3 max-h-[calc(80vh-10rem)] bg-gradient-to-b from-background to-muted/20">
              {messages.map((message, index) => {
                const isOwn = message.senderId === userId
                const showAvatar = !isOwn && (index === 0 || messages[index - 1]?.senderId !== message.senderId)
                const isTemp = typeof message.id === 'string' && message.id.startsWith('temp-')

                return (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${isOwn ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onMouseEnter={() => setHoveredMessageId(message.id)}
                    onMouseLeave={() => setHoveredMessageId(null)}
                  >
                    {!isOwn && showAvatar && (
                      <Avatar className="w-8 h-8 mt-auto mb-1 ring-2 ring-border/50">
                        <AvatarImage
                          src={selectedConversation?.avatar || "/placeholder.svg"}
                          alt={selectedConversation?.name}
                        />
                        <AvatarFallback className="text-xs">
                          {selectedConversation?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    {!isOwn && !showAvatar && <div className="w-8" />}

                    <div className="flex flex-col max-w-[75%] sm:max-w-md relative group">
                      <div
                        className={`px-4 py-2.5 rounded-2xl shadow-sm transition-all duration-200 ${
                          isOwn
                            ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-md hover:shadow-md"
                            : "bg-card border border-border/50 text-foreground rounded-bl-md hover:border-border hover:shadow-md"
                        } ${isTemp ? 'opacity-70' : ''}`}
                      >
                        {message.type === "image" && message.avatar && (
                          <div className="relative mb-2">
                            <Image
                              width={280}
                              height={280}
                              src={message.avatar}
                              alt="Shared image"
                              className="max-w-full h-auto rounded-lg"
                            />
                            {typeof message.uploadProgress === "number" && message.uploadProgress < 100 && (
                              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2" />
                                  <p className="text-white text-sm font-medium">{message.uploadProgress}%</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {message.content && (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {message.content}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-1.5 gap-2">
                          <p
                            className={`text-[10px] font-medium ${
                              isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}
                          >
                            {timeAgo(message.createdAt)}
                          </p>
                          
                          {isOwn && !isTemp && (
                            <div className={`${isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                              {message.isRead ? (
                                <CheckCheck className="w-3.5 h-3.5" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Delete Button - Only show for own messages and on hover */}
                      {isOwn && !isTemp && hoveredMessageId === message.id && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(message.id)}
                          className="absolute -right-10 top-1/2 -translate-y-1/2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
              {/* Image Preview */}
              {selectedImage && imagePreview && (
                <div className="mb-3 p-3 border border-border rounded-xl bg-muted/30 backdrop-blur-sm flex items-center gap-3 animate-in slide-in-from-bottom-2 duration-300">
                  <div className="relative flex-shrink-0">
                    <Image
                      width={56}
                      height={56}
                      src={imagePreview}
                      alt="Preview"
                      className="w-14 h-14 object-cover rounded-lg ring-2 ring-primary/20"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {selectedImage.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedImage.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeSelectedImage}
                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <div className="flex gap-2 items-end">
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  className="hidden"
                  onChange={handleImageSelect}
                />

                <label
                  htmlFor="image-upload"
                  className="cursor-pointer p-2.5 rounded-xl hover:bg-muted transition-all duration-200 text-muted-foreground hover:text-foreground flex-shrink-0 hover:scale-105 active:scale-95"
                >
                  <Paperclip className="w-5 h-5" />
                </label>

                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 rounded-xl pr-12 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        sendMessage()
                      }
                    }}
                  />
                </div>

                <Button
                  onClick={sendMessage}
                  disabled={!messageText.trim() && !selectedImage}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary text-primary-foreground rounded-xl h-10 w-10 p-0 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="hidden lg:flex items-center justify-center h-full text-muted-foreground">
            <EmptyConversationState />
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}