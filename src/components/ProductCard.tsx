import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  image?: boolean;
  description: string;
  commentCount: number;
  date: Date;
  location: string;
  bookmarked: boolean;
}

const ProductCard = React.forwardRef<React.ElementRef<"div">, Props>(
  (
    {
      children,
      className,
      image,
      description,
      commentCount,
      date,
      location,
      bookmarked,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border-[1px] border-stroke rounded-[20px] shadow-boxShadow_1 p-4 hover:cursor-pointer",
          className
        )}
        {...props}
      >
        <div className="border-b-[1px] border-[#EDECF0] flex gap-2 pb-3">
          {image && (
            <Image
              src="/images/pictures/productImage.png"
              alt="product"
              height={110}
              width={110}
              className="h-[110px] w-[110px]"
            />
          )}
          <div className="text-title_1 font-body font-medium text-[#010E1E] text-ellipsis overflow-hidden h-[144px]">
            {description}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <div className="flex items-center gap-1">
            <Image
              src="/images/icons/commentsIcon.png"
              width={16}
              height={16}
              alt="comments"
            />
            <span>16</span>
          </div>

          <div className="flex items-center gap-1">
            <Image
              src="/images/icons/dateIcon.png"
              width={16}
              height={16}
              alt="comments"
            />
            <span>22 Apr</span>
          </div>

          <div className="flex items-center gap-1">
            <Image
              src="/images/icons/locationIcon.png"
              width={12.92}
              height={16.3}
              alt="comments"
            />
            <span>Port Harcourt</span>
          </div>

          <div className="flex items-center gap-1">
            <Image
              src="/images/icons/bookmarkIcon.svg"
              width={12.92}
              height={16.3}
              alt="comments"
            />
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
