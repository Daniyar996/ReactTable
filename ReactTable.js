import React from 'react';
import RT from 'react-table';
import 'react-table/react-table.css';
import {MdArrowBack, MdArrowForward} from 'react-icons/md';
import {useTranslation} from "react-i18next";


export default ({columns, data, sortable, filterable, pageSize, onClick, showRowNumbers, className, ...rest}) => {
  const {t} = useTranslation();

  const translations = {
    previousText: <MdArrowBack size="1.6em"/>,
    nextText: <MdArrowForward size="1.6em"/>,
    loadingText: t('ЗАГРУЗКА...'),
    rowsText: t('шт'),
    pageText: t('Стр.'),
    ofText: t('из'),
    noDataText: t('Нет данных'),
  };

  let cols = [];
  if (showRowNumbers === undefined || showRowNumbers) {
    cols.push({
      Header: "№",
      width: 50,
      Cell: ({index}) => <div className="text-center">{index + 1}</div>
    });
  }

  cols.push(...columns || []);

  /*cols.forEach(c => {
    if (typeof c.Header == 'string')
      c.Header = <span title={c.Header}>{c.Header}</span>;

    if (!c.Cell) {
      c.Cell = ({value}) => (typeof value == 'string') ? <span title={value}>{value}</span> : value;
    }
  })*/

  return (
    <RT
      {...translations}
      defaultFilterMethod={(filter, row) =>
        String(row[filter.id]).toLocaleLowerCase().includes(filter.value.toLocaleLowerCase())}
      data={data || []}
      columns={cols || []}
      defaultPageSize={pageSize || 25}
      pageSize={pageSize}
      className={`-striped -highlight ${className ? className : ''}`}
      sortable={sortable === undefined ? true : sortable}
      filterable={filterable === undefined ? true : filterable}
      getTdProps={(state, rowInfo, column, instance) => ({
        onClick: (e, handleOriginal) => {
          if (column.expander)
            handleOriginal();

          else if (onClick && rowInfo) {
            onClick(rowInfo.row._original, column, handleOriginal);
          }
        }
      })}

      {...rest}
    />
  )
}
