import { isStagingDeploy, stagingFormsUnavailableMessage } from "../../config/staging";
import "./StagingFormNotice.css";

export function StagingFormNotice() {
  if (!isStagingDeploy) return null;

  return (
    <p className="staging-form-notice" role="status">
      {stagingFormsUnavailableMessage}
    </p>
  );
}
