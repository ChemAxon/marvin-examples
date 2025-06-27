import {
  Marvin,
  ImportOptions,
  PlacementType,
  ScaleType,
} from "@chemaxon/marvin";
import { useState } from "react";

type ImportProps = {
  marvinRef?: Marvin;
};

type PlacementProps = {
  value: PlacementType;
  displayValue: string;
};

type ScaleProps = {
  value: ScaleType;
  displayValue: string;
};

const DocumentImport = ({ marvinRef }: ImportProps) => {
  const importPlacements: PlacementProps[] = [
    { value: "CENTER", displayValue: "Center" },
    { value: "TOP_LEFT", displayValue: "Top left corner" },
    { value: "TOP", displayValue: "Top" },
    { value: "TOP_RIGHT", displayValue: "Top right corner" },
    { value: "RIGHT", displayValue: "Right" },
    { value: "BOTTOM_RIGHT", displayValue: "Bottom right corner" },
    { value: "BOTTOM", displayValue: "Bottom" },
    { value: "BOTTOM_LEFT", displayValue: "Bottom left corner" },
    { value: "LEFT", displayValue: "Left" },
  ];

  const importScales: ScaleProps[] = [
    { value: "SHRINK", displayValue: "Shrink large input to screen size" },
    { value: "NONE", displayValue: "None" },
  ];

  const [placement, setPlacement] = useState<PlacementType>(
    importPlacements[0].value
  );
  const [scale, setScale] = useState<ScaleType>(importScales[0].value);
  const [documentSource, setDocumentSource] = useState<string>("oxytocin");
  const [isCheckedClear, setIsCheckedClear] = useState<boolean>(true);
  const [isCheckedSelect, setIsCheckedSelect] = useState<boolean>(true);

  const importDocument = async (): Promise<void> => {
    const options: ImportOptions = {
      clearCanvas: isCheckedClear,
      select: isCheckedSelect,
      scale,
      placement,
      throwError: true,
    };
    await marvinRef?.importDocument(documentSource, options);
  };

  return (
    <div>
      <button onClick={importDocument} className="btn-import">
        Import
      </button>
      <div>
        <label htmlFor="select-format">Parameters:</label>
        <div className="input-group">
          <label htmlFor="check-clear">Clear canvas:</label>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIsCheckedClear(e.target.checked)
            }
            id="check-clear"
            type="checkbox"
            checked={isCheckedClear}
          />
          <label htmlFor="check-select">Select imported content:</label>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIsCheckedSelect(e.target.checked)
            }
            id="check-select"
            type="checkbox"
            checked={isCheckedSelect}
          />
        </div>
        <div className="input-group">
          <label htmlFor="select-scaling">Scaling:</label>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setScale(e.target.value as ScaleType)
            }
            name="scaling"
            id="select-scaling"
          >
            {importScales.map((s, index) => (
              <option key={index} value={`${s.value}`}>
                {s.displayValue}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="select-placement">Placement:</label>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setPlacement(e.target.value as PlacementType)
            }
            name="placement"
            id="select-placement"
          >
            {importPlacements.map((p, index) => (
              <option key={index} value={`${p.value}`}>
                {p.displayValue}
              </option>
            ))}
          </select>
        </div>
        <div className="textarea-group">
          <label htmlFor="config-json-import" className="label-above">
            Document source:
          </label>
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDocumentSource(e.target.value)
            }
            id="config-json-import"
            className="input-src"
            value={documentSource}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default DocumentImport;
