import BulletList from "../BulletList/BulletList";
import Checklist from "../Checklist/Checklist";
import NumberedList from "../NumberedList/NumberedList";
import Blockquote from "../Blockquote/Blockquote";
import Paragraph from "../Paragraph/Paragraph";
import Verse from "../Verse/Verse";

import "./AllNodes.css";

const AllNodes = () => {
  return (
    <div className="allNodes-container">
      <BulletList />

      <Checklist />

      <NumberedList />

      <Paragraph />

      <Blockquote />

      <Verse />
    </div>
  );
};

export default AllNodes;
