import Reach from "react";
import ColumnListItem from "./ColumnListItem";
import "../styles/ColumnList.scss";

const ColumnList = (props) => {
  return (
  <div>
    <h1>This is ColumnList</h1>
    <ul className="columnlist">
      <ColumnListItem />
      <ColumnListItem />
      <ColumnListItem />
    </ul>
  </div>
  )
}

export default ColumnList;