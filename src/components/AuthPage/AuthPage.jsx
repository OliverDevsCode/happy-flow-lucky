import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { getWishListItems } from '../../utils/WishListDB';
import { getAllItems } from '../../utils/itemDB';
import ItemCard from '../ItemCard/ItemCard';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {

  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [itemList,setItemList] = useState([]);

  useEffect(() => {

    if(!userLoggedIn){
      navigate('/login');
    }

    async function loadWishlist() {
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

  return (
    <div className='admin-panel'>
      <p>Admin Page</p>
      <div className='current-wishlist'>
        <p>Live WishList</p>
        <div className='wishlist-grid'>
        {wishlist.map((item) => (
                <ItemCard key={item.id} itemId={item.itemId} dateAdded={item.dateAdded} wishlist={true} admin={true}/>
        ))}
        </div>
      </div>
      <div className='item-catalogue'>
        <p>All Items</p>
        {itemList.map((item) => (
                <ItemCard key={item.id} itemId={item.id} dateAdded={item.dateAdded} wishlist={false} admin={true}/>
        ))}
      </div>
    </div>
  )
}

export default AuthPage