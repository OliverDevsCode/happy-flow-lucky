import React, { useEffect, useState } from 'react'
import { getWishListItems } from '../../utils/WishListDB'
import ItemCard from '../ItemCard/ItemCard'
import './HomePage.css'

const HomePage = () => {
  const [wishlist, setWishlist] = useState([])

  async function loadWishlist() {
      try {
        const docs = await getWishListItems()
        setWishlist(docs)
        console.log('Wishlist loaded:', docs)
      } catch (err) {
        console.error('Failed to load wishlist:', err)
      }
    }

  useEffect(() => {
    
    loadWishlist()
  }, [])

  return (
    <div className='wishlist-container'>
      <div className='title'>
        <p>Wish List</p>
      </div>
      <div className='wishlist-grid'>
        {wishlist.map((item) => (
                <ItemCard key={item.id} itemId={item.itemId} dateAdded={item.dateAdded} progress={item.progress} target={item.target}/>
        ))}
      </div>
      <button onClick={loadWishlist}>Refresh</button>
    </div>
  )
}

export default HomePage