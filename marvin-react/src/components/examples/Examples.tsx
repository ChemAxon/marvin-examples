import { useCallback, useState } from "react";
import DocumentExport from "./DocumentExport";
import DocumentImport from "./DocumentImport";
import ImageExport from "./ImageExport";
import type { Marvin } from "@chemaxon/marvin";
import "./examples.css";

type ExampleProps = {
  marvinRef: Marvin | undefined;
};

const Examples = ({ marvinRef }: ExampleProps) => {
  const examples = [
    {
      displayValue: "Document export",
      value: "documentExport",
      component: <DocumentExport marvinRef={marvinRef} />,
    },
    {
      displayValue: "Document import",
      value: "documentImport",
      component: <DocumentImport marvinRef={marvinRef} />,
    },
    {
      displayValue: "Image export",
      value: "imageExport",
      component: <ImageExport marvinRef={marvinRef} />,
    },
  ];

  const [example, setExample] = useState<string>(examples[0].value);

  const renderExample = useCallback(
    () => examples.find((e) => e.value === example)?.component,
    [example, examples]
  );

  return (
    <section id="examples">
      <div className="input-group">
        <label htmlFor="filter-example">Example:</label>
        <select
          onChange={(e) => setExample(e.target.value)}
          name="filter-example"
          id="filter-example"
        >
          {examples.map((e, index) => (
            <option key={index} value={`${e.value}`}>
              {e.displayValue}
            </option>
          ))}
        </select>
      </div>
      {renderExample()}
    </section>
  );
};

export default Examples;
