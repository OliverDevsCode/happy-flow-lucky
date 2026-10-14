import React, { useEffect, useState } from "react";
import './ItemOptionsPopUp.css';
import { updateProgressField, updateTargetField } from "../../utils/WishListDB";

const ItemOptionsPopUp = ({ item, onClose }) => {
    
    const [target,setTarget] = useState(item.target);
    const [progress,setProgress] = useState(item.progress);

    useEffect(()=>{
        console.log("mounted component");
    },[])

   const updateProgress = async() => {
        //perhaps add error handling 
        await updateProgressField(item.id,progress);
        item.progress = progress;
    };

    const incrementProgress = async() => {
        //perhaps add error handling 
        const newValue = parseInt(progress) + 1;
        await updateProgressField(item.id,newValue);
        item.progress = newValue;
        setProgress(newValue);
    };

    const updateTarget = async() => {
        //perhaps add error handling 
        await updateTargetField(item.id,target);
        item.target = target;
    };
    

    return (
        <div className="item-options-popup">
            <div className="popup-content">
                <div className="update-target">
                    <input placeholder="Change target" value={target} onChange={(e) => { setTarget(e.target.value) }}></input>
                    <button onClick={updateTarget}>Update Target</button>
                </div>
                <div className="update-progress">
                    <input placeholder="Change progress" value={progress} onChange={(e)=>{setProgress(e.target.value)}}></input>
                    <button onClick={updateProgress}>Set Amount</button>
                    <button onClick={incrementProgress}>Increment By One</button>
                </div>
                <button onClick={onClose}>Close PopUp</button>
            </div>
        </div>
    )

}

export default ItemOptionsPopUp;
