import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";

export const checkAndHandleCartDocument = async (
  userId,
  totalCount,
  productsCartList,user
) => {
  try {
    const db = getFirestore();
    const cartDoc = await getDoc(doc(db, "cartProducts", userId));
    if (cartDoc.exists()) {
      const cartData = {
        user:user.email,
        totalCount: totalCount,
        productsCartList: productsCartList,
      };
      await updateDoc(doc(db, "cartProducts", userId), {
        cart: cartData,
      });
    } else {
      const cartData = {
        user:user.email,
        totalCount: totalCount,
        productsCartList: productsCartList,
      };
      await setDoc(doc(db, "cartProducts", userId), {
        cart: cartData,
      });
    }
  } catch (error) {
    console.error(
      "Error al verificar y manejar el documento en cartProducts:",
      error
    );
  }
};
