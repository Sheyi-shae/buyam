import ProductDetailsPage from "@/components/product-details/product-details-page";


export default async function page({ params }: { params: { subcategory: string, product: string } }) {

  const {product } = await params;
  return (
    <div className=""> <ProductDetailsPage slug={product} /></div>
  )
}
