import axios from "axios";
import { useState } from "react";
import { GET_ADD_ITEM } from "../../urls";

export default function GetItems() {
  const [description, setDescription] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [itemElements, setItemElements] = useState([]);

  const handleGetAllItems = async (event) => {
    event.preventDefault();
    console.log("calling all items from api");

    try {
      const allItemsREsult = await axios.get(GET_ADD_ITEM);
      console.log(allItemsREsult);
      console.log(allItemsREsult.data.results);
      const AllItems = allItemsREsult.data.results;
      const itemElements = AllItems.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.id}</p>
            <p>{item.size}</p>
            <p>{item.condition}</p>
            <p>{item.gender}</p>
            <img src={item.image} alt={item.description} />
          </div>
        );
      });
      setItemElements(itemElements);
    } catch (error) {
      console.log(`error in ${handleGetAllItems.name}: ${error}`);
    }
  };

  return (
    <>
      <h1>items from rest api kiddie_closet_back</h1>
      <button onClick={handleGetAllItems}>get all items</button>
      <div>{itemElements}</div>;
    </>
  );
}
