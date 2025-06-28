import "./Verse.css";

const Verse = () => {
  return (
    <div
      className="bible-passage"
      data-book="john"
      data-chapter="3"
      data-verses="16"
    >
      <div className="passage-reference">John 3:16</div>

      <div className="verse" data-verse-number="16">
        <p className="verse-text">
          <sup>1</sup>In the beginning was the Word, and the Word was with God,
          and the Word was God. <sup>2</sup>He was in the beginning with God.{" "}
          <sup>3</sup>All things were made through him, and without him was not
          any thing made that was made.
        </p>
      </div>
    </div>
  );
};

export default Verse;
