import { useState } from "react";
import ProcessButton from "./ProcessButton";

function UploadAndProcess() {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  /* ============================
     HANDLE FILE SELECTION
  ============================ */
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadedFile(null); // reset process state
  };

  /* ============================
     UPLOAD FILE
  ============================ */
  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      // ✅ THIS enables the Process button
      setUploadedFile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  /* ============================
     PROCESS FILE
  ============================ */
  const handleProcess = async () => {
    setProcessing(true);

    try {
      console.log("Processing file:", uploadedFile);
      // Call metadata / processing API here
      // await fetch("/api/metadata", ...)
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <h2>Upload File</h2>

      <input type="file" onChange={handleFileChange} />

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        style={{ marginTop: 10 }}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />

      <ProcessButton
        onClick={handleProcess}
        loading={processing}
        disabled={!uploadedFile}  // 🔥 KEY LINE
        label="Process"
      />

      {/* DEBUG (optional) */}
      <pre>
        {JSON.stringify(
          { file, uploadedFile, uploading, processing },
          null,
          2
        )}
      </pre>
    </div>
  );
}

export default UploadAndProcess;
