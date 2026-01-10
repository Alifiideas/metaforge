import RangeSlider from "../components/sliders/RangeSlider";
import ToggleSwitch from "../components/layout/ToggleSwitch";
import UploadBox from "../components/upload/UploadBox";
import FilePreview from "../components/upload/FilePreview";
import PlatformSelector from "../components/PlatformSelector";
import ProcessButton from "../components/buttons/ProcessButton";
import DownloadButton from "../components/buttons/DownloadButton";

import "./Metadata.css";

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
  "rf123",
  "youtube",
  "tiktok",
  "vectorstock",
  "freepik",
];

function Metadata() {
  /* ================= HOOKS ================= */

  const {
    platform,
    setPlatform,
    titleWords,
    setTitleWords,
    keywordCount,
    setKeywordCount,
    descEnabled,
    setDescEnabled,
    descWords,
    setDescWords,
  } = usePlatform();

  const {
    apiKey,
    setApiKey,
    plan,
    tokens,
  } = useTokens();

  const {
    files,
    validatedFiles,
    uploadProgress,
    processing,
    metadataReady,
    handleFileUpload,
    processFiles,
  } = useUpload();

  /* ================= LOCAL STATE ================= */

  const [csvType, setCsvType] = useState("jpg");
  const [estimatedTokens, setEstimatedTokens] = useState(0);

  /* ================= EFFECTS ================= */

  // Auto-fix CSV format on platform change
  useEffect(() => {
    if (!platform) return;

    if (!isCsvSupportedForPlatform(csvType, platform)) {
      const firstValid = CSV_FORMAT_LIST.find((f) =>
        isCsvSupportedForPlatform(f.id, platform)
      );
      if (firstValid) setCsvType(firstValid.id);
    }
  }, [platform, csvType]);

  // Estimate token usage
  useEffect(() => {
    if (!files.length) {
      setEstimatedTokens(0);
      return;
    }

    setEstimatedTokens(
      estimateTokens({
        filesCount: files.length,
        title: { max: titleWords },
        keywords: { max: keywordCount },
        description: {
          enabled: descEnabled,
          max: descWords,
        },
      })
    );
  }, [files, titleWords, keywordCount, descWords, descEnabled]);

  /* ================= HANDLERS ================= */

  const handleProcess = async () => {
    if (!apiKey) return alert("Please connect API key");
    if (!platform) return alert("Select a platform");
    if (!files.length) return alert("Upload files");
    if (estimatedTokens > tokens) return alert("Not enough tokens");

    await processFiles({
      files: validatedFiles,
      apiKey,
    });
  };

  const handleDownload = () => {
    alert(
      `CSV (${csvType.toUpperCase()}) export will be connected to backend`
    );
  };

  /* ================= UI ================= */

  return (
    <div className="metadata-page">
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <h3>Metadata Controls</h3>

        <RangeSlider
          label="Title Length"
          min={3}
          max={30}
          value={titleWords}
          disabled={plan === "free"}
          onChange={setTitleWords}
        />

        <RangeSlider
          label="Keywords Count"
          min={10}
          max={60}
          value={keywordCount}
          disabled={plan === "free"}
          onChange={setKeywordCount}
        />

        <ToggleSwitch
          label="Description"
          checked={descEnabled}
          disabled={plan === "free"}
          onChange={() => setDescEnabled((v) => !v)}
        />

        {descEnabled && (
          <RangeSlider
            label="Description Length"
            min={10}
            max={200}
            value={descWords}
            disabled={plan === "free"}
            onChange={setDescWords}
          />
        )}

        <div className="api-key">
          <label>API Key</label>
          <input
            type="password"
            placeholder="Connect your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="main">
        {/* TOP BAR */}
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

        {/* UPLOAD */}
        <UploadBox
          onUpload={handleFileUpload}
          progress={uploadProgress}
          formats="JPG · PNG · SVG · EPS · MP4"
        />

        {/* FILE PREVIEW */}
        <FilePreview files={files} />

        {/* ACTIONS */}
        <div className="actions">
          <ProcessButton
            onClick={handleProcess}
            loading={processing}
            disabled={
              processing ||
              !apiKey ||
              !platform ||
              !files.length ||
              estimatedTokens > tokens
            }
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
                    !isCsvSupportedForPlatform(format.id, platform)
                  }
                >
                  {format.label}
                </option>
              ))}
            </select>

            <DownloadButton
              onClick={handleDownload}
              disabled={!metadataReady}
              format={csvType.toUpperCase()}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Metadata;
