import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import apiRequest from "./apiRequest";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
const App = () => {
      const API_URL = "http://localhost:3500/items";
      const [items, setItems] = useState([]);
      const [newItem, setNewItem] = useState("");
      const [search, setSearch] = useState("");
      const [fetchError, setFetchError] = useState(null);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
            const fetchItems = async () => {
                  try {
                        const response = await fetch(API_URL);
                        if (!response.ok)
                              throw Error("Did not receive expected data");

                        const listItems = await response.json();
                        setFetchError(null);
                        setItems(listItems);
                  } catch (err) {
                        setFetchError(err.message);
                  } finally {
                        setLoading(false);
                  }
            };

            setTimeout(() => {
                  (async () => await fetchItems())();
            }, 1000);
      }, []);

      const addItem = async (item) => {
            console.log(item);
            const id = items.length ? items[items.length - 1].id + 1 : 1;
            const myNewItem = { id, checked: false, item };
            const listItems = [...items, myNewItem];
            setItems(listItems);
            const postOption = {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(myNewItem),
            };
            const result = await apiRequest(API_URL, postOption);
            if (result) setFetchError(result);
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            if (!newItem) return;
            addItem(newItem);
            setNewItem("");
      };

      const handleCheck = async (id) => {
            const listItems = items.map((item) =>
                  item.id === id ? { ...item, checked: !item.checked } : item
            );
            setItems(listItems);
            const myItem = listItems.filter((item) => item.id === id);
            const updateOptions = {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ checked: myItem[0].checked }),
            };
            const reqUrl = `${API_URL}/${id}`;
            const result = await apiRequest(reqUrl, updateOptions);
            if (result) setFetchError(result);
      };

      const handleDelete = async (id) => {
            const listItems = items.filter((item) => item.id !== id);
            setItems(listItems);
            const deleteOptions = {
                  method: "DELETE",
            };
            const reqUrl = `${API_URL}/${id}`;
            const result = await apiRequest(reqUrl, deleteOptions);
            if (result) setFetchError(result);
      };

      return (
            <div className="App">
                  <Header title="Todo List" />

                  <AddItem
                        newItem={newItem}
                        setNewItem={setNewItem}
                        handleSubmit={handleSubmit}
                  />
                  <SearchItem search={search} setSearch={setSearch} />
                  <main>
                        {loading && <CircularProgress sx={{ mt: "2rem" }} />}
                        {fetchError && (
                              <p
                                    style={{ color: "red" }}
                              >{`Error ${fetchError}`}</p>
                        )}
                        {!fetchError && !loading && (
                              <Content
                                    items={items.filter((item) =>
                                          item.item
                                                .toLowerCase()
                                                .includes(search.toLowerCase())
                                    )}
                                    handleCheck={handleCheck}
                                    handleDelete={handleDelete}
                              />
                        )}
                  </main>
                  <Footer length={items.length} />
            </div>
      );
};

export default App;
