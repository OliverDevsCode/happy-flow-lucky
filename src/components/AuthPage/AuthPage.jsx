import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { getWishListItems } from '../../utils/WishListDB';
import { removeFromWishList } from '../../utils/WishListDB';
import { addToWishList } from '../../utils/WishListDB';
import { deleteItem, getAllItems } from '../../utils/itemDB';
import ItemCard from '../ItemCard/ItemCard';
import { useNavigate } from 'react-router-dom';

import "./AuthPage.css"
import CreateItem from '../CreateItem/CreateItem';
import ItemOptionsPopUp from '../ItemOptionsPopUp/ItemOptionsPopUp';

const AuthPage = () => {

  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [itemList,setItemList] = useState([]);

  const [showPopUp,setShowPopUp] = useState(false);
  const [selectedItem,setSelectedItem] = useState({});

  useEffect(() => {

    if(!userLoggedIn){
      navigate('/login');
    }


    async function loadWishlist() {
      console.log("getting wishlist");
      console.log("getting allitems");
      try {
        const wishlistDocs = await getWishListItems()
        setWishlist(wishlistDocs)

        const items = await getAllItems();

        //filter out what is already on wishlist
        const onWishlist = new Set(wishlistDocs.map((d) => d.itemId))
        setItemList(items.filter((item) => !onWishlist.has(item.id)))

      } catch (err) {
        console.error('Failed to load wishlist:', err)
      }
    }

    loadWishlist()
  }, [])

  const setItemPopUp = () => {
      const newState = !showPopUp;
      setShowPopUp(newState);
  }


  const handleAdd = async (item) => {
    console.log('item to add:',item);
  try {
    await addToWishList(item.id);
    setWishlist((prev) => [
      ...prev,
      item,
    ]);
    setItemList((prev) =>
      prev.filter((w) => w.id !== item.id)
    );
  } catch (err) {
    console.error('Failed to add:', err);
  }
};

const handleRemove = async (item) => {
  console.log('item to remove:',item);
  try {
    await removeFromWishList(item.id);
    setWishlist((prev) => prev.filter((w) => w.id !== item.id));
    setItemList([...itemList, item]);
  } catch (err) {
    console.error('Failed to remove:', err);
  }
};

const handleDelete = async (itemId) => {
  setItemList((prev) => prev.filter((i) => i.id !== itemId));
  setWishlist((prev) => prev.filter((w) => w.itemId !== itemId));
  await deleteItem(itemId);
};

  return (
    <div className='admin-panel'>
      {showPopUp && (
        <ItemOptionsPopUp item={selectedItem} onClose={setItemPopUp}></ItemOptionsPopUp>
      )}
      <p>Admin Dashboard</p>

      <div className='current-wishlist'>
        <p>Live WishList</p>
        <div className='wishlist-grid'>
          {wishlist.map((item) => (
            <div key={item.id || item.itemId} className='admin-item'>
              <ItemCard itemId={item.itemId} dateAdded={item.dateAdded} target={item.target} progress={item.progress}/>
              <button onClick={()=>{setSelectedItem(item);setItemPopUp();}}>Items Option Progress</button>
              <button onClick={() => handleRemove(item)}>Remove from Wishlist</button>
            </div>
          ))}
        </div>
      </div>

      <div className='item-catalogue'>
        <p>All Items</p>
        <div className='item-catalogue-grid'>
          {itemList.map((item) => (
            <div key={item.id} className='admin-item'>
              <ItemCard itemId={item.id} dateAdded={item.dateAdded} />
              <button onClick={() => handleAdd(item)}>Add to Wishlist</button>
              {/* //add modal that lets you edit the target for the item */}
              <button onClick={() => handleDelete(item.id)}>Delete Item</button>
            </div>
          ))}
        </div>
      </div>

      <div className='create-container'>
        <CreateItem />
      </div>
    </div>
  );
}

export default AuthPage