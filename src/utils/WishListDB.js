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

/**
 * Add item to wishlist
 * @param {*} itemId - the firestore Id of the item you wish to add to the wishlist collection
 */
async function addToWishList(itemId){
  console.log("Adding",itemId)
  await setDoc(doc(db, 'wishlist', itemId), {
    itemId,
    dateAdded: serverTimestamp(),
  })
}

/**
 * Remove an Item from the wishlist collection
 * @param {*} delete_id - firestore ID of the item you wish to delete
 * @returns - will return if document did exist
 */
async function removeFromWishList(delete_id) {
  const q = query(collection(db, 'wishlist'), where('itemId', '==', delete_id))
  const snapshot = await getDocs(q)

  if (snapshot.empty) return

  const batch = writeBatch(db)
  snapshot.docs.forEach((d) => batch.delete(d.ref))
  await batch.commit()
}

/**
 * Change progress value stored in the wishlist collection
 * @param {*} itemId - firestore ID of the item you wish to update
 * @param {*} newValue - value you want to update the database value too
 */
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

/**
 * Change Target value stored in the wishlist database
 * @param {*} itemId - ID of the item you wish to update
 * @param {*} newValue - value you want to update the database value too
 */
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