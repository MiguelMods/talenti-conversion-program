export default function SelectOption({ value, setValue, data }) {
  const defaultOption = data.find((option) => option.default) || data[0];

  return (
    <select
      onChange={({ target }) => setValue(target.value)}
      value={value || defaultOption.value}
    >
      {data.length > 0 ? (
        data.map((element, index) => (
          <option key={index} value={element.value}>
            {element.description}
          </option>
        ))
      ) : (
        <option value="">Sin Opciones Disponibles</option>
      )}
    </select>
  );
}
