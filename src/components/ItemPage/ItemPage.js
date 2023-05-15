import React, { useState, useEffect } from "react";
import { GET_ITEMS_BY_AD_ID } from "../../urls";
import BigImage from "../ItemImage/ItemImage";
// import './ItemPage.css';

// props - ad_id, item_id(big image)
export default function ItemPage(props) {
  const [currentItem, setCurrentItem] = useState(null);
  const [otherItems, setOtherItems] = useState([]);

  // get all items(1 up to 3) from the ad_id. show the one with the item_id as the big one
  useEffect(() => {
    fetch(`${GET_ITEMS_BY_AD_ID}${props.ad_id}`)
      .then((response) => response.json())
      .then((data) => {
        const current = data.items.find((item) => item.id === props.item_id);
        const others = data.items.filter((item) => item.id !== props.item_id);
        setCurrentItem(current);
        setOtherItems(others);
      })
      .catch((error) => console.error(error));
  }, [props.ad_id, props.item_id]);

  return (
    <div className="item-page">
      <div className="item-page__image-container">
        {/* {currentItem && <BigImage src={currentItem.bigImage} />} */}
        {currentItem && (
          <BigImage
            src={
              "https://img.freepik.com/free-vector/baby-clothes-set_74855-202.jpg?w=2000"
            }
          />
        )}

        <div className="item-page__small-images-container">
          {otherItems.map((item) => (
            <img
              key={item.id}
              src={item.smallImage}
              alt={`small image for item ${item.id}`}
              className="item-page__small-image"
            />
          ))}
        </div>
      </div>
      <div className="item-page__info-container">
        <div className="item-page__title">
          {currentItem && currentItem.title}
        </div>
        <div className="item-page__location">
          {currentItem && currentItem.location}
        </div>
        <div className="item-page__description">
          {currentItem && currentItem.description}
        </div>
        <button className="item-page__contact-button">Contact</button>
      </div>
    </div>
  );
}
