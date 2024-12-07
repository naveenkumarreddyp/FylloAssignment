import ProductTable from './ProductTable';
import {productsData} from "../../Data/Data"


export default function Products() {
  return (
    <div className="container mx-auto p-6">
      <ProductTable data={productsData} />
    </div>
  );
}

