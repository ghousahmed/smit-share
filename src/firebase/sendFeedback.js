import { collection, addDoc, fireStore } from "./../db";

const sendFeedback = async (email, text) => {
  try {
    const docRef = await addDoc(collection(fireStore, "feedback"), {
        email,
        feedBAckText: text,
      });
      console.log("Document written with ID: ", docRef.id);
      return docRef.id
  } catch (error) {
    console.log("error--> ", error);
    return error
  }
};
export default sendFeedback;
