
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/productTypes';
import { 
  getAllProducts, 
  getAllCategories, 
  getProductsByCategory, 
  getRecommendations 
} from '../services/recommendationService';
import ProductCard from '../components/ProductCard';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import RecommendationExplainer from '../components/RecommendationExplainer';
import RecommendationVisualizer from '../components/RecommendationVisualizer';
import ProductGrid from '../components/ProductGrid';

const ProductRecommender = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  
  // Fetch all products
  const { data: allProducts } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts
  });
  
  // Fetch all categories
  const { data: allCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories
  });
  
  // Fetch category products when a category is selected
  const { data: categoryProducts } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => getProductsByCategory(selectedCategory),
    enabled: !!selectedCategory
  });
  
  // Fetch recommendations when a product is selected
  const { data: recommendations } = useQuery({
    queryKey: ['recommendations', selectedProductId],
    queryFn: () => getRecommendations(selectedProductId),
    enabled: !!selectedProductId
  });
  
  const handleProductSelect = (product: Product) => {
    setSelectedProductId(product.id);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Cross-Category Product Recommender</h1>
      
      <RecommendationExplainer />
      
      <div className="mb-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Select a Category</h2>
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value);
                setSelectedProductId('');
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a product category" />
              </SelectTrigger>
              <SelectContent>
                {allCategories?.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
      
      {selectedCategory && categoryProducts && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Products in {selectedCategory}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductSelect(product)}
                isSelected={product.id === selectedProductId}
              />
            ))}
          </div>
        </div>
      )}
      
      {recommendations && recommendations.product && (
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Recommendations for {recommendations.product.name}</h2>
              
              <RecommendationVisualizer 
                selectedProduct={recommendations.product}
                similarProducts={recommendations.similarProducts}
                crossCategoryProducts={recommendations.crossCategoryProducts}
              />
              
              <Tabs defaultValue="similar">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="similar">Similar Products</TabsTrigger>
                  <TabsTrigger value="cross">Cross-Category Products</TabsTrigger>
                </TabsList>
                
                <TabsContent value="similar">
                  <h3 className="text-lg font-medium my-4">Products Similar to {recommendations.product.name}</h3>
                  <ProductGrid products={recommendations.similarProducts} />
                </TabsContent>
                
                <TabsContent value="cross">
                  <h3 className="text-lg font-medium my-4">Complementary Products from Other Categories</h3>
                  <ProductGrid products={recommendations.crossCategoryProducts} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProductRecommender;
