import QuoteIcon from "../../assets/icons/quote_filled.svg?react";

import "./Blockquote.css";

const Blockquote = () => {
  return (
    <div className="block-blockquote">
      <div className="content-blockquote">
        <QuoteIcon />

        <div>
          <blockquote>
            Love the Lord your God with all your heart and with all your soul
            and with all your mind. And lean not on your own understanding.
            Trust the Lord your God with all your heart.
          </blockquote>

          <p>- Jesus Christ of Nazareth</p>
        </div>
      </div>
    </div>
  );
};

export default Blockquote;
