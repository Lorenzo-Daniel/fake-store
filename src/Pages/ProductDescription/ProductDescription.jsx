import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../../Components/Navbar";
// import { useSelector ,useDispatch} from "react-redux";
// import { removeProductFromCart } from "../../Reducers/cartSlice";



function ProductDescription() {
  const [product, setProduct] = useState({});
  const [img, setImg] = useState([]);
  const { title } = useParams();
  // const { productsList } = useSelector((state) => state.cart);

  const getProductTitle = (title) => {
    const getAllProducts = JSON.parse(localStorage.getItem("allProducts"));
    const findProduct = getAllProducts.find(
      (product) => product.title === title
    );
    setProduct(findProduct);
    setImg(findProduct.images);
  };

  useEffect(() => {
    getProductTitle(title);
  }, [title]);
  return (
    <div>
      <Navbar />
      <div className="d-flex flex-column mt-4 mb-5 m-auto col-sm-10 col-md-8">
        <h1 className="text-center mb-4"> {product.title}</h1>
        <div className="m-auto p-2">
          <Swiper
            modules={[Navigation, Pagination]}
            // spaceBetween={1}
            // slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {img.map((img, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="w-100 d-flex justify-content-center align-items-center"
                >
                  <img src={img} alt={img} className="swiper-slide-img" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="p-2">
          <p className="text-center mt-2">{product.description}</p>
          <p className="text-center">{product.brand}</p>
          <hr className="w-75 m-auto" />
          <div className="w-75 m-auto d-md-flex justify-content-between mt-2">
            <div>
              <p>
                Price: <strong>${product.price}</strong>
              </p>
              <p>
                Discount: <strong>{product.discountPercentage}</strong>%
              </p>
              <p>
                Cateory: <strong>{product.category}</strong>
              </p>
            </div>
            <div className="d-flex flex-column">
              <button className={`btn border`}>
                Add To Cart
                <FontAwesomeIcon icon={faCartShopping} className="ms-2" />
              </button>
              <Link to={'/'} className="btn border mt-3">Back to Store</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
