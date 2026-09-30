import React, { useEffect, useState } from 'react'
import { getItem } from '../../utils/itemDB'
import { removeFromWishList } from '../../utils/WishListDB'
import { addToWishList } from '../../utils/WishListDB'
import './ItemCard.css'

const ItemCard = ({ itemId , dateAdded, admin, wishlist ,onChange}) => {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imgFailed, setImgFailed] = useState(false)
  const [formatedDate,setFormattedDate] = useState("");

  useEffect(() => {
    let cancelled = false

    if (dateAdded) {
    setFormattedDate(
    dateAdded.toDate().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    )
  } 

    async function getItemInfo() {
      setLoading(true)
      setImgFailed(false)
      try {
        const data = await getItem(itemId)
        if (!cancelled) setItem(data)
      } catch (err) {
        console.error('Failed to load item:', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    getItemInfo()
    return () => { cancelled = true }
  }, [itemId])

  if (loading) {
    return (
      <div className='item-card item-card--loading'>
        <div className='item-card__image skeleton' />
        <div className='item-card__body'>
          <div className='skeleton skeleton-line skeleton-line--title' />
          <div className='skeleton skeleton-line' />
          <div className='skeleton skeleton-line skeleton-line--short' />
        </div>
      </div>
    )
  }

  if (!item) return null

  return (
    <article className='item-card'>
      <div className='item-card__image'>
        {item.image_url && !imgFailed ? (
          <img
            src={item.image_url}
            alt={item.title}
            loading='lazy'
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className='item-card__placeholder'>✿</div>
        )}
      </div>

      <div className='item-card__body'>
        <h3 className='item-card__title'>{item.title}</h3>
        {item.notes && <p className='item-card__notes'>{item.notes}</p>}
        {formatedDate && (
          <span className='item-card__date'>Added {formatedDate}</span>
        )}
      </div>
      
    </article>
  )
}

export default ItemCard