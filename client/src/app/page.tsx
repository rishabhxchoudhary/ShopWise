import HomePageCarousel from "@/components/HomePage/HomePageCarousel";
import ProductSection from "@/components/HomePage/ProductSection";
import { getHomeProducts } from "@/controller/productController";

export default async function Home() {
  // const { data: session } = useSession()

  // const { data: session } = useSession()
  const banners = [
    { link: '/', image: '/homePageCarousel/banner1.jpeg' },
    { link: '/', image: '/homePageCarousel/banner2.webp' },
    { link: '/', image: '/homePageCarousel/banner3.webp' },
    
  ];

  const products = await getHomeProducts();
  const data: any = [];
  
  products.forEach((product: any) => {
    const { _id, name, images, category, ratings, price } = product;
    data.push({
      _id,
      name,
      price,
      image: images[Object.keys(images)[0]],
      category,
      rating: ratings.average,
    });
  });

  const groupedProducts: { [key: string]: any[] } = data.reduce(
    (result: any, product: any) => {
      if (!result[product.category]) {
        result[product.category] = [];
      }
      product._id = product._id.toString();
      result[product.category].push(product);
      return result;
    },
    {} as { [key: string]: any[] }
  );

  return (
      <div className="flex flex-col justify-between">
        <div>
          <HomePageCarousel  products={banners} />
        
          <div className="container mx-auto py-8">
            <div className="flex justify-center">
              <h1 className="text-2xl font-bold uppercase">Our Featured Products</h1>
            </div>
        {groupedProducts && Object.entries(groupedProducts).map(([category, products]) => (
          <ProductSection key={category} title={category} products={products} />
        ))}

      </div>
        </div>
      </div>
  )
}
