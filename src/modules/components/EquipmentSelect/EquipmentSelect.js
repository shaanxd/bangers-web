import React from 'react';

import styles from './EquipmentSelect.module.css';

const EquipmentSelect = props => {
  const { equipment, selectedEquipment, handleCheckedChange } = props;

  const handleEquipmentCheck = ({ target: { value } }) => {
    handleCheckedChange(value);
  };

  const renderEquipment = () => {
    const list = equipment.map(item => (
      <div className={styles.div} key={item.id}>
        <input
          type="checkbox"
          onChange={handleEquipmentCheck}
          checked={selectedEquipment.includes(item.id)}
          value={item.id}
        />
        <label className={styles.checkboxLabel}>{item.name}</label>
      </div>
    ));
    return <div>{list}</div>;
  };

  return (
    <div className={styles.parentDiv}>
      <label className={styles.parentLabel}>EXTRA RESOURCES</label>
      {renderEquipment()}
    </div>
  );
};

export default EquipmentSelect;
