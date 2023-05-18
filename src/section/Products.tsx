import ProductCard from "@/components/ProductCard";
import Button from "@/components/ui/Button";
import { productsConfig } from "@/config.ts/products";
import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {}

const Products = React.forwardRef<React.ElementRef<"section">, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("flex flex-col items-center", className)} {...props}>
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-5 gap-y-6">
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
        <Button variant="outlined" className="mt-6 md:mt-14">Load more requests...</Button>
      </section>
    );
  }
);

Products.displayName = "Products";

export default Products;
