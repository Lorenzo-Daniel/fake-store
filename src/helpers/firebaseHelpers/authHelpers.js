import { deleteUser, updateEmail } from "firebase/auth";

import { removeAllProductFromCart } from "../../Reducers/cartSlice";

import { logout } from "../../Reducers/userSlice";

import {
  deleteDocFromCollection,
  updateValueInObjectDoc,
} from "../firebaseHelpers/firestoreHelpers";

// DELETE ACCOUNT ------------------------
export const deleteAccount = (
  auth,
  db,
  dispatch,
  setAlertChanges,
  setOnSuccessSumbit,
  setOnErrorSubmit,
  setIsLoading
) => {
  const user = auth.currentUser;
  if (user) {
    setIsLoading(true);
    deleteUser(user)
      .then(() => {
        deleteDocFromCollection(db, "cartProducts", user.uid);
        deleteDocFromCollection(db, "users", user.uid);
        deleteDocFromCollection(db, "purchase-orders", user.uid);
        dispatch(removeAllProductFromCart());
        dispatch(logout());
        setAlertChanges(false);
        setOnSuccessSumbit("Your account was permanently deleted");
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setAlertChanges(false);
        setOnErrorSubmit(
          "Something went wrong while deleting your account. You may need to close and reopen your session to perform this operation, please log out, log in again and try again."
        );
        console.error("Error al eliminar la cuenta del usuario:", error);
      });
  } else {
    setOnErrorSubmit("");
  }
};

// UPDATE EMAIL -----------------------------------------------------------
export const updateUserEmail = async (
  db,
  auth,
  newValue,
  key,
  setOnSuccessSumbit,
  setOnErrorSubmit,
  setIsLoading,
  userCol,
  cartCol
) => {
  const user = auth.currentUser;
  setIsLoading(true);
  if (user) {
    await updateEmail(user, newValue)
      .then(() => {
        updateValueInObjectDoc(
          db,
          user.uid,
          userCol,
          key,
          newValue,
          setOnErrorSubmit,
          setOnSuccessSumbit,
          setIsLoading
        );
        updateValueInObjectDoc(
          db,
          user.uid,
          cartCol,
          key,
          newValue,
          setOnErrorSubmit,
          setOnSuccessSumbit,
          setIsLoading
        );
        setOnSuccessSumbit(`Your ${key} was successfully updated`);
        console.log("Email actualizado correctamente.");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al actualizar el email: ", newValue, error);
        setOnErrorSubmit(
          `There was an error updating your ${key},Please close and reopen your session and try again`
        );
        setIsLoading(false);
      });
  } else {
    setOnErrorSubmit("There is no registered user");
    console.error("No hay un usuario autenticado.");
  }
};
