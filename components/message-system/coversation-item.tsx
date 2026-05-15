import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "../ui/badge";
import {
  Check,
  CheckCheck,
  MoreVertical,
  ShieldBan,
  Trash2,
} from "lucide-react";
import { timeAgo } from "@/utils/date-format";
import { SelectedConversation } from "@/types/users";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

export default function ConversationItem({
  conversation,
  isSelected,
  onClick,
  userId,
}: {
  conversation: SelectedConversation;
  isSelected: boolean;
  onClick: () => void;
  userId?: number | null;
}) {
  const isLastMessageMine =
    conversation.lastMessageSenderId === userId;

  const isUnread = conversation.unread === true;

  function onDelete() {
    toast.error("Message cannot be deleted");
  }

  return (
    <div
      className={`
        group relative overflow-hidden border-b border-border/60 transition-all duration-300
        ${
          isSelected
            ? "bg-gradient-to-r from-amber-50 to-orange-50"
            : "hover:bg-muted/40"
        }
      `}
    >
      {/* Online Indicator Bar */}
      <div
        className={`
          absolute left-0 top-0 h-full w-1 transition-all duration-300
          ${
            conversation.user?.online
              ? "bg-emerald-500"
              : "bg-muted"
          }
        `}
      />

      <div className="flex items-start gap-3 p-4">
        {/* Clickable Area */}
        <button
          onClick={onClick}
          className="flex flex-1 items-start gap-3 text-left"
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            <Avatar className="h-12 w-12 border border-border shadow-sm">
              <AvatarImage
                src={conversation.avatar || "/fallback.png"}
                alt={conversation.name}
              />

              <AvatarFallback className="bg-gradient-to-br from-amber-100 to-orange-100 font-semibold text-amber-700">
                {conversation.name?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>

            {/* Online Dot */}
            {conversation.user?.online && (
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500" />
            )}
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* Top Row */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3
                  className={`
                    truncate text-sm font-semibold
                    ${
                      isUnread
                        ? "text-foreground"
                        : "text-foreground/90"
                    }
                  `}
                >
                  {conversation.user?.storeName ||
                    conversation.name}
                </h3>

                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {timeAgo(conversation.lastMessageAt)}
                </p>
              </div>

              {/* Message Status */}
              {isLastMessageMine && (
                <div className="mt-0.5 shrink-0">
                  {isUnread ? (
                    <Check className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <CheckCheck className="h-4 w-4 text-emerald-600" />
                  )}
                </div>
              )}
            </div>

            {/* Message Preview */}
            <div className="mt-2 flex items-center justify-between gap-3">
              <p
                className={`
                  truncate text-sm leading-relaxed
                  ${
                    isUnread
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }
                `}
              >
                {conversation.lastMessage}
              </p>

              {/* Unread Badge */}
              {isUnread && (
                <Badge
                  className="
                    h-6 min-w-6 rounded-full
                    bg-emerald-500 px-2
                    text-[11px] font-semibold text-white
                    hover:bg-emerald-500
                  "
                >
                  1
                </Badge>
              )}
            </div>
          </div>
        </button>

        {/* Actions */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="
                rounded-xl p-2 text-muted-foreground
                 transition-all duration-200
                hover:bg-muted hover:text-foreground
                opacity-100
                data-[state=open]:opacity-100
              "
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            className="w-44 rounded-2xl border border-border/60 p-2 shadow-xl"
          >
            <div className="space-y-1">
              <button
                className="
                  flex w-full items-center gap-2 rounded-xl px-3 py-2
                  text-sm text-muted-foreground
                  transition-colors hover:bg-muted hover:text-foreground
                "
              >
                <ShieldBan className="h-4 w-4" />
                Block User
              </button>

              <button
                onClick={onDelete}
                className="
                  flex w-full items-center gap-2 rounded-xl px-3 py-2
                  text-sm text-red-600
                  transition-colors hover:bg-red-50
                "
              >
                <Trash2 className="h-4 w-4" />
                Delete Chat
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}