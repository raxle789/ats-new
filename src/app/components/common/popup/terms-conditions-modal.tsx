import React from 'react';
import { Modal } from 'antd';

interface IProps {
  isOpen: boolean;
  setIsOpenModal: React.Dispatch<boolean>;
}

const TermsConditionsModal: React.FC<IProps> = ({ isOpen, setIsOpenModal }) => {
  const handleCancel = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <Modal
        title="Terms & Conditions"
        centered
        open={isOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
        wrapClassName="custom-modal-wrapper"
      >
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            dicta soluta molestiae error quia eveniet pariatur quam sunt odio
            dolorum perferendis rerum, natus optio itaque nesciunt dolores odit
            ipsam aliquam consectetur debitis at quasi atque! Ullam temporibus
            nesciunt iusto quibusdam neque at excepturi dolor tenetur labore
            dignissimos. Illo eveniet officiis et rem ducimus esse, asperiores
            quisquam repellendus! Placeat quas at maxime asperiores, accusantium
            optio odio, reiciendis labore dolor sunt delectus ducimus error
            culpa ab ad tempora doloribus dignissimos provident. Vero officiis
            explicabo neque totam dolore earum, commodi nesciunt! Reiciendis
            aspernatur soluta molestias assumenda fugit magni veritatis labore
            voluptas modi dignissimos!
          </p>
        </div>
      </Modal>
    </>
  );
};

export default TermsConditionsModal;
