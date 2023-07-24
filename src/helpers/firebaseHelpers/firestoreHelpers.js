import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// OBTENER DOCUMENTO POR ID DE USUARIO ------------------------------------
export const getUserIdDocument = async (userId, setUserData) => {
  try {
    const db = getFirestore();
    const userSnapshot = await getDoc(doc(db, "users", userId));
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      setUserData(userData);
    } else {
      console.log("El usuario no existe en la base de datos.");
    }
  } catch (error) {
    console.error("Error al obtener el documento del usuario:", error);
  }
};

//ELIMINAR DOC DE COLLECTION ----------------------------------------------
export const deleteDocFromCollection = async (db, collection, userId) => {
  try {
    deleteDoc(doc(db, collection, userId)).then(() => {
      console.log("Document successfully deleted!");
    });
  } catch (error) {
    console.error(
      "Error al borrar el documento de la colección: collection",
      error
    );
  }
};

// MANEJAR DOCUMENTO DE CARRITO ---------------------------------------------------------
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
        email: user.email,
        totalCount: totalCount,
        productsCartList: productsCartList,
      };
      await updateDoc(doc(db, "cartProducts", userId), {
        cart: cartData,
      });
    } else {
      const cartData = {
        email: user.email,
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

// ACTUALIZAR VALOR DE UNA UNICA CLAVE DE OBJETO EN DOCUMNETO

export const updateValueInObjectDoc = async (
  db,
  userId,
  collection,
  key,
  newValue,
  setAlertToShow,
  setAlertChanges,
  setSuccesChange
) => {
  try {
    await updateDoc(doc(db, collection, userId), {
      [key]: newValue,
    });
    setAlertChanges(false);
    setSuccesChange(
      "Your phone number was updated successfully"
    );
    console.log("actualizado correctamente.");
  } catch (error) {
    setAlertToShow()
    console.error("Error al actualizar la email en objeto: ", error);
  }
};

//UPDATE PHONE ----------------------------------------------------

export const updateUserPhone = (
  db,
  userId,
  collection,
  key,
  newValue,
  setAlertToShow,
  setAlertChanges,
  setSuccesChange
) => {
  if (newValue < 9) {
  alert("Your phone number must be at least 9 digits long.")
    console.log("El número de teléfono debe tener al menos 9 dígitos.");
    return;
  } else {
    updateValueInObjectDoc(
      db,
      userId,
      collection,
      key,
      newValue,
      setAlertToShow,
      setAlertChanges
    );
  }
};
