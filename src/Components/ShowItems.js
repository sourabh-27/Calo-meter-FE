import React, { useEffect, useState } from "react";
import {
  getItemsApi,
  addItemApi,
  updateItemApi,
  deleteItemApi,
} from "../Utils/loginHelper";
export default function ShowItems(props) {
  const [userId] = useState(props.userId);
  const [items, setItems] = useState([]);
  const [createItemMode, setCreateItemMode] = useState(false);
  const [enabledKey, setEnabledKey] = useState(null);
  const [modifiedItem, setModifiedItem] = useState({});
  const [newFoodItem, setNewFoodItem] = useState({
    title: "",
    description: "",
    calories: 0,
  });
  async function getItems() {
    const response = await getItemsApi(userId);
    if (response.status === 200) {
      setItems(response.data);
    }
    checkIfTokenExpired(response);
  }

  useEffect(() => {
    getItems();
  }, []);

  function checkIfTokenExpired(err) {
    if (err.response.status === 403) {
      props.setIsLoggedIn(false);
      localStorage.removeItem("userDetails");
    }
  }

  async function addItem() {
    const response = await addItemApi({ ...newFoodItem });
    if (response.status === 200) {
      setCreateItemMode(false);
      getItems();
    }
    checkIfTokenExpired(response);
  }

  async function updateItem(item) {
    const response = await updateItemApi(item);
    if (response.status === 200) {
      getItems();
    }
    checkIfTokenExpired(response);
  }

  async function deleteItem(id) {
    const response = await deleteItemApi(id);
    if (response.status === 200) {
      getItems();
    }
    checkIfTokenExpired(response);
  }

  return (
    <>
      <button style={{ display: "flex", marginLeft: "43%", marginBottom: "2%", marginTop: "2%", fontSize: "17px"}} onClick={() => setCreateItemMode(true)}>Create an Item</button>
      {createItemMode && (
        <div>
          <input
            placeholder="Food title"
            value={newFoodItem.title}
            onChange={(e) =>
              setNewFoodItem({ ...newFoodItem, title: e.target.value })
            }
          />
          <input
            placeholder="Description"
            value={newFoodItem.description}
            onChange={(e) =>
              setNewFoodItem({ ...newFoodItem, description: e.target.value })
            }
          />
          <input
            placeholder="item calorie"
            type="number"
            value={newFoodItem.calories}
            onChange={(e) =>
              setNewFoodItem({ ...newFoodItem, calories: e.target.value })
            }
          />
          <button onClick={() => addItem()}>Add</button>
        </div>
      )}
      {items.map((item, key) => {
        let disabled = !(enabledKey === key);
        return (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <span>{item.created_at}</span>
            {disabled ? (
              <>
                <input value={item.title} disabled={disabled} />
                <input value={item.description} disabled={disabled} />
                <input value={item.calories} disabled={disabled} />
              </>
            ) : (
              <>
                <input
                  value={modifiedItem.title}
                  onChange={(e) =>
                    setModifiedItem({ ...modifiedItem, title: e.target.value })
                  }
                />
                <input
                  value={modifiedItem.description}
                  onChange={(e) =>
                    setModifiedItem({
                      ...modifiedItem,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  value={modifiedItem.calories}
                  onChange={(e) =>
                    setModifiedItem({
                      ...modifiedItem,
                      calories: e.target.value,
                    })
                  }
                />
              </>
            )}

            {disabled ? (
              <button
                onClick={() => {
                  setEnabledKey(key);
                  setModifiedItem(item);
                }}
              >
                Modify
              </button>
            ) : (
              <button
                onClick={() => {
                  updateItem({ ...modifiedItem });
                  setModifiedItem(null);
                  setEnabledKey(null);
                }}
              >
                Confirm
              </button>
            )}
            <button
              onClick={() => {
                deleteItem(item.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
}
