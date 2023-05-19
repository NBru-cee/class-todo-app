import { FaPlus } from "react-icons/fa";
import { useRef } from "react";
const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
      const inputRef = useRef();
      return (
            <form className="addForm" onSubmit={handleSubmit}>
                  <label htmlFor="addItem">AddItem</label>
                  <input
                        ref={inputRef}
                        type="text"
                        autoFocus
                        id="addItem"
                        placeholder="Add Item"
                        autoComplete="off"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                  />
                  <button
                        type="submit"
                        aria-label="Add Item"
                        onClick={() => inputRef.current.focus()}
                  >
                        <FaPlus />
                  </button>
            </form>
      );
};

export default AddItem;
