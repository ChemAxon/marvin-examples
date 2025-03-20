import { ExportOptions, ImageType, Marvin } from "@chemaxon/marvin";
import { useMemo, useRef, useState } from "react";

type ExportProps = {
  marvinRef?: Marvin;
};

const ImageExport = ({ marvinRef }: ExportProps) => {
  const imageFormats: ImageType[] = ["SVG", "PNG", "JPG", "WEBP", "TIFF"];

  const [format, setFormat] = useState<ImageType>(imageFormats[0]);
  const [exportOptions, setExportOptions] = useState<ExportOptions>();
  const [result, setResult] = useState<string>("");
  const [image, setImage] = useState<string>();
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const linkRef = useRef<HTMLAnchorElement>(null);

  const exportImage = async (): Promise<void> => {
    setExportOptions({
      width,
      height,
    });

    const exportedImage = await marvinRef?.exportImage(format, exportOptions);
    if (exportedImage) setImage(exportedImage.content.toString());

    setResult(exportedImage?.content ?? "");
  };

  const downloadImage = async (): Promise<void> => {
    const options: ExportOptions = {
      width,
      height,
    };

    const exportedImage = await marvinRef?.exportImage(format, options);
    setResult(exportedImage?.content ?? "");

    if (linkRef.current) {
      linkRef.current.href =
        format === "SVG"
          ? "data:text/plain;charset=utf-8," + encodeURIComponent(result)
          : result;
      linkRef.current.download = `fileName.${format.toLowerCase()}`;
      linkRef.current.click();
    }
  };

  const renderImage = useMemo(() => {
    return format === "SVG" ? (
      <pre dangerouslySetInnerHTML={{ __html: image ? image : "" }}></pre>
    ) : (
      <img src={image} alt="Exported image" />
    );
  }, [format, result]);

  return (
    <div className="container-col">
      <div className="btn-group">
        <button onClick={exportImage} className="btn-export-img">
          Create image
        </button>
        <button onClick={downloadImage} className="btn-download-img">
          Download image
        </button>
      </div>
      <div className="container-row">
        <label htmlFor="export-format">Format:</label>
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFormat(e.target.value as ImageType)
          }
          id="export-image-format"
        >
          {imageFormats.map((f) => (
            <option onClick={() => setFormat(f)} value={`${f}`}>
              {f}
            </option>
          ))}
        </select>
        <label htmlFor="input-width">Width:</label>
        <input
          className="shrinkable-input"
          id="input-width"
          type="text"
          value={width}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            Number.isNaN(Number(e.target.value))
              ? setWidth((prev) => prev)
              : setWidth(Number(e.target.value));
          }}
        />
        <label htmlFor="input-height">Height:</label>
        <input
          className="shrinkable-input"
          id="input-height"
          type="text"
          value={height}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            Number.isNaN(Number(e.target.value))
              ? setHeight((prev) => prev)
              : setHeight(Number(e.target.value));
          }}
        />
      </div>
      <label htmlFor="config-json-image">ImageConfig object:</label>
      <div id="config-json-image">
        {exportOptions ? JSON.stringify(exportOptions, null, 2) : null}
      </div>
      <label>Exported image:</label>
      <div id="image-render">{renderImage}</div>
      <a
        className="hidden"
        id="link-download"
        href=""
        download
        ref={linkRef}
      ></a>
    </div>
  );
};

export default ImageExport;
