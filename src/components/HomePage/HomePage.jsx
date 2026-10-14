import React, { useEffect, useState } from 'react'
import { getWishListItems } from '../../utils/WishListDB'
import ItemCard from '../ItemCard/ItemCard'
import './HomePage.css'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [wishlist, setWishlist] = useState([])
  const [clicks,setClicks] = useState(0);

  const navigate = useNavigate();

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

  const updateClicks = () =>{
    const newClick = clicks + 1;
    setClicks(newClick);
    if(newClick >= 3){
      navigate('/admin');
    }
  };

  return (
    <div className='wishlist-container'>
      <div className='title'>
        <p onClick={updateClicks}>Wish List</p>
      </div>
      <div className='wishlist-grid'>
        {wishlist.map((item) => (
                <ItemCard key={item.id} itemId={item.itemId} dateAdded={item.dateAdded} progress={item.progress} target={item.target}/>
        ))}
      </div>
      <button className='refresh-button' onClick={loadWishlist}>Refresh</button>
    </div>
  )
}

export default HomePage