import React from 'react';

import styles from './EquipmentSelect.module.css';
import { IoIosCheckmark } from 'react-icons/io';

const EquipmentSelect = props => {
  const { equipment, selectedEquipment, handleCheckedChange } = props;

  const handleEquipmentCheck = id => {
    handleCheckedChange(id);
  };

  const renderEquipment = () => {
    const list = equipment.map(({ id, name }, index) => {
      const style = index === equipment.length - 1 ? styles.final : styles.div;
      const hiddenStyle = selectedEquipment.includes(id) ? [styles.hidden, styles.visible].join(' ') : styles.hidden;
      return (
        <div className={style} key={id}>
          <div className={hiddenStyle}>
            <IoIosCheckmark size={40} color="white" />
          </div>
          <button
            onClick={() => {
              handleEquipmentCheck(id);
            }}
            type="button"
            className={styles.radio}
          >
            {name}
          </button>
        </div>
      );
    });
    return <div>{list}</div>;
  };

  return (
    <div className={styles.parent__div}>
      <label className={styles.parent__label}>EXTRA RESOURCES</label>
      {renderEquipment()}
    </div>
  );
};

export default EquipmentSelect;
