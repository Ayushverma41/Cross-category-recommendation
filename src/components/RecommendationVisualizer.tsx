
import { useEffect, useRef } from 'react';
import { Product } from '../types/productTypes';

interface RecommendationVisualizerProps {
  selectedProduct: Product | null;
  similarProducts: Product[];
  crossCategoryProducts: Product[];
}

const RecommendationVisualizer = ({ 
  selectedProduct, 
  similarProducts, 
  crossCategoryProducts 
}: RecommendationVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !selectedProduct) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Set dimensions
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 4;
    
    // Draw selected product in center
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#0ea5e9';
    ctx.fill();
    
    ctx.font = '12px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(selectedProduct.name.substring(0, 10), centerX, centerY);
    
    // Draw similar products
    const similarAngleStep = (Math.PI) / (similarProducts.length + 1);
    similarProducts.forEach((product, i) => {
      const angle = Math.PI / 2 + similarAngleStep * (i + 1);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      // Connection line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Product node
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#0ea5e9';
      ctx.globalAlpha = 0.7;
      ctx.fill();
      ctx.globalAlpha = 1;
      
      // Product text
      ctx.fillStyle = 'white';
      ctx.fillText(product.name.substring(0, 8), x, y);
    });
    
    // Draw cross-category products
    const crossAngleStep = (Math.PI) / (crossCategoryProducts.length + 1);
    crossCategoryProducts.forEach((product, i) => {
      const angle = Math.PI * 3 / 2 + crossAngleStep * (i + 1);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      // Connection line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Product node
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#8b5cf6';
      ctx.globalAlpha = 0.7;
      ctx.fill();
      ctx.globalAlpha = 1;
      
      // Product text
      ctx.fillStyle = 'white';
      ctx.fillText(product.name.substring(0, 8), x, y);
    });
    
    // Add legend
    ctx.font = '12px Arial';
    ctx.fillStyle = '#0ea5e9';
    ctx.textAlign = 'left';
    ctx.fillText('Same Category', 10, 20);
    
    ctx.fillStyle = '#8b5cf6';
    ctx.fillText('Cross Category', 10, 40);
    
  }, [selectedProduct, similarProducts, crossCategoryProducts]);
  
  if (!selectedProduct) return null;
  
  return (
    <div className="my-6 flex flex-col items-center">
      <h3 className="text-lg font-medium mb-4">Recommendation Visualization</h3>
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={300} 
        className="border rounded bg-background"
      ></canvas>
      <p className="text-xs text-muted-foreground mt-2">
        Visualization based on collaborative filtering similarities
      </p>
    </div>
  );
};

export default RecommendationVisualizer;
