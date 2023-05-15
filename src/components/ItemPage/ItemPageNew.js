import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GET_ADD_ITEM } from "../../urls";
import "./ItemPageNew.css";

export default function ItemPageNew(prpos) {
  const [item, setItem] = useState(null);
  const { item_id } = useParams();

  useEffect(() => {
    console.log("item page");
    const fetchItem = async () => {
      const response = await axios.get(`${GET_ADD_ITEM}${item_id}`);
      console.log(response.data);
      setItem(response.data);
    };
    fetchItem();
  }, []);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="item-container">
      <div className="images-container">
        <img className="main-image" src={item.image} alt={item.description} />
        <div className="secondary-images-container">
          <img
            className="secondary-image"
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTinQN1N1OqzAreQe0omOlWeeYTwHGBCqKLBljgs4BYGNv6lzstyuapTmuI7_SffMstfYk&usqp=CAU"
            }
            alt={item.item_id}
          />
          <img
            className="secondary-image"
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTinQN1N1OqzAreQe0omOlWeeYTwHGBCqKLBljgs4BYGNv6lzstyuapTmuI7_SffMstfYk&usqp=CAU"
            }
            alt={item.item_id}
          />
        </div>
      </div>
      <div className="item-details">
        <h2>item: {item.title}</h2>
        <p>{item.description}</p>
        <p>{item.gender}</p>
      </div>
    </div>
  );
}
