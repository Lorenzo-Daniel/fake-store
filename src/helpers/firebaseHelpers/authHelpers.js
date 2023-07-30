import { deleteUser, updateEmail } from "firebase/auth";
import { logout } from "../../Reducers/userSlice";
import { removeAllProductFromCart } from "../../Reducers/cartSlice";
import {
  deleteDocFromCollection,
  updateValueInObjectDoc,
} from "../firebaseHelpers/firestoreHelpers";

// DELETE ACCOUNT ------------------------
export const deleteAccount = (
  dispatch,
  setAlertToShow,
  setAlertChanges,
  setSuccesChange,
  setErrorChanges,
  auth,
  db
) => {
  const user = auth.currentUser;

  if (user) {
    deleteUser(user)
      .then(() => {
        deleteDocFromCollection(db, "cartProducts", user.uid);
        deleteDocFromCollection(db, "users", user.uid);
        dispatch(removeAllProductFromCart());
        dispatch(logout());
        setAlertChanges(false);
        setSuccesChange(
           "Your account was permanently deleted");
        console.log("La cuenta del usuario se eliminó correctamente.");
      })
      .catch((error) => {
        setErrorChanges( "Something went wrong when trying to delete your account, please try again",
        );
        setAlertChanges(false)
        console.error("Error al eliminar la cuenta del usuario:", error);
      });
  } else {
    setAlertChanges(false)
    setErrorChanges( "There is no registered user" );
    console.error("No hay un usuario autenticado.");
  }
};

// UPDATE EMAIL -----------------------------------------------------------
export const updateUserEmail = (
  e,
  auth,
  newEmail,
  setAlertToShow,
  setAlertChanges,
  db,
  newValue,
  key,
  userCol,
  cartCol
) => {
  e.preventDefault();
  const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const user = auth.currentUser;
  if (!regExp.test(newEmail)) {
    alert("Please enter a valid email");
    return;
  } else {
    if (user) {
      updateEmail(user, newEmail)
        .then(() => {
          setAlertChanges(false);
          updateValueInObjectDoc(db, user.uid, userCol, key, newValue);
          updateValueInObjectDoc(db, user.uid, cartCol, key, newValue);
          setAlertToShow({
            updatedEmail: "Your email was updated successfully",
          });
          console.log("Email actualizado correctamente.");
        })
        .catch((error) => {
          console.error("Error al actualizar el email: ", newEmail, error);
          alert(`Error al actualizar el email:  ${newEmail} ${error}`);
        });
    } else {
      console.error("No hay un usuario autenticado.");
    }
  }
};


