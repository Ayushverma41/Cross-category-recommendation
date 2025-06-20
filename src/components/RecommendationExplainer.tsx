
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Card, CardContent } from './ui/card';

const RecommendationExplainer = () => {
  return (
    <Card className="mb-8 bg-muted/20">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">How Our Recommendation System Works</h2>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="model">
            <AccordionTrigger>Collaborative Filtering Model</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Our recommendation system uses collaborative filtering to suggest products based on user behavior patterns.
                We analyze purchase history, ratings, and price preferences to find items that are frequently bought together.
              </p>
              <p>
                The model identifies patterns in user-product interactions to make two types of recommendations:
                similar products within the same category and complementary products from other categories.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="factors">
            <AccordionTrigger>Key Factors in Recommendations</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="font-medium">Product Ratings (40%):</span> Higher-rated products are more likely to be recommended</li>
                <li><span className="font-medium">Purchase Frequency (40%):</span> Products frequently purchased together influence recommendations</li>
                <li><span className="font-medium">Price Points (20%):</span> Price compatibility is considered when making complementary suggestions</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="cross">
            <AccordionTrigger>Cross-Category Recommendations</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Our system identifies complementary products across different categories by analyzing:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Products frequently purchased together by other users</li>
                <li>Category pairs with strong co-occurrence patterns</li>
                <li>Items with compatible price points and quality levels</li>
              </ul>
              <p className="mt-2">
                Examples include recommending sunglasses with watches, shoes with bags, or earbuds with smartphones.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="technique">
            <AccordionTrigger>SVD (Singular Value Decomposition)</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                Our algorithm uses SVD, a matrix factorization technique, to reduce the dimensionality of user-item interactions
                and discover latent factors that influence purchase decisions.
              </p>
              <p>
                This allows us to identify hidden patterns and relationships between products that may not be obvious
                from just looking at categories or basic product attributes.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default RecommendationExplainer;
