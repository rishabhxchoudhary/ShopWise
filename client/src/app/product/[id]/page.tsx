import ProductPage from '@/components/ProductPage/ProductPage';
import { getProductById } from '@/controller/productController';

export default async function Page({params}: any) {
    const { id } = params;
    const data:any = await getProductById(id);
    return (
        <div>
            <ProductPage
                id={String(data._id)}
                name={data.name}
                price={data.price}
                description={data.description}
                variants={data.variants}
                images={data.images}
                ratings={data.ratings}
                reviews={data.reviews}
                specifications={data.specifications}
                tags={data.tags}
            />
        </div>
    )
}