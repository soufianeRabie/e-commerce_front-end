import "./Category.css";
import Input from "./Input";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={(e)=>handleChange(e.currentTarget.value)} type="checkbox" value="All" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={(e) => handleChange(e.currentTarget.value)}
          value="sneakers"
          title="Sneakers"
          name="test"
        />
        <Input
          handleChange={(e) => handleChange(e.currentTarget.value)}
          value="flats"
          title="Flats"
          name="test"
        />
        <Input
          handleChange={(e) => handleChange(e.currentTarget.value)}
          value="sandals"
          title="Sandals"
          name="test"
        />
        <Input
          handleChange={(e) => handleChange(e.currentTarget.value)}
          value="heels"
          title="Heels"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;
