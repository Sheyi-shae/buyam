import { Loader2, X } from "lucide-react"
import Image from "next/image"

export default function ConversationHeader({
  isLoading,
  isError,
}: {
  isLoading: boolean
  isError: boolean
}) {
  return (
    <>
      <div className=" flex items-center gap-2 p-2 bg-background">
        {isLoading && (
          <>
            <Loader2 className="animate-spin" />
            <p className="text-sm font-medium">Connecting...</p>
          </>
        )}

        {isError && (
          
          <div className="p-1 h-12 text-slate-800 flex gap-2">
            <span className="animate-spin"><Loader2 /></span>
            <span>Reconnecting...</span>
          </div>
        )}
      </div>

      <div className=" p-1 border-b mt-1 border-border">
        {!isLoading && !isError && (
           <div className=" w-10 h-10 lg:w-12 lg:h-12 relative">
                        <Image
                          src={'/logo/buyam.png'}
                          fill
                          className="w-10 h-10 lg:w-12 lg:h-12 absolute"
                          alt="logo"
                        />
                      </div>
        )}
      </div>
    </>
  )
}