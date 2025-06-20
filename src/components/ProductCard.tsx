
import { useState } from 'react';
import { Product } from '../types/productTypes';
import { Card, CardContent, CardFooter } from './ui/card';
import { AspectRatio } from './ui/aspect-ratio';
import { cn } from '../lib/utils';
import { StarIcon } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  isSelected?: boolean;
}

const ProductCard = ({ product, onClick, isSelected = false }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 overflow-hidden",
        isSelected 
          ? "border-primary shadow-md ring-2 ring-primary/50" 
          : "hover:shadow-md",
        isHovered && !isSelected ? "scale-[1.02]" : ""
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-2">
        <AspectRatio ratio={1}>
          <div className="flex items-center justify-center w-full h-full bg-muted rounded overflow-hidden">
            <img 
              src={product.imageSrc} 
              alt={product.name} 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </AspectRatio>
        
        <div className="mt-3">
          <div className="flex justify-between items-start">
            <h3 className="font-medium truncate">{product.name}</h3>
            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
              {product.category}
            </span>
          </div>
          
          <div className="flex items-center mt-1">
            <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm ml-1">{product.rating}</span>
            <span className="text-xs text-muted-foreground ml-2">
              {product.usersPurchased} purchased
            </span>
          </div>
          
          {product.similarityScore !== undefined && (
            <div className="mt-1 text-xs text-muted-foreground">
              Similarity: {Math.round(product.similarityScore * 100)}%
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="px-3 py-2 bg-background border-t flex justify-between items-center">
        <span className="font-semibold">{formatPrice(product.price)}</span>
        {isSelected && (
          <span className="text-xs font-medium text-primary">Selected</span>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
