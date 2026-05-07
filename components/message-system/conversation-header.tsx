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
          <>
            <X />
            <p>Error connecting</p>
          </>
        )}
      </div>

      <div className="p-3 border-b mt-1 border-border">
        {!isLoading && !isError && (
           <div className=" w-12 h-10 lg:w-16 lg:h-16 relative">
                        <Image
                          src={'/logo/buyam.png'}
                          fill
                          className="w-12 h-10 lg:w-16 lg:h-16 absolute"
                          alt="logo"
                        />
                      </div>
        )}
      </div>
    </>
  )
}