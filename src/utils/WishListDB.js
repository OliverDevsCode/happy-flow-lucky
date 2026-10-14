import { timestampAdd } from "firebase/firestore/pipelines";
import { db } from "./firebaseConfig";
import { collection, doc, getDocs,query,writeBatch ,where, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";


/**
 * Retrieves all itemIds of items in the wishlist
 * @returns {[doc]}
 */
async function getWishListItems(){
  const snapshot = await getDocs(collection(db,"wishlist"))

  const items = snapshot.docs.map((doc)=>({
    id: doc.id,
    ...doc.data(),
  }));
  return items;
}

async function addToWishList(itemId){
  console.log("Adding",itemId)
  await setDoc(doc(db, 'wishlist', itemId), {
    itemId,
    dateAdded: serverTimestamp(),
  })
}

async function removeFromWishList(delete_id) {
  const q = query(collection(db, 'wishlist'), where('itemId', '==', delete_id))
  const snapshot = await getDocs(q)

  if (snapshot.empty) return

  const batch = writeBatch(db)
  snapshot.docs.forEach((d) => batch.delete(d.ref))
  await batch.commit()
}

async function updateProgressField(itemId,newValue){
  try {
    const itemRef = doc(db,"wishlist",itemId);
    await updateDoc(itemRef,{
      progress: newValue
    });
  } catch (error) {
    console.error("couldn't update doc",error);
  }
  
}

async function updateTargetField(itemId,newValue){
  try {
    const itemRef = doc(db,"wishlist",itemId);
    await updateDoc(itemRef,{
      target: newValue
    });
  } catch (error) {
    console.error("couldnt update target",error);
  }
}


export {getWishListItems,removeFromWishList,addToWishList,updateProgressField,updateTargetField};