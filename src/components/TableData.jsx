const TableData = ({ data, headers, actions = [] }) => {
  return (
    <table className="table w-full border bold border-black-500 scroll-auto shadow-2xl shadow-black">
      <thead className="text-white">
        <tr>
          {headers.map((head, index) => (
            <th key={index} className="text-left px-4 py-2">{head.label}</th>
          ))}
          {actions.length > 0 && <th className="px-4 py-2">Acciones</th>}
        </tr>
      </thead>
      <tbody className="text-white scroll-auto">
        {data.map((item) => (
          <tr key={item.clotheId}>
            {headers.map((head, index) => (
              <td key={index} className="px-4 py-5">
                {head.pipe ? head.pipe(item[head.name]) : item[head.name]}
              </td>
            ))}
            {actions.length > 0 && (
              <td className="ml-8 py-2 flex gap-2 mt-4">
                {actions.map((act, idx) => (
                  <span key={idx}>{act.content(item)}</span>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableData;
