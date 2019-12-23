import React from 'react';

const EquipmentSelect = props => {
  const { equipment, selectedEquipment, handleCheckedChange } = props;

  const handleEquipmentCheck = ({ target: { value } }) => {
    handleCheckedChange(value);
  };

  const renderEquipment = () => {
    const list = equipment.map(item => (
      <div key={item.id}>
        <input
          type="checkbox"
          onChange={handleEquipmentCheck}
          checked={selectedEquipment.includes(item.id)}
          value={item.id}
        />
        <label>{item.name}</label>
      </div>
    ));
    return <div>{list}</div>;
  };

  return renderEquipment();
};

export default EquipmentSelect;
