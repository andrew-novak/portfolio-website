const VerticalOpposite = ({ color1, color2, size }) => {
  return (
    <div
      style={{
        width: 10 * size,
        height: 10 * size,
        background: color2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: 10 * size,
          height: 5 * size,
          background: color1,
          borderRadius: "0px 0px 100px 100px",
        }}
      />
      <div
        style={{
          width: 10 * size,
          height: 5 * size,
          background: color1,
          borderRadius: "100px 100px 0 0",
        }}
      />
    </div>
  );
};

const HorizontalOpposite = ({ color1, color2, size }) => {
  return (
    <div
      style={{
        width: 10 * size,
        height: 10 * size,
        background: color2,
        display: "flex",
      }}
    >
      <div
        style={{
          width: 5 * size,
          height: 10 * size,
          background: color1,
          borderRadius: "0 100px 100px 0",
        }}
      />
      <div
        style={{
          width: 5 * size,
          height: 10 * size,
          background: color1,
          borderRadius: "100px 0 0 100px",
        }}
      />
    </div>
  );
};

const GeometryPattern = ({ color1: c1, color2: c2 }) => {
  //const c1 = "#60656b";
  //const c2 = "#ffc7c6";
  const size = 3;
  return (
    <div style={{ display: "flex" }}>
      <div>
        <HorizontalOpposite color1={c1} color2={c2} size={size} />
        <HorizontalOpposite color1={c2} color2={c1} size={size} />
        <VerticalOpposite color1={c1} color2={c2} size={size} />
        <VerticalOpposite color1={c2} color2={c1} size={size} />
        <HorizontalOpposite color1={c1} color2={c2} size={size} />
        <HorizontalOpposite color1={c2} color2={c1} size={size} />
        <VerticalOpposite color1={c1} color2={c2} size={size} />
        <VerticalOpposite color1={c2} color2={c1} size={size} />
        {/*<HorizontalOpposite color1={c1} color2={c2} size={size} />*/}
      </div>
      <div>
        <VerticalOpposite color1={c2} color2={c1} size={size} />
        <HorizontalOpposite color1={c1} color2={c2} size={size} />
        <HorizontalOpposite color1={c2} color2={c1} size={size} />
        <VerticalOpposite color1={c1} color2={c2} size={size} />
        <VerticalOpposite color1={c2} color2={c1} size={size} />
        <HorizontalOpposite color1={c1} color2={c2} size={size} />
        <HorizontalOpposite color1={c2} color2={c1} size={size} />
        <VerticalOpposite color1={c1} color2={c2} size={size} />
        {/*<VerticalOpposite color1={c2} color2={c1} size={size} />*/}
      </div>
      <div>
        <HorizontalOpposite color1={c1} color2={c2} size={size} />
        <VerticalOpposite color1={c2} color2={c1} size={size} />
        <HorizontalOpposite color1={c1} color2={c2} size={size} />
        <HorizontalOpposite color1={c2} color2={c1} size={size} />
        <HorizontalOpposite color1={c1} color2={c2} size={size} />
        <VerticalOpposite color1={c2} color2={c1} size={size} />
        <HorizontalOpposite color1={c1} color2={c2} size={size} />
        <HorizontalOpposite color1={c2} color2={c1} size={size} />
        {/*<VerticalOpposite color1={c1} color2={c2} size={size} />*/}
      </div>
      <div>
        <HorizontalOpposite color1={c2} color2={c1} size={size} />
        <VerticalOpposite color1={c1} color2={c2} size={size} />
        <VerticalOpposite color1={c2} color2={c1} size={size} />
        <HorizontalOpposite color1={c1} color2={c2} size={size} />
        <HorizontalOpposite color1={c2} color2={c1} size={size} />
        <VerticalOpposite color1={c1} color2={c2} size={size} />
        <VerticalOpposite color1={c2} color2={c1} size={size} />
        <HorizontalOpposite color1={c1} color2={c2} size={size} />
        {/*<HorizontalOpposite color1={c2} color2={c1} size={size} />*/}
      </div>
    </div>
  );
};

export default GeometryPattern;
