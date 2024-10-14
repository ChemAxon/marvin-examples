import { ReactMarvin, ReactMarvinProps } from "marvin";

export interface MarvinProps extends ReactMarvinProps {}

export const Marvin = (props: MarvinProps) => {
  return (
    <ReactMarvin
      settings={{
        ...props.settings,
      }}
      onReady={props.onReady}
    />
  );
};

export default Marvin;
