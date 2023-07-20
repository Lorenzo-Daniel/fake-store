import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";




export const getUserIdDocument = async (userId,setUserData) => {
  try {
    const db = getFirestore()

    // Obtén los datos del documento
    const userSnapshot = await getDoc(doc(db, "users", userId));

    // Comprueba si el documento existe
    if (userSnapshot.exists()) {
      // El documento existe, puedes acceder a los datos del usuario utilizando userSnapshot.data()
      const userData = userSnapshot.data();
      setUserData(userData);
    } else {
      console.log("El usuario no existe en la base de datos.");
    }
  } catch (error) {
    console.error("Error al obtener el documento del usuario:", error);
  }
};




export const checkAndHandleCartDocument = async (
  userId,
  totalCount,
  productsCartList,
  user
) => {
  try {
    const db = getFirestore();
    const cartDoc = await getDoc(doc(db, "cartProducts", userId));
    if (cartDoc.exists()) {
      const cartData = {
        user: user.email,
        totalCount: totalCount,
        productsCartList: productsCartList,
      };
      await updateDoc(doc(db, "cartProducts", userId), {
        cart: cartData,
      });
    } else {
      const cartData = {
        user: user.email,
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
