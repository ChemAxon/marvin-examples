import { DocumentType, Marvin } from "@chemaxon/marvin";
import { useState } from "react";

type ExportProps = {
  marvinRef?: Marvin;
};

type FormatProps = {
  value: DocumentType;
  displayValue: string;
};

const DocumentExport = ({ marvinRef }: ExportProps) => {
  const exportFormats: FormatProps[] = [
    { value: "CXON", displayValue: "CXON" },
    { value: "MRV", displayValue: "MRV" },
    { value: "Mol:V2", displayValue: "MDL MOLFILE" },
    { value: "Mol:V3", displayValue: "MDL MOLFILE V3000" },
    { value: "SMILES", displayValue: "SMILES" },
    { value: "SMARTS", displayValue: "SMARTS" },
    { value: "InChI", displayValue: "InChI" },
    { value: "InChIKey", displayValue: "InChIkey" },
    { value: "SDF", displayValue: "MDL SDfile format" },
    { value: "RDF", displayValue: "MDL RDfile format" },
    { value: "RXN", displayValue: "MDL RXNfile format" },
  ];

  const [format, setFormat] = useState<DocumentType>(exportFormats[0].value);
  const [result, setResult] = useState<string>();

  const exportDocument = async (): Promise<void> => {
    try {
      const exportedDocument = await marvinRef?.exportDocument(format);
      setResult(exportedDocument?.content);
    } catch (e) {
      setResult(
        `<div style="color:red;margin:5px">Could not export in requested format</div>`
      );
    }
  };

  return (
    <div className="container-row">
      <div className="input-group">
        <label htmlFor="export-format">Format:</label>
        <select
          onChange={(e) => setFormat(e.target.value as DocumentType)}
          name="format"
          id="export-format"
        >
          {exportFormats.map((f, index) => (
            <option key={index} value={`${f.value}`}>
              {f.displayValue}
            </option>
          ))}
        </select>
        <button onClick={exportDocument}>Export</button>
      </div>
      <div id="config-json-export">
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default DocumentExport;
