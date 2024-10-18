import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';

const CatalogMagic = ({
  width = 1366,
  heading = { width: 140, height: 24 },
  row = 4,
  padding = 12,
  borderRadius = 35,
  ...props
}) => {
  const [columns, setColumns] = useState(3); // состояние для количества колонок
  const list = [];
  let height;

  const handleResize = () => {
    if (window.innerWidth < 770) {
      setColumns(1); // 1 колонка для мобильных устройств
    } else {
      setColumns(3); // 3 колонки для более широких экранов
    }
  };

  useEffect(() => {
    handleResize(); // Установить начальное количество колонок
    window.addEventListener('resize', handleResize); // Добавляем обработчик события resize

    return () => {
      window.removeEventListener('resize', handleResize); // Удаляем обработчик при размонтировании
    };
  }, []);

  for (let i = 1; i <= row; i++) {
    for (let j = 0; j < columns; j++) {
      const itemWidth = (width - padding * (columns + 1)) / columns;
      const x = padding + j * (itemWidth + padding);
      const height1 = itemWidth;
      const height2 = 20;
      const height3 = 20;
      const space =
        padding + height1 + (padding / 2 + height2) + height3 + padding * 4;
      const y1 = padding + heading.height + padding * 2 + space * (i - 1);
      const y2 = y1 + padding + height1;
      const y3 = y2 + padding / 2 + height2;

      list.push(
        <>
          <rect
            x={x}
            y={y1}
            rx={borderRadius}
            ry={borderRadius}
            width={itemWidth}
            height={height1}
          />
          <rect x={x} y={y2} rx={0} ry={0} width={itemWidth} height={height2} />
          <rect
            x={x}
            y={y3}
            rx={0}
            ry={0}
            width={itemWidth * 0.6}
            height={height3}
          />
        </>,
      );

      if (i === row) {
        height = y3 + height3;
      }
    }
  }

  return (
    <ContentLoader
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      backgroundColor={'#c9e7cd'}
      {...props}
    >
      {heading && (
        <rect
          x={padding}
          y={padding}
          rx={0}
          ry={0}
          width={heading.width}
          height={heading.height}
        />
      )}
      {list}
    </ContentLoader>
  );
};

export default CatalogMagic;
