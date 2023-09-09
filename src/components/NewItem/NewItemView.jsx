import { useState } from "react";
import api from "../../Auth/authentication";
import classes from "./NewItemView.module.css";
import { CATEGORIES } from "../../constants";

function NewItemView() {
  return (
    <div>
      <h2>NewItemView</h2>
      <NewItemForm />
    </div>
  );
}

function NewItemForm() {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    category: "",
  });
  const [imageData, setImageData] = useState(null);

  const handleSubmit = (e) => {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    e.preventDefault();
    let formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("price", formData.price);
    formPayload.append("quantity", formData.quantity);
    formPayload.append("description", formData.description);
    formPayload.append("category", formData.category);
    formPayload.append("image", imageData.image[0]);
    api
      .post("api/items/upload/", formPayload, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form className={classes.form}>
        <label>
          {"Name: "}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />
        </label>
        <label>
          {"Price: "}
          <input
            type="text"
            name="price"
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value,
              })
            }
          />
        </label>
        <label>
          {"Quantity: "}
          <input
            type="text"
            name="quantity"
            onChange={(e) =>
              setFormData({
                ...formData,
                quantity: e.target.value,
              })
            }
          />
        </label>
        <label>
          {"Image: "}
          <input
            type="file"
            name="image_url"
            accept="image/jpeg,image/png,image/gif"
            onChange={(e) => setImageData({ image: e.target.files })}
          />
        </label>
        <label htmlFor="category">Category:
        <select id="category" name="category" onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }>
            {CATEGORIES.map((category) => {
                const categorySlug = category.toLowerCase()
                return <option key={categorySlug} value={categorySlug}>{category}</option>
            })}

        </select></label>
        
        <label>
          {"Description: "}
          {/* <input type="text" name="name" /> */}
          <input
            type="text"
            name="description"
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />
        </label>
        <input type="submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default NewItemView;
