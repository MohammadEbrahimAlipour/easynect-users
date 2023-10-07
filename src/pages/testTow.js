import React from "react";
import Image from "next/image";
import sampleImage from "../../public/images/cljokljin00rp3d5zrpjtjgmm.png";

const testTow = () => {
  return (
    <>
      <div className="__cards__">
        <div className="__outer__">
          {/* item */}
          <div className="__card__" style={{ "--delay": -1 }}>
            <div className="__header__">
              <div className="__profile__">
                <div className="__img__">
                  <Image src={sampleImage} alt="text" />
                </div>
                <div className="__details__">
                  <h4>a title here</h4>
                  <p>a text placed here</p>
                </div>
              </div>

              <div className="__stars__">
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
              </div>
            </div>
            <div className="__testimonial__">
              <p>
                a long text here to see what the hell he placed in and where,
                still seems not to be enough?
              </p>
            </div>
          </div>
          {/* item */}
          <div className="__card__" style={{ "--delay": 0 }}>
            <div className="__header__">
              <div className="__profile__">
                <div className="__img__">
                  <Image src={sampleImage} alt="text" />
                </div>
                <div className="__details__">
                  <h4>a title here</h4>
                  <p>a text placed here</p>
                </div>
              </div>

              <div className="__stars__">
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
              </div>
            </div>
            <div className="__testimonial__">
              <p>
                a long text here to see what the hell he placed in and where,
                still seems not to be enough?
              </p>
            </div>
          </div>

          {/* item */}
          <div className="__card__" style={{ "--delay": 1 }}>
            <div className="__header__">
              <div className="__profile__">
                <div className="__img__">
                  <Image src={sampleImage} alt="text" />
                </div>
                <div className="__details__">
                  <h4>a title here</h4>
                  <p>a text placed here</p>
                </div>
              </div>

              <div className="__stars__">
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
              </div>
            </div>
            <div className="__testimonial__">
              <p>
                a long text here to see what the hell he placed in and where,
                still seems not to be enough?
              </p>
            </div>
          </div>

          {/* item */}
          <div className="__card__" style={{ "--delay": 2 }}>
            <div className="__header__">
              <div className="__profile__">
                <div className="__img__">
                  <Image src={sampleImage} alt="text" />
                </div>
                <div className="__details__">
                  <h4>a title here</h4>
                  <p>a text placed here</p>
                </div>
              </div>

              <div className="__stars__">
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
              </div>
            </div>
            <div className="__testimonial__">
              <p>
                a long text here to see what the hell he placed in and where,
                still seems not to be enough?
              </p>
            </div>
          </div>

          {/* item */}
          <div className="__card__" style={{ "--delay": 2 }}>
            <div className="__header__">
              <div className="__profile__">
                <div className="__img__">
                  <Image src={sampleImage} alt="text" />
                </div>
                <div className="__details__">
                  <h4>a title here</h4>
                  <p>a text placed here</p>
                </div>
              </div>

              <div className="__stars__">
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
                <span className="__op-star__"> </span>
              </div>
            </div>
            <div className="__testimonial__">
              <p>
                a long text here to see what the hell he placed in and where,
                still seems not to be enough?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default testTow;
