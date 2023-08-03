import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// OBTENER DOCUMENTO POR ID DE USUARIO ------------------------------------
export const getUserIdDocument = async (
  auth,
  db,
  dispatch,
  setUserExtendedData
) => {
  if (auth) {
    try {
      const userId = auth?.currentUser.uid;                  
      const userSnapshot = await getDoc(doc(db, "users", userId));
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        dispatch(setUserExtendedData(userData));
      } else {
        console.log("El usuario no existe en la base de datos.");
      }
    } catch (error) {
      console.error("Error al obtener el documento del usuario:", error);
    }
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

// MANEJAR PURCHASE ORDER ---------------------------------------------------------
export const checkAndHandlePurchaseOrderDocument = async (
  user,
  db,
  purchaseOrder
) => {
  try {
    const purchaseOrderDocRef = doc(db, "purchase-orders", user.uid);
    const purchaseOrderDoc = await getDoc(purchaseOrderDocRef);
    const date = new Date().toDateString();
    const userEmail = user.email;
    if (purchaseOrderDoc.exists()) {
      const purchaseOrdersData = await purchaseOrderDoc.data().orders;
      const newPurchaseOrder = {
        reference: {
          date: date,
          userEmail: userEmail,
        },
        purchaseOrder,
      };
      const newPurchaseOrdersData = [...purchaseOrdersData, newPurchaseOrder];
      await updateDoc(purchaseOrderDocRef, { orders: newPurchaseOrdersData });
    } else {
      const newPurchaseOrder = {
        reference: {
          date: date,
          userEmail: userEmail,
        },
        purchaseOrder,
      };
      await setDoc(purchaseOrderDocRef, { orders: [newPurchaseOrder] });
    }
  } catch (error) {
    console.error(
      "Error al verificar y manejar el documento en purchase-orders",
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
  setSuccesChange,
  setErrorChanges
) => {
  try {
    await updateDoc(doc(db, collection, userId), {
      [key]: newValue,
    });
    setAlertChanges(false);
    setSuccesChange("Your phone number was updated successfully");
    console.log("actualizado correctamente.");
  } catch (error) {
    setAlertToShow(false);
    setErrorChanges('something went wrong ,try again')
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
  setSuccesChange,
  setErrorChanges
) => {
  if (newValue < 9) {
    alert("Your phone number must be at least 9 digits long.");
   
    return;
  } else {
    updateValueInObjectDoc(
      db,
      userId,
      collection,
      key,
      newValue,
      setAlertToShow,
      setAlertChanges,
      setSuccesChange,
      setErrorChanges
    );
  }
};
