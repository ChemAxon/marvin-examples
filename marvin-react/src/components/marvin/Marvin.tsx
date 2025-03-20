import {
  Marvin as MarvinRef,
  ReactMarvin,
  ReactMarvinProps,
} from "@chemaxon/marvin";
import { getDefaultSettings } from "@chemaxon/marvin/marvin-extensions";
import "./marvin.scss";

export interface MarvinProps extends ReactMarvinProps {
  setMarvinRef: (m: MarvinRef) => void;
}

export const Marvin = (props: MarvinProps) => {
  const MARVIN_WEBSERVICES_HOST = "";

  return (
    <div id="marvin">
      <ReactMarvin
        settings={{
          ...getDefaultSettings(MARVIN_WEBSERVICES_HOST),
          ...props.settings,
        }}
        onReady={(m) => {
          props.setMarvinRef(m);
        }}
      />
    </div>
  );
};

export default Marvin;
