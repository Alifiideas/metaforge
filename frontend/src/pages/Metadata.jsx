import { useState, useEffect } from "react";
import "./Metadata.css"; // ✅ FIXED

import RangeSlider from "../components/sliders/RangeSlider";
import ToggleSwitch from "../components/layout/ToggleSwitch";
import UploadBox from "../components/upload/UploadBox";
import FilePreview from "../components/upload/FilePreview";
import PlatformSelector from "../components/platform/PlatformSelector";
import ProcessButton from "../components/buttons/ProcessButton";
import DownloadButton from "../components/buttons/DownloadButton";

import usePlatform from "../hooks/usePlatform";
import useTokens from "../hooks/useTokens";
import useUpload from "../hooks/useUpload";

import { estimateTokens } from "../api/metadata.api";
import {
  CSV_FORMAT_LIST,
  isCsvSupportedForPlatform,
} from "../config/csvFormats";

/* ================= CONSTANTS ================= */

const PLATFORMS = [
  "shutterstock",
  "adobe_stock",
  "vecteezy",
  "depositphoto",
  "123rf",
  "youtube",
  "tiktok",
  "vectorstock",
  "freepik",
];

/* ================= COMPONENT ================= */

function Metadata() {
  /* ================= HOOKS ================= */

  const { platform, setPlatform } = usePlatform();
  const { tokens } = useTokens();

  const {
    files,
    progress,
    uploading,
    uploaded,
    error,
    message,          // ✅ success message
    selectFiles,
    upload,
    removeFiles,
    clearFiles,
  } = useUpload();

  /* ================= STATE ================= */

  const [minTitle, setMinTitle] = useState(4);
  const [maxTitle, setMaxTitle] = useState(12);

  const [minKeywords, setMinKeywords] = useState(8);
  const [maxKeywords, setMaxKeywords] = useState(25);

  const [descEnabled, setDescEnabled] = useState(true);
  const [minDesc, setMinDesc] = useState(6);
  const [maxDesc, setMaxDesc] = useState(18);

  const [csvType, setCsvType] = useState("jpg");
  const [estimatedTokens, setEstimatedTokens] = useState(0);

  /* ================= EFFECTS ================= */

  // CSV compatibility
  useEffect(() => {
    if (!platform) return;

    if (!isCsvSupportedForPlatform(csvType, platform)) {
      const firstValid = CSV_FORMAT_LIST.find((f) =>
        isCsvSupportedForPlatform(f.id, platform)
      );
      if (firstValid) setCsvType(firstValid.id);
    }
  }, [platform, csvType]);

  // Token estimation
  useEffect(() => {
    if (!files.length) {
      setEstimatedTokens(0);
      return;
    }

    setEstimatedTokens(
      estimateTokens({
        filesCount: files.length,
        title: { min: minTitle, max: maxTitle },
        keywords: { min: minKeywords, max: maxKeywords },
        description: {
          enabled: descEnabled,
          min: minDesc,
          max: maxDesc,
        },
      })
    );
  }, [
    files.length,
    minTitle,
    maxTitle,
    minKeywords,
    maxKeywords,
    minDesc,
    maxDesc,
    descEnabled,
  ]);

  /* ================= HANDLERS ================= */

  const handleUpload = async () => {
    await upload();
  };

  const handleProcess = () => {
    if (!uploaded) return alert("Upload files first");
    if (!platform) return alert("Select a platform");
    if (estimatedTokens > tokens)
      return alert("Not enough tokens");

    alert("✅ Ready to process metadata");
  };

  const handleDownload = () => {
    alert(`CSV (${csvType.toUpperCase()}) export coming soon`);
  };

  /* ================= UI ================= */

  return (
    <div className="metadata-page">
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <h3>Metadata Controls</h3>

        <RangeSlider
          label="Minimum Title Words"
          min={2}
          max={25}
          value={minTitle}
          onChange={setMinTitle}
        />

        <RangeSlider
          label="Maximum Title Words"
          min={minTitle}
          max={25}
          value={maxTitle}
          onChange={setMaxTitle}
        />

        <RangeSlider
          label="Minimum Keywords"
          min={5}
          max={50}
          unit="keywords"
          value={minKeywords}
          onChange={setMinKeywords}
        />

        <RangeSlider
          label="Maximum Keywords"
          min={minKeywords}
          max={50}
          unit="keywords"
          value={maxKeywords}
          onChange={setMaxKeywords}
        />

        <ToggleSwitch
          label="Description"
          checked={descEnabled}
          onChange={() => setDescEnabled((v) => !v)}
        />

        {descEnabled && (
          <>
            <RangeSlider
              label="Minimum Description Words"
              min={5}
              max={30}
              value={minDesc}
              onChange={setMinDesc}
            />

            <RangeSlider
              label="Maximum Description Words"
              min={minDesc}
              max={30}
              value={maxDesc}
              onChange={setMaxDesc}
            />
          </>
        )}
      </aside>

      {/* ================= MAIN ================= */}
      <main className="main">
        <div className="top-bar">
          <PlatformSelector
            platforms={PLATFORMS}
            value={platform}
            onChange={setPlatform}
          />

          <div className="tokens">
            🔋 {tokens} • Est: {estimatedTokens}
          </div>
        </div>

        <UploadBox
          onFilesSelected={selectFiles}
          onUpload={handleUpload}
          progress={progress}
          uploading={uploading}
          formats="JPG · PNG · SVG · EPS · MP4"
        />

        {/* ✅ STATUS MESSAGES */}
        {message && (
          <p className="upload-success">{message}</p>
        )}

        {error && (
          <p className="error">{error}</p>
        )}

        <FilePreview
          files={files}
          onRemoveFiles={removeFiles}
          onClearAll={clearFiles}
        />

        <div className="actions">
          <ProcessButton
            onClick={handleProcess}
            disabled={!uploaded}
          />

          <div className="export">
            <select
              value={csvType}
              onChange={(e) => setCsvType(e.target.value)}
            >
              {CSV_FORMAT_LIST.map((format) => (
                <option
                  key={format.id}
                  value={format.id}
                  disabled={
                    !isCsvSupportedForPlatform(
                      format.id,
                      platform
                    )
                  }
                >
                  {format.label}
                </option>
              ))}
            </select>

            <DownloadButton
              onClick={handleDownload}
              disabled={!uploaded}
              format={csvType.toUpperCase()}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Metadata;


