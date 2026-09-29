import firebase from "firebase/compat/app";
import { db } from "./firebaseConfig";
import {collection, doc, getDoc,getDocs } from "firebase/firestore";  

/**
 * Get item from DB via itemId
 * @param {*} itemId - item id
 * @returns {doc} firebase doc  
 */
async function getItem(itemId){
  //get item from itemId
  try {
    const docRef = doc(db,"items",itemId);
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    }else{
      console.log("No matching document");
      return false;
    }

  } catch (error) {
    console.error(error)
  }
}

/**
 * Gets all items in the database
 * returns @returns [itemDocs...]
 */
async function getAllItems(){
  const snapshot = await getDocs(collection(db,"items"))

    const items = snapshot.docs.map((doc)=>({
      id: doc.id,
    }));
    return items;
}

export {getItem,getAllItems};