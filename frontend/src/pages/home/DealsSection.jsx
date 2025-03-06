import React from "react";
import dealImg from "../../assets/deals.png";

const DealsSection = () => {
  return (
    <section className="section__container deals__container">
      {/* deals image */}
      <div className="deals__image relative">
        <img src={dealImg} alt="dealImg" className="w-full absolute inset-0" />
      </div>

      {/* deals content */}
      <div className="deals__content">
        <h5>Your one From Thousand of Products</h5>
        <h4>Deals of the Month</h4>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur veritatis dolorem quidem consequuntur recusandae aperiam, molestiae ratione deleniti iusto voluptate dolor eos provident esse aspernatur voluptatem, atque ad? Nam, ratione.</p>

        <div className="deals__countdown flex-wrap">
            <div className="deals__countdown__card ">
                <h4>14</h4>
                <p>Days</p>
            </div>
            <div className="deals__countdown__card ">
                <h4>20</h4>
                <p>Hours</p>
            </div>
            <div className="deals__countdown__card ">
                <h4>15</h4>
                <p>Mins</p>
            </div>
            <div className="deals__countdown__card ">
                <h4>05</h4>
                <p>Secs</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
