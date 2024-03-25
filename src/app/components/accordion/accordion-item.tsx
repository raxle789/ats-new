import React from 'react';

// type
type IPropType = {
  id: string;
  title: string;
  desc: string;
  isShow?: boolean;
  parent: string;
};

const AccordionItem = ({ id, title, isShow, desc, parent }: IPropType) => {
  let accordionContent;

  if (title !== 'ILEAD Core Values') {
    accordionContent = (
      <div className="accordion-item">
        <div className="accordion-header" id={`heading-${id}`}>
          <button
            className={`accordion-button ${isShow ? '' : 'collapsed'}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${id}`}
            aria-expanded={isShow ? 'true' : 'false'}
            aria-controls={`collapse-${id}`}
          >
            {title}
          </button>
        </div>
        <div
          id={`collapse-${id}`}
          className={`accordion-collapse collapse ${isShow ? 'show' : ''}`}
          aria-labelledby={`heading-${id}`}
          data-bs-parent={`#${parent}`}
        >
          <div className="accordion-body">
            <p>{desc}</p>
          </div>
        </div>
      </div>
    );
  } else {
    accordionContent = (
      <div className="accordion-item">
        <div className="accordion-header" id={`heading-${id}`}>
          <button
            className={`accordion-button ${isShow ? '' : 'collapsed'}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${id}`}
            aria-expanded={isShow ? 'true' : 'false'}
            aria-controls={`collapse-${id}`}
          >
            {title}
          </button>
        </div>
        <div
          id={`collapse-${id}`}
          className={`accordion-collapse collapse ${isShow ? 'show' : ''}`}
          aria-labelledby={`heading-${id}`}
          data-bs-parent={`#${parent}`}
        >
          <div className="accordion-body">
            <div className="row">
              <div className="col-5">
                <p className="fw-bold">Innovation</p>
              </div>
              <div className="col-7">
                <p>Strategic thinking</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="fw-bold">Leadership</p>
              </div>
              <div className="col-7">
                <p>
                  Strategic leadership, leading others and developing others
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="fw-bold">Excellent Customer Service</p>
              </div>
              <div className="col-7">
                <p>
                  Reliable partner, quality-oriented and achievement-oriented
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="fw-bold">Digital</p>
              </div>
              <div className="col-7">
                <p>Technology savvy</p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="fw-bold">Agility</p>
              </div>
              <div className="col-7">
                <p>Creative agility</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return accordionContent;
};

export default AccordionItem;
