import { useState } from "react";
import api from "../../utils/api";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

const ImageField = ({ value = "", onChange, onUploading, inputStyle, label = "Image" }) => {
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const isDeviceImage = value.startsWith("data:image/");

  const chooseImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image must be 4 MB or smaller.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      setUploading(true);
      onUploading?.(true);
      try {
        const { data } = await api.post("/api/admin/images", { image: reader.result });
        onChange(data.image, data.imagePublicId);
        setError("");
      } catch (uploadError) {
        setError(uploadError.response?.data?.message || "Could not upload this image.");
      } finally {
        setUploading(false);
        onUploading?.(false);
      }
    };
    reader.onerror = () => setError("Could not read this image.");
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <div>
      <input
        style={inputStyle}
        value={isDeviceImage ? "" : value}
        onChange={(event) => onChange(event.target.value, "")}
        placeholder={isDeviceImage ? "Image selected from device" : "Paste an image URL or choose a file"}
        aria-label={`${label} URL`}
      />
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}>
        <label style={{ cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#06275B" }}>
          Choose from device
          <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={chooseImage} style={{ display: "none" }} disabled={uploading} />
        </label>
        {uploading && <span role="status" style={{ fontSize: 12, color: "#64748B" }}>Uploading…</span>}
        {value && <button type="button" onClick={() => onChange("", "")} style={{ border: 0, background: "none", color: "#B91C1C", cursor: "pointer", fontSize: 12 }}>Remove image</button>}
      </div>
      {error && <p role="alert" style={{ color: "#B91C1C", fontSize: 12, margin: "6px 0 0" }}>{error}</p>}
      {value && <img src={value} alt="Selected preview" style={{ display: "block", width: "100%", maxHeight: 150, objectFit: "cover", borderRadius: 8, marginTop: 8 }} />}
    </div>
  );
};

export default ImageField;
