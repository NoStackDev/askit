import ProductCard from "@/components/ProductCard";
import Button from "@/components/ui/Button";
import { productsConfig } from "@/config.ts/products";
import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {}

const Products = React.forwardRef<React.ElementRef<"section">, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("flex flex-col items-center", className)}
        {...props}
      >
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-x-5 gap-y-6">
          {productsConfig.map((productConfig) => {
            return (
              <ProductCard
                key={productConfig.id}
                image={productConfig.image}
                description={productConfig.description}
                commentCount={productConfig.commentCount}
                date={productConfig.date}
                location={productConfig.location}
                bookmarked={productConfig.bookmarked}
              />
            );
          })}
        </div>
        <Button variant="outlined" className="mt-6 md:mt-14">
          Load more requests...
        </Button>

        <div className="flex mt-4 md:mt-6 gap-3">
          <div className="px-3 py-[5px] border-[1px] border-secondary text-title_3 font-body font-medium bg-secondary text-white hover:cursor-pointer">1</div>
          <div className="px-3 py-[5px] border-[1px] border-secondary text-title_3 font-body font-medium hover:cursor-pointer">2</div>
          <div className="px-3 py-[5px] border-[1px] border-secondary text-title_3 font-body font-medium hover:cursor-pointer">3</div>
          <div className="px-3 py-[5px] border-[1px] border-secondary text-title_3 font-body font-medium hover:cursor-pointer">4</div>
          <div className="px-3 py-[5px] border-[1px] border-secondary text-title_3 font-body font-medium hover:cursor-pointer">5</div>
          <div className="px-2 py-[5px] border-[1px] border-secondary text-title_3 font-body font-medium hover:cursor-pointer ml-3 ml-6">100</div>
          <div className="px-2 py-[5px] border-[1px] border-secondary text-title_3 font-body font-medium hover:cursor-pointer">101</div>
        </div>
      </section>
    );
  }
);

Products.displayName = "Products";

export default Products;
