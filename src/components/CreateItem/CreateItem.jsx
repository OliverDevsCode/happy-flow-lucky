import React, { useEffect, useState } from 'react'
import './CreateItem.css'
import ItemCard from '../ItemCard/ItemCard';
import { addItem } from '../../utils/itemDB';


const CreateItem = () => {

  const [title,setTitle] = useState('');
  const [notes,setNotes] = useState('');
  const [image_url,setImage_url] = useState('');
  const [formatedDate,setFormattedDate] = useState("");
  const [imgFailed, setImgFailed] = useState(false)

  useEffect(() => {
    setImgFailed(false);
  }, [image_url]);

  async function handleCreate(){
    //add to database
    await addItem(title,notes,image_url);
    //refresh page
    window.location.reload();
  }
  

  useEffect(() => {
    const dateNow = new Date();

    setFormattedDate(
      dateNow.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    );
  }, []);
  


  return (
    <div className='custom-item-container'>

      <p>Create Item</p>
      <div className='input-container'>
        <input type='text' placeholder='title' value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
        <input type='text' placeholder='notes' value={notes} onChange={(e)=>{setNotes(e.target.value)}}></input>
        <input type='text' placeholder='bg image url' value={image_url} onChange={(e)=>{setImage_url(e.target.value)}}></input>
        <button onClick={handleCreate}>Add to Inventory</button>
      </div>
      <div className='preview-container'>
        <p>Preview</p>
        <article className='item-card'>
      <div className='item-card__image'>
        {image_url && !imgFailed ? (
          <img
            src={image_url}
            alt={title}
            loading='lazy'
            onError={() => {setImgFailed(true); console.log("image failed")}}
          />
        ) : (
          <div className='item-card__placeholder'>✿</div>
        )}
      </div>

      <div className='item-card__body'>
        <h3 className='item-card__title'>{title}</h3>
        {notes && <p className='item-card__notes'>{notes}</p>}
        {formatedDate && (
          <span className='item-card__date'>Added {formatedDate}</span>
        )}
      </div>
      
      
    </article>
      </div>
    </div>
  )
}

export default CreateItem